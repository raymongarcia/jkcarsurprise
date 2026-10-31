"use client";

import Link from "next/link";
import { useState } from "react";
import packages from "@/lib/packages";
import FacebookContactLink from "@/app/components/FacebookContactLink";

const initialForm = {
  fullName: "",
  email: "",
  packageName: "Luxury Launch",
  motif: "",
  occasion: "",
  message: "",
};

export default function CheckoutPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const selectedPackage = packages.find((item) => item.title === form.packageName) ?? packages[0];

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit booking.");
      }

      setStatus({
        type: "success",
        message: "Booking request sent successfully. We will contact you soon.",
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while creating the booking.",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <Link href="/shop" className="text-sm text-slate-300 transition hover:text-white">
            Back to shop
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Checkout</p>
          <h1 className="mt-4 text-4xl font-black text-white">Book your surprise</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Full name</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Service package</label>
              <select name="packageName" value={form.packageName} onChange={handleChange}>
                {packages.map((item) => (
                  <option key={item.title} value={item.title}>{item.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Motif</label>
              <input
                type="text"
                name="motif"
                value={form.motif}
                onChange={handleChange}
                placeholder="Birthday, anniversary, or your custom idea"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Occasion</label>
              <input
                type="text"
                name="occasion"
                value={form.occasion}
                onChange={handleChange}
                placeholder="Birthday, anniversary, graduation..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Tell us your plan</label>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your vision, preferred timing, colors, and reveal idea."
              />
            </div>

            {status && (
              <div
                className={`rounded-xl border px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                    : "border-red-500/30 bg-red-500/10 text-red-200"
                }`}
              >
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Confirm booking request"}
            </button>
          </form>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Order summary</p>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between text-slate-300">
              <span>{selectedPackage.title}</span>
              <span>₱{selectedPackage.price.toLocaleString()}</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-slate-300">
              <span>Service fee</span>
              <span>₱1,200</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-lg font-bold text-white">
              <span>Total</span>
              <span>₱{(selectedPackage.price + 1200).toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold text-amber-300">Suggested inclusions (customizable)</p>
            <p className="mt-1 text-xs text-slate-400">Draft quantities and cash amounts; confirm final inclusions and pricing when booking.</p>
            <ul className="mt-3 space-y-3 text-sm text-slate-300">
              {selectedPackage.inclusions.map((item) => <li key={item}>• {item}</li>)}
            </ul>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="mb-2 text-sm text-slate-300">Questions about a package?</p>
              <FacebookContactLink />
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
