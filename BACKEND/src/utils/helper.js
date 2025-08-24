import { nanoid } from "nanoid";

export const generateNanoId = async (length) => {
  const id = await nanoid(length);
  return id;
};
