import UrlSchema from "../models/shortUrl.model.js";

// Data Access Object - DAO  (if we need to change DB, we only change here)
export const saveShortUrl = async (longUrl, shortUrl, userId) => {
  const newUrl = new UrlSchema({
    full_url: longUrl,
    short_url: shortUrl
  });

  if (userId) {
    newUrl.user_id = userId;
  }

  newUrl.save();
};

export const findUrlFromShortUrl = async (shortUrl) => {
  return await UrlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
};
