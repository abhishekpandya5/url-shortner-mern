import express from "express";
const app = express();
import { nanoid } from "nanoid";
import connectDB from "./src/config/mongo.config.js";
import dotenv from "dotenv";
import UrlSchema from "./src/models/shortUrl.model.js";

dotenv.config({ path: "./.env" });

const PORT = 5000;

// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// POST - Create short URL
app.post("/api/create", (req, res) => {
  const { url } = req.body;

  const shortUrl = nanoid(7);
  const newUrl = new UrlSchema({
    full_url: url,
    short_url: shortUrl
  });
  newUrl.save();

  res.send(nanoid(7));
});

// GET - Redirection to full URL
app.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const urlData = await UrlSchema.findOne({ short_url: id });
    if (!urlData) {
      return res.status(404).send("URL not found");
    }
    urlData.clicks += 1;
    await urlData.save();
    res.redirect(urlData.full_url);
  } catch (error) {
    console.error("Error fetching URL:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
