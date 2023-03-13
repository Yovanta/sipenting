import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    room: {
      type: mongoose.Types.ObjectId,
      ref: "Room",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    keperluan: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
