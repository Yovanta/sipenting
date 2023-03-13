import Room from "../models/Room.js";

export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room).populate("reviews");
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  const name = req.query.name;
  try {
    let rooms;
    if (name) {
      let query = {};
      query.name = { $regex: name, $options: "i" };
      rooms = await Room.find(query);
    } else {
      rooms = await Room.find().populate("reviews");
    }
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const meetingCount = await Room.countDocuments({ type: "meeting room" });
    const coworkingCount = await Room.countDocuments({
      type: "coworking space",
    });
    const aulaCount = await Room.countDocuments({ type: "aula" });

    res.status(200).json([
      { type: "meeting room", count: meetingCount },
      { type: "coworking space", count: coworkingCount },
      { type: "aula", count: aulaCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const popularRooms = async (req, res, next) => {
  try {
    const popular = await Room.aggregate([
      {
        $project: {
          name: 1,
          description: 1,
          type: 1,
          photos: 1,
          status: 1,
          maxPeople: 1,
          items: 1,
          bookingsCount: { $size: "$bookings" },
        },
      },
      {
        $sort: { bookingsCount: -1 },
      },
    ]).limit(4);

    res.json(popular);
  } catch (error) {
    next(error);
  }
};
