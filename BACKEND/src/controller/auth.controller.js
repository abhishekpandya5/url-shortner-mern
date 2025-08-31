import { cookieOptions } from "../config/config.js";
import {
  loginUserService,
  registerUserService
} from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const registerUser = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const { token, user } = await registerUserService(name, email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(201).json({
    message: "Register successful"
  });
});

export const loginUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUserService(email, password);
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({
    user: user,
    message: "Login success"
  });
});

export const logoutUser = wrapAsync(async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.status(200).json({ message: "Logout success" });
});

export const getCurrentUser = wrapAsync(async (req, res) => {
  res.status(200).json({ user: req.user });
});
