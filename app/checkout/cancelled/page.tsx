import Link from "next/link";

export default function CheckoutCancelledPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
          Payment not completed
        </p>
        <h1 className="mt-4 text-4xl font-black">Your reservation is not paid yet</h1>
        <p className="mt-4 text-slate-300">
          No payment was completed. You can return to checkout when you are ready to reserve.
        </p>
        <Link
          href="/checkout"
          className="mt-8 inline-flex rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          Back to checkout
        </Link>
      </section>
    </main>
  );
}
