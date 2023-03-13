import express from "express";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updatedBooking,
} from "../controllers/booking.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/:roomId", verifyUser, createBooking);
router.get("/", verifyAdmin, getBookings);
router.put("/:id", verifyAdmin, updatedBooking);
router.delete("/:id", verifyAdmin, deleteBooking);

export default router;
