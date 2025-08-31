import express from "express";
import connectDB from "./src/config/mongo.config.js";
import dotenv from "dotenv";
import shortUrlRouter from "./src/routes/shortUrl.route.js";
import authRouter from "./src/routes/auth.route.js";
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";

// Load env vars
dotenv.config({ path: "./.env" });

// Connect to Database
connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to handle JSON and URL-encoded data
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Attach user to request object
app.use(attachUser);

// POST - Create short URL
app.use("/api/create", shortUrlRouter);

// GET - Redirection to full URL
app.get("/:id", redirectFromShortUrl);

// auth routes
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
