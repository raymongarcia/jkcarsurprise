import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectMongoDB } from "@/lib/mongodb";
import Booking from "@/models/booking";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature) {
    return NextResponse.json({ message: "Missing Stripe signature." }, { status: 400 });
  }
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured.");
    return NextResponse.json({ message: "Stripe webhook is not configured." }, { status: 500 });
  }

  let stripe: ReturnType<typeof getStripe>;
  try {
    stripe = getStripe();
  } catch (error) {
    console.error("Unable to initialize Stripe webhook handler:", error);
    return NextResponse.json({ message: "Stripe is not configured." }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch (error) {
    console.error("Unable to verify Stripe webhook:", error);
    return NextResponse.json({ message: "Invalid Stripe webhook." }, { status: 400 });
  }

  try {
    await connectMongoDB();

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object;
      if (session.payment_status === "paid") {
        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id || "";
        const result = await Booking.updateOne(
          {
            _id: session.metadata?.bookingId,
            stripeCheckoutSessionId: session.id,
          },
          {
            $set: { paymentStatus: "paid", stripePaymentIntentId: paymentIntentId },
          }
        );

        if (result.matchedCount === 0) {
          console.error("No booking matches paid Stripe checkout session:", session.id);
          return NextResponse.json({ message: "Booking not found for Stripe session." }, { status: 500 });
        }
      }
    } else if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      await Booking.updateOne(
        {
          _id: session.metadata?.bookingId,
          stripeCheckoutSessionId: session.id,
          paymentStatus: "unpaid",
        },
        { $set: { paymentStatus: "expired" } }
      );
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing Stripe webhook:", error);
    return NextResponse.json({ message: "Unable to process Stripe webhook." }, { status: 500 });
  }
}
