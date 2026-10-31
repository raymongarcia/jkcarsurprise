import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Booking from "@/models/booking";

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

    if (!fullName || !email || !packageName) {
      return NextResponse.json(
        { message: "Full name, email, and package are required." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const booking = await Booking.create({
      fullName,
      email,
      packageName,
      motif: motif || "",
      occasion: occasion || "",
      message: message || "",
      status: "pending",
    });

    return NextResponse.json(
      {
        message: "Booking request created successfully.",
        booking,
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
