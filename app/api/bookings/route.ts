import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Booking from "@/models/booking";
import packages from "@/lib/packages";
import { getStripe } from "@/lib/stripe";

const serviceFee = 1200;

export async function GET() {
  try {
    await connectMongoDB();

    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching bookings." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, packageName, motif, occasion, message } = body;

    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof packageName !== "string"
    ) {
      return NextResponse.json(
        { message: "Full name, email, and package are required." },
        { status: 400 }
      );
    }

    const selectedPackage = packages.find((item) => item.title === packageName);
    if (!selectedPackage) {
      return NextResponse.json({ message: "Please select a valid package." }, { status: 400 });
    }

    const stripe = getStripe();
    const total = selectedPackage.price + serviceFee;
    await connectMongoDB();

    const booking = new Booking({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      packageName: selectedPackage.title,
      motif: typeof motif === "string" ? motif.trim() : "",
      occasion: typeof occasion === "string" ? occasion.trim() : "",
      message: typeof message === "string" ? message.trim() : "",
      estimatedCost: total,
      paymentAmount: total,
      paymentStatus: "unpaid",
      status: "pending",
    });

    const origin = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: booking.email,
      line_items: [
        {
          price_data: {
            currency: "php",
            product_data: { name: selectedPackage.title },
            unit_amount: selectedPackage.price * 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "php",
            product_data: { name: "Service fee" },
            unit_amount: serviceFee * 100,
          },
          quantity: 1,
        },
      ],
      metadata: { bookingId: booking.id },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancelled`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    booking.stripeCheckoutSessionId = session.id;
    await booking.save();

    return NextResponse.json(
      {
        message: "Reservation created. Continue to Stripe to complete payment.",
        checkoutUrl: session.url,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the booking." },
      { status: 500 }
    );
  }
}
