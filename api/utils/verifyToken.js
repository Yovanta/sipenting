import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = async (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      const userId = req.body.userId || req.params.id;
      if (req.user && req.user.id === userId) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  } catch (err) {
    return next(createError(500, "Internal server error"));
  }
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
