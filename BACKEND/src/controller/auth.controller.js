import { cookieOptions } from "../config/config.js";
import {
  loginUserService,
  registerUserService
} from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const registerUser = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const token = await registerUserService(name, email, password);

  res.cookie("accessToken", token, cookieOptions);

  res.status(201).json({
    message: "Register successful"
  });
});

export const loginUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  const token = await loginUserService(email, password);

  res.cookie("accessToken", token, cookieOptions);

  res.status(200).json({
    message: "Login successful"
  });
});
