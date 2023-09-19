import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewa/error.js";

// getting all the users
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", " ", { expires: new Date(Date.now()) })
      .json({
        success: true,
        user: req.user,
        secure: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      });
  } catch (error) {
    next(error);
  }
};

// creating a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User Already Exitst", 404));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, req, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const findUser = (req, res) => {
  console.log(req.user);
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Email", 404));
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Password or Email", 404));
    }

    sendCookie(user, res, `Welcome Back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};
