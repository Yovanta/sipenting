import express from "express";
import {
  countByType,
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  popularRooms,
  updateRoom,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:id", verifyAdmin, deleteRoom);

//GET
router.get("/find/:id", getRoom);

//GET ALL
router.get("/", getRooms);
router.get("/countByType", countByType);
router.get("/popular", popularRooms);

export default router;
