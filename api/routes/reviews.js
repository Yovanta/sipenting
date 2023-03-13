import express from "express";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controllers/review.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/:id", verifyUser, createReview);
router.get("/", getReviews);
router.put("/:id", verifyUser, updateReview);
router.delete("/:id", deleteReview);

export default router;
