import UrlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

// Data Access Object - DAO  (if we need to change DB, we only change here)
export const saveShortUrl = async (longUrl, shortUrl, userId) => {
  try {
    const newUrl = new UrlSchema({
      full_url: longUrl,
      short_url: shortUrl
    });

    if (userId) {
      newUrl.user_id = userId;
    }

    await newUrl.save();
  } catch (err) {
    if (err.code == 11000) {
      throw new ConflictError("Short URL already exists");
    }
    throw new Error(err);
  }
};

export const findUrlFromShortUrl = async (shortUrl) => {
  return await UrlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
};
