"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

type Booking = {
  _id: string;
  fullName: string;
  email: string;
  packageName: string;
  occasion: string;
  motif: string;
  theme?: string;
  estimatedCost: number;
  status: "pending" | "confirmed" | "completed";
  deliveryDate?: string;
  imageUrls?: string[];
  message?: string;
  createdAt?: string;
};

const emptyForm = {
  fullName: "",
  email: "",
  packageName: "Classic Reveal",
  occasion: "",
  motif: "",
  estimatedCost: 0,
  status: "pending",
  deliveryDate: "",
  imageUrls: "",
  message: "",
};

export default function AdminBookings() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load bookings.");
      }

      setBookings(data.bookings || []);
      if (data.bookings?.[0]) {
        const first = data.bookings[0];
        setSelectedId(first._id);
        setForm({
          fullName: first.fullName || "",
          email: first.email || "",
          packageName: first.packageName || "Classic Reveal",
          occasion: first.occasion || "",
          motif: first.motif || first.theme || "",
          estimatedCost: first.estimatedCost || 0,
          status: first.status || "pending",
          deliveryDate: first.deliveryDate ? new Date(first.deliveryDate).toISOString().slice(0, 10) : "",
          imageUrls: (first.imageUrls || []).join(", "),
          message: first.message || "",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchBookings();
    }
  }, [status]);

  const summary = useMemo(() => {
    const totalRevenue = bookings.reduce((sum, item) => sum + Number(item.estimatedCost || 0), 0);
    return {
      total: bookings.length,
      pending: bookings.filter((item) => item.status === "pending").length,
      confirmed: bookings.filter((item) => item.status === "confirmed").length,
      revenue: totalRevenue,
    };
  }, [bookings]);

  const selectBooking = (booking: Booking) => {
    setSelectedId(booking._id);
    setForm({
      fullName: booking.fullName || "",
      email: booking.email || "",
      packageName: booking.packageName || "Classic Reveal",
      occasion: booking.occasion || "",
      motif: booking.motif || booking.theme || "",
      estimatedCost: booking.estimatedCost || 0,
      status: booking.status || "pending",
      deliveryDate: booking.deliveryDate ? new Date(booking.deliveryDate).toISOString().slice(0, 10) : "",
      imageUrls: (booking.imageUrls || []).join(", "),
      message: booking.message || "",
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "estimatedCost" ? Number(value) || 0 : value,
    }));
  };

  const handleSave = async () => {
    if (!selectedId) return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/bookings/${selectedId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          imageUrls: form.imageUrls
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update booking.");
      }

      await fetchBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update booking.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    const confirmed = window.confirm("Delete this booking request?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/bookings/${selectedId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete booking.");
      }

      const nextBookings = bookings.filter((booking) => booking._id !== selectedId);
      setBookings(nextBookings);

      if (nextBookings[0]) {
        selectBooking(nextBookings[0]);
      } else {
        setSelectedId("");
        setForm(emptyForm);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete booking.");
    }
  };

  if (status === "loading") {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Loading admin dashboard...</div>;
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-center text-white">
        <div className="max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-black">Admin access required</h1>
          <p className="mt-4 text-slate-300">Please sign in to view and manage bookings.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Admin</p>
            <h1 className="text-2xl font-black">JK Car Surprise Bookings</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300">{session.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-slate-400">Total bookings</div>
            <div className="mt-3 text-3xl font-black">{summary.total}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-slate-400">Pending</div>
            <div className="mt-3 text-3xl font-black text-amber-300">{summary.pending}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-slate-400">Confirmed</div>
            <div className="mt-3 text-3xl font-black text-emerald-300">{summary.confirmed}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-slate-400">Revenue</div>
            <div className="mt-3 text-3xl font-black text-white">₱{summary.revenue.toLocaleString()}</div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">Loading bookings...</div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-slate-300">
                  No bookings yet.
                </div>
              ) : (
                bookings.map((booking) => (
                  <button
                    key={booking._id}
                    type="button"
                    onClick={() => selectBooking(booking)}
                    className={`w-full rounded-2xl border p-5 text-left transition ${
                      selectedId === booking._id
                        ? "border-amber-400/60 bg-amber-400/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-lg font-bold text-white">{booking.fullName}</div>
                        <div className="text-sm text-slate-400">{booking.email}</div>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                          booking.status === "confirmed"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : booking.status === "completed"
                              ? "bg-blue-500/15 text-blue-300"
                              : "bg-amber-500/15 text-amber-300"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                      <span>{booking.packageName}</span>
                      <span>₱{Number(booking.estimatedCost || 0).toLocaleString()}</span>
                    </div>
                    <div className="mt-2 text-sm text-slate-400">Motif: {booking.motif || booking.theme || "Custom"}</div>
                  </button>
                ))
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black text-white">Booking details</h2>
                {selectedId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-200"
                  >
                    Delete
                  </button>
                )}
              </div>

              {selectedId ? (
                <div className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block text-sm text-slate-300">
                      Full name
                      <input name="fullName" value={form.fullName} onChange={handleChange} className="mt-2" />
                    </label>
                    <label className="block text-sm text-slate-300">
                      Email
                      <input name="email" value={form.email} onChange={handleChange} className="mt-2" />
                    </label>
                    <label className="block text-sm text-slate-300">
                      Package
                      <select name="packageName" value={form.packageName} onChange={handleChange} className="mt-2">
                        <option value="Classic Reveal">Classic Reveal</option>
                        <option value="Luxury Launch">Luxury Launch</option>
                        <option value="VIP Arrival">VIP Arrival</option>
                      </select>
                    </label>
                    <label className="block text-sm text-slate-300">
                      Motif
                      <input name="motif" value={form.motif} onChange={handleChange} className="mt-2" />
                    </label>
                    <label className="block text-sm text-slate-300">
                      Estimated cost (PHP)
                      <input type="number" name="estimatedCost" value={form.estimatedCost} onChange={handleChange} className="mt-2" />
                    </label>
                    <label className="block text-sm text-slate-300">
                      Delivery date
                      <input type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleChange} className="mt-2" />
                    </label>
                    <label className="block text-sm text-slate-300 md:col-span-2">
                      Occasion
                      <input name="occasion" value={form.occasion} onChange={handleChange} className="mt-2" />
                    </label>
                    <label className="block text-sm text-slate-300 md:col-span-2">
                      Status
                      <select name="status" value={form.status} onChange={handleChange} className="mt-2">
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                      </select>
                    </label>
                    <label className="block text-sm text-slate-300 md:col-span-2">
                      Image URLs
                      <input
                        name="imageUrls"
                        value={form.imageUrls}
                        onChange={handleChange}
                        placeholder="https://..., https://..."
                        className="mt-2"
                      />
                    </label>
                    <label className="block text-sm text-slate-300 md:col-span-2">
                      Notes
                      <textarea rows={4} name="message" value={form.message} onChange={handleChange} className="mt-2" />
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="rounded-full bg-amber-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-300 disabled:opacity-70"
                    >
                      {saving ? "Saving..." : "Save booking"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, status: "confirmed" })}
                      className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white"
                    >
                      Mark confirmed
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-slate-300">Select a booking to edit.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
