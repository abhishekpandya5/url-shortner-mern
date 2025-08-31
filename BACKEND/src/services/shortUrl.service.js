import { generateNanoId } from "../utils/helper.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);
  if (!shortUrl) throw new Error("Error generating short URL");

  await saveShortUrl(url, shortUrl);
  return shortUrl;
};

export const createShortUrlWithUser = async (url, userId, slug = null) => {
  const shortUrl = slug || generateNanoId(7);

  const exists = await getCustomShortUrl(slug);
  if (exists) throw new Error("This custom url already exists");

  await saveShortUrl(url, shortUrl, userId);
  return shortUrl;
};
