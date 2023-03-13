import mongoose from "mongoose";
const { schema } = mongoose;

const UserVerificationSchema = new mongoose.Schema({
  userId: String,
  uniqueString: String,
  createdAt: Date,
  expiredAt: Date,
});

export default mongoose.model("UserVerification", UserVerificationSchema);
