import express from "express";
import connectDB from "./src/config/mongo.config.js";
import dotenv from "dotenv";
import shortUrlRouter from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";

// Load env vars
dotenv.config({ path: "./.env" });

// Connect to Database
connectDB();

const app = express();

// Middleware to handle JSON and URL-encoded data
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST - Create short URL
app.use("/api/create", shortUrlRouter);

// GET - Redirection to full URL
app.get("/:id", redirectFromShortUrl);

const PORT = process.env.PORT || 5000;

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
