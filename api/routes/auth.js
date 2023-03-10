import express from "express";
import { login, register, verify } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify/:userId/:uniqueString", verify);
router.post("/login", login);

export default router;
