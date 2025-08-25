import { findUrlFromShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser } from "../services/shortUrl.service.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    const shortUrl = await createShortUrlWithoutUser(url);
    res.send(process.env.APP_URL + shortUrl);
  } catch (err) {
    next(err);
  }
};

export const redirectFromShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const urlData = await findUrlFromShortUrl(id);

    if (!urlData) {
      throw new Error("Short URL not found");
    }

    // urlData.clicks += 1;
    // await urlData.save();

    res.redirect(urlData.full_url);
  } catch (err) {
    next(err);
  }
};
