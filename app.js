import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/User.js";
import taskRouter from "./routes/Tasks.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middlewa/auth.js";
import { errorMiddlware } from "./middlewa/error.js";
import cors from "cors";
const app = express();

config({
  path: "./data/config.env",
});
app.use(express.json());
app.use(cookieParser());
app.use(errorMiddlware);

app.use("/users", userRouter);
app.use("/tasks", isAuthenticated, taskRouter);
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "backend",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("Nice Working");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server is Working ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
