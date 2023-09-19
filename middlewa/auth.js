import jwt from "jsonwebtoken";

import { User } from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  // console.log(req.cookies);
  const {token} = req.cookies;
  
  if (!token) {
    return res.status(404).json({
      success: false,
      message: " Login First",
    });
  }
  // console.log(process.env.JWT_SECRET);
  const decoded = jwt.verify(token,process.env.JWT_SECRET);
  // console.log(decoded);
  req.user = await User.findById(decoded._id);
  next();
};
