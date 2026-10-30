"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import AdminBookings from "../components/AdminBookings";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading dashboard...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white">
        <div className="max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Access required</p>
          <h1 className="mt-4 text-3xl font-black">Please sign in to view admin bookings</h1>
          <p className="mt-4 text-slate-300">You need to log in before you can manage bookings and pricing.</p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-full bg-amber-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return <AdminBookings />;
}
