import jwt from "jsonwebtoken";

export const sendCookie = (User, res, message, statusCode) => {
  const token = jwt.sign({ _id: User._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      secure: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    })
    .json({
      success: true,
      message: message,
    });
};
