import express from "express";

import {
  createUser,
  findUser,
  login,
  logout,
} from "../controllers/User.js";
import { isAuthenticated } from "../middlewa/auth.js";

const router = express.Router();

router.get("/logout", logout);

router.post("/new", createUser);
router.post("/login", login);

router.get("/me", isAuthenticated, findUser);

export default router;
