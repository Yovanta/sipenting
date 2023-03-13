import Room from "../models/Room.js";
import Review from "../models/Review.js";

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate({
        path: "room",
        select: ["_id", "name"],
        model: "Room",
      })
      .populate({
        path: "userId",
        select: "username",
        model: "User",
      });

    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};
export const createReview = async (req, res, next) => {
  const roomId = req.params.room;
  const newReview = new Review({ roomId, ...req.body });
  try {
    const savedReview = await newReview.save();
    const populatedReview = await Review.findById(savedReview._id).populate(
      "room",
      "name _id"
    );
    await Room.findByIdAndUpdate(roomId, {
      $push: { reviews: savedReview._id },
    });
    await User.findByIdAndUpdate(userId, {
      $push: { reviews: savedReview._id },
    });
    
    res.status(200).json(populatedReview);
  } catch (err) {
    next(err);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  const reviewId = req.params.id;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    // Remove the review
    await Review.findByIdAndRemove(reviewId);

    // Remove review id from room reviews array
    await Room.findByIdAndUpdate(review.room, {
      $pull: { reviews: reviewId },
    });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
};
