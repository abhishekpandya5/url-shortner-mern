import { findUrlFromShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser } from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const { url } = req.body;
  const shortUrl = await createShortUrlWithoutUser(url);
  res.send(process.env.APP_URL + shortUrl);
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const urlData = await findUrlFromShortUrl(id);

  if (!urlData) {
    throw new Error("Short URL not found");
  }

  // urlData.clicks += 1;
  // await urlData.save();

  res.redirect(urlData.full_url);
});
