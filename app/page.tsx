"use client";

import Link from "next/link";
import { useState } from "react";
import packages from "@/lib/packages";
import FacebookContactLink from "@/app/components/FacebookContactLink";

const pricesByCurrency = {
  PHP: (value: number) => `₱${value.toLocaleString()}`,
  USD: (value: number) => `$${(value / 58).toFixed(2)}`,
};

const highlights = [
  "Custom satin reveal styling",
  "Photo + video moment capture",
  "Flexible delivery windows",
  "Personalized message cards",
  "Luxury vehicle presentation",
  "Professional service team",
];

const steps = [
  { title: "Choose your vibe", text: "Pick the reveal package that matches your celebration and budget." },
  { title: "Personalize the details", text: "Add your message, color palette, route timing, and reveal scene." },
  { title: "We handle the surprise", text: "Our team coordinates the car styling, arrival setup, and final reveal experience." },
];

const testimonials = [
  {
    name: "Ariana M.",
    quote: "Our anniversary surprise felt cinematic. The whole reveal was beautifully planned and completely stress-free.",
  },
  {
    name: "Jared T.",
    quote: "The team made my wife’s birthday feel like a luxury event. The car looked incredible and the experience was unforgettable.",
  },
  {
    name: "Nina R.",
    quote: "We used the VIP package for a graduation gift and it exceeded every expectation. Worth every peso.",
  },
];

const motifExamples = [
  {
    title: "Birthday Bash",
    accent: "from-pink-500 to-rose-500",
    text: "Hot pink and pastel balloons with a celebratory message on the rear window and bumper trim.",
  },
  {
    title: "Anniversary Glow",
    accent: "from-red-500 to-amber-400",
    text: "A romantic rose-gold setup with heart patterns, a custom love note, and premium lighting details.",
  },
  {
    title: "K-Drama Romance",
    accent: "from-violet-500 to-pink-500",
    text: "Soft neon-inspired styling with elegant lettering, floral accents, and a cinematic reveal concept.",
  },
  {
    title: "Custom Motif",
    accent: "from-cyan-500 to-sky-500",
    text: "Any idea your client wants — sports, debut, corporate campaign, wedding, or personal milestone.",
  },
];

export default function Home() {
  const [currency, setCurrency] = useState<"PHP" | "USD">("PHP");

  const displayPrice = (value: number) => pricesByCurrency[currency](value);
  const featuredPrice = displayPrice(packages[1].price);

  return (
    <main className="bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-wide text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-red-500 font-bold text-slate-950">
              JK
            </span>
            JK Car Surprise
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <Link href="#services" className="transition hover:text-white">Services</Link>
            <Link href="#how-it-works" className="transition hover:text-white">How it works</Link>
            <Link href="#reviews" className="transition hover:text-white">Reviews</Link>
            <Link href="/shop" className="transition hover:text-white">Shop</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-amber-400 hover:text-amber-300 sm:inline-flex"
            >
              Login
            </Link>
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 sm:flex">
              <button
                type="button"
                onClick={() => setCurrency("PHP")}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
                  currency === "PHP" ? "bg-amber-400 text-slate-950" : "text-slate-300"
                }`}
              >
                <span className="text-base">₱</span>
                PHP
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
                  currency === "USD" ? "bg-amber-400 text-slate-950" : "text-slate-300"
                }`}
              >
                <span className="text-base">$</span>
                USD
              </button>
            </div>
            <Link href="/shop" className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-amber-400 hover:text-amber-300 sm:inline-flex">
              Browse packages
            </Link>
            <Link href="/checkout" className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
              Book now
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(239,68,68,0.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
          <div>
            <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
              Car surprise service in the Philippines
            </span>
            <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
              We design the back of the car to match your motif and create a surprise people will remember.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              JK Car Surprise is a customized service where we style the rear of the vehicle to fit the client’s motif — birthdays, anniversaries, graduations, proposals, and any concept they want to celebrate in a big, cinematic way.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/shop" className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300">
                Shop packages
              </Link>
              <Link href="#services" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/5">
                Explore services
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-300">
              <div>
                <div className="text-3xl font-black text-white">2.5k+</div>
                <div>Surprises delivered</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">4.9/5</div>
                <div>Average rating</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">24/7</div>
                <div>Planning support</div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-amber-500/10">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Signature reveal</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-300">Available now</span>
              </div>
              <div className="mt-6 rounded-[1.25rem] bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 p-[1px]">
                <div className="rounded-[1.2rem] bg-slate-950 p-5">
                  <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                    <span>Luxury package</span>
                    <span>VIP</span>
                  </div>
                  <div className="text-4xl font-black text-white">{featuredPrice}</div>
                  <div className="mt-6 space-y-3 text-sm text-slate-200">
                    {highlights.slice(0, 5).map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">What we offer</p>
          <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">Motif car back design for unforgettable moments</h2>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {motifExamples.map((motif) => (
            <div key={motif.title} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/80">
              <div className={`h-36 bg-gradient-to-br ${motif.accent} p-4`}>
                <div className="flex h-full items-end justify-between">
                  <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                    Motif
                  </span>
                  <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold text-white">
                    Custom
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white">{motif.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{motif.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/30">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">{pkg.title}</h3>
                <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300">
                  {pkg.badge}
                </span>
              </div>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-black text-white">{displayPrice(pkg.price)}</span>
                <span className="mb-1 text-slate-400">starting</span>
              </div>
              <p className="mt-5 text-slate-300">{pkg.description}</p>
              <p className="mt-6 text-sm font-semibold text-amber-300">Suggested inclusions (customizable)</p>
              <p className="mt-1 text-xs text-slate-400">Draft quantities and cash amounts; confirm final inclusions and pricing when booking.</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                {pkg.inclusions.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-300">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/checkout" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-3 font-semibold text-slate-950 transition hover:bg-slate-200">
                Reserve this package
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-white/10 bg-slate-900/70">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">How it works</p>
            <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">From idea to unforgettable reveal</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-lg font-bold text-slate-950">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-gradient-to-r from-slate-900 to-slate-800 p-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Why clients choose JK</p>
            <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">Luxury presentation with attention to every detail.</h2>
          </div>
          <div className="grid gap-4 text-slate-200">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-950">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-slate-900/80 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Client love</p>
            <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">Real reactions. Real memories.</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-[1.5rem] border border-white/10 bg-slate-950 p-6">
                <div className="mb-4 text-amber-400">★★★★★</div>
                <p className="text-slate-200">“{item.quote}”</p>
                <div className="mt-6 border-t border-white/10 pt-4 text-sm font-semibold text-white">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-amber-400/20 bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 p-[1px]">
          <div className="rounded-[calc(2rem-1px)] bg-slate-950 px-8 py-10 text-center md:px-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Ready to surprise?</p>
            <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">Build your perfect car reveal experience.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Tell us the occasion, your preferred vibe, and the kind of reveal you want. We’ll shape the experience around your story.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/checkout" className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300">
                Book a surprise
              </Link>
              <Link href="/shop" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/5">
                View packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>© 2026 JK Car Surprise</div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="#services" className="hover:text-white">Services</Link>
            <Link href="/shop" className="hover:text-white">Shop</Link>
            <Link href="/checkout" className="hover:text-white">Checkout</Link>
            <FacebookContactLink />
          </div>
        </div>
      </footer>
    </main>
  );
}
