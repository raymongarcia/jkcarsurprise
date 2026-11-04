import mongoose, { Schema, models } from "mongoose";

const bookingSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    motif: {
      type: String,
      default: "",
      trim: true,
    },
    occasion: {
      type: String,
      default: "",
      trim: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    estimatedCost: {
      type: Number,
      default: 0,
    },
    paymentAmount: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "expired"],
      default: "unpaid",
    },
    stripeCheckoutSessionId: {
      type: String,
      default: "",
      select: false,
    },
    stripePaymentIntentId: {
      type: String,
      default: "",
      select: false,
    },
    deliveryDate: {
      type: Date,
      default: null,
    },
    imageUrls: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
