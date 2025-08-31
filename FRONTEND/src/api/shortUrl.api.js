import axiosInstance from "../utils/axiosInstance.js";

export const createShortUrl = async (url, slug) => {
  const { data } = await axiosInstance.post("/api/create", { url, slug });
  console.log(data);
  return data;
};
