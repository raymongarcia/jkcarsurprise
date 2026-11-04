import Link from "next/link";
import { getStripe } from "@/lib/stripe";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  let paymentVerified = false;

  if (sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      paymentVerified = session.payment_status === "paid";
    } catch (error) {
      console.error("Unable to verify completed Stripe checkout:", error);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="max-w-xl rounded-[2rem] border border-emerald-500/20 bg-white/5 p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
          {paymentVerified ? "Payment received" : "Payment confirmation pending"}
        </p>
        <h1 className="mt-4 text-4xl font-black">Thank you for your reservation</h1>
        <p className="mt-4 text-slate-300">
          {paymentVerified
            ? "Your payment is confirmed. Your reservation remains pending until our team confirms the event details. We will follow up by email."
            : "We could not verify your payment yet. If you completed checkout, please check your email or contact us before trying again."}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
