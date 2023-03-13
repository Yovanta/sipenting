import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import User from "../models/User.js";
import { isWithinRange } from "../utils/date.js";

export const createBooking = async (req, res, next) => {
  const roomId = req.params.roomId;
  const userId = req.body.userId;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const keperluan = req.body.keperluan;
  const notes = req.body.notes;

  try {
    const room = await Room.findById(roomId);
    const user = await User.findById(userId);

    // Check if the room is available between the start and end date
    const isAvailable = room.bookings.every((booking) => {
      const { startDate: bookedStartDate, endDate: bookedEndDate } = booking;
      const start = new Date(bookedStartDate);
      const end = new Date(bookedEndDate);
      return (
        isWithinRange(startDate, bookedStartDate, bookedEndDate) ||
        isWithinRange(endDate, bookedStartDate, bookedEndDate) ||
        (startDate < bookedStartDate && endDate < bookedStartDate) ||
        (startDate > bookedEndDate && endDate > bookedEndDate)
      );
    });

    // if (!isAvailable) {
    //   return res
    //     .status(400)
    //     .json({ message: "The room is not available on the selected date." });
    // }

    const booking = new Booking({
      room: roomId,
      userId: userId,
      startDate,
      endDate,
      keperluan,
      notes,
    });

    // Save the booking
    const savedBooking = await booking.save();
    const populateBooking = await Booking.findById(savedBooking._id).populate(
      "userId",
      "username _id"
    )

    // Add the booking to the room
    room.bookings.push(populateBooking);
    await room.save();

    // Add the booking to the user
    user.bookings.push(populateBooking);
    await user.save();

    res.status(201).json(populateBooking);
  } catch (err) {
    next(err);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
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
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

export const updatedBooking = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    next(err);
  }
};

// Delete a booking and update the room
export const deleteBooking = async (req, res, next) => {
  const bookingId = req.params.id;

  try {
    // Find the booking that needs to be deleted
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    await Booking.deleteOne({ _id: bookingId });
    const room = await Room.findById(booking.room);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    room.bookings = room.bookings.filter(
      (bookingObj) => bookingObj._id.toString() !== bookingId
    );

    await room.save();

    return res.json({
      message: "Booking deleted successfully",
      room,
    });
  } catch (error) {
    return next(error);
  }
};
