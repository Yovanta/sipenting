import User from "../models/User.js";
import UserVerification from "../models/UserVerification.js";

import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log(success);
  }
});

const salt = bcrypt.genSaltSync(10);

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      occupation: req.body.occupation,
      verified: false,
    });
    const emailExists = await User.exists({ email: req.body.email });
    if (emailExists) {
      return next(createError(409, "Email is already in use"));
    }

    const usernameExists = await User.exists({ username: req.body.username });
    if (usernameExists) {
      return next(createError(409, "Username is already in use"));
    }

    await newUser.save().then((result) => {
      sendVerificationEmail(result, res);
    });
    res
      .status(202)
      .send(
        "User account created. Please check your email to complete the registration process."
      );
  } catch (err) {
    next(err);
  }
};

const sendVerificationEmail = async ({ _id, email }, res) => {
  const uniqueString = uuidv4() + _id;
  console.log(uniqueString);
  try {
    const verificationUrl = `${process.env.REACT_APP_URL}/verify/${_id}/${uniqueString}`;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email Account",
      html: `<p>Verify your email address to complete the signup and login into your account <b>This link expires in 6 hours</b>.</p> <p>Klik this link <a href=${verificationUrl} target="_blank">here</a></p>`,
    };

    const hashedUniqueString = await bcrypt.hash(uniqueString, salt);
    const newVerification = new UserVerification({
      userId: _id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiredAt: Date.now() + 21600000,
    });
    await newVerification.save();
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({
          message: "Could not send verification email",
        });
      } else {
        console.log("Email sent: " + info.response);
        res
          .status(201)
          .json({ status: "PENDING", message: "Verification email sent" });
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Could not send verification email" });
  }
};

export const verify = async (req, res, next) => {
  const { userId, uniqueString } = req.params;
  console.log("Verify function called");
  try {
    const userVerification = await UserVerification.findOne({ userId });
    if (!userVerification) {
      return res.status(400).json({ message: "Invalid verification link" });
    }
    const isMatch = await bcrypt.compare(
      uniqueString,
      userVerification.uniqueString
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid verification link" });
    }
    if (userVerification.expiredAt < new Date()) {
      await userVerification.delete();
      return res.status(400).json({ message: "Verification link has expired" });
    }
    await User.findByIdAndUpdate(userId, { verified: true });
    await userVerification.delete();
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    if (!user.verified) {
      return next(
        createError(400, "Email hasn't been verified yet. Check your inbox")
      );
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
