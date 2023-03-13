import mongoose from "mongoose";
const { schema } = mongoose;

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    status: {
      type: Boolean,
      default: false,
    },
    maxPeople: {
      type: Number,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    bookings: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Booking",
      },
    ],
    items: {
      type: [String],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
