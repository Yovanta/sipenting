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
    photos: {
      type: [String],
    },
    status: {
      type: Boolean,
      default: false,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    items: {
      type: [String],
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
