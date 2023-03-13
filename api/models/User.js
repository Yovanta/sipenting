import mongoose from "mongoose";
const { schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    bookings: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Booking",
      },
    ],
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
