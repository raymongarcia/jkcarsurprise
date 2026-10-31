import Link from "next/link";
import packages from "@/lib/packages";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-wide text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-red-500 font-bold text-slate-950">
              JK
            </span>
            JK Car Surprise
          </Link>
          <Link href="/checkout" className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
            Book now
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Shop services</p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">Choose your surprise package</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">{item.tag}</div>
              <h2 className="mt-4 text-3xl font-black text-white">{item.title}</h2>
              <div className="mt-5 text-4xl font-black text-white">₱{item.price.toLocaleString()}</div>
              <p className="mt-4 text-sm text-slate-300">{item.description}</p>
              <p className="mt-6 text-sm font-semibold text-amber-300">Suggested inclusions (customizable)</p>
              <p className="mt-1 text-xs text-slate-400">Draft quantities and cash amounts; confirm final inclusions and pricing when booking.</p>
              <ul className="mt-3 space-y-3 text-slate-200">
                {item.inclusions.map((detail) => (
                  <li key={detail} className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-300">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
              <Link href="/checkout" className="mt-8 inline-flex w-full justify-center rounded-full bg-amber-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-300">
                Reserve this package
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
