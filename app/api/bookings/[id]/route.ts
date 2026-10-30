import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Booking from "@/models/booking";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectMongoDB();
    const booking = await Booking.findById(id).lean();

    if (!booking) {
      return NextResponse.json({ message: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ booking }, { status: 200 });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the booking." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectMongoDB();

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        ...body,
        imageUrls: Array.isArray(body.imageUrls) ? body.imageUrls : [],
        estimatedCost: Number(body.estimatedCost || 0),
      },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ message: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Booking updated.", booking: updatedBooking }, { status: 200 });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the booking." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectMongoDB();
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return NextResponse.json({ message: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Booking deleted." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the booking." },
      { status: 500 }
    );
  }
}
