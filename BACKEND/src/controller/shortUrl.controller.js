import { findUrlFromShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser } from "../services/shortUrl.service.js";

export const createShortUrl = async (req, res) => {
  console.error(req.body);
  const { url } = req.body;

  const shortUrl = await createShortUrlWithoutUser(url);
  res.send(process.env.APP_URL + shortUrl);
};

export const redirectFromShortUrl = async (req, res) => {
  const { id } = req.params;

  const urlData = await findUrlFromShortUrl(id);

  if (!urlData) {
    return res.status(404).send("URL not found");
  }

  // urlData.clicks += 1;
  // await urlData.save();

  res.redirect(urlData.full_url);
};
