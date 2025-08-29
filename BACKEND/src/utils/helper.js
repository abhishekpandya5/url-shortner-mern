import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken";

export const generateNanoId = async (length) => {
  const id = await nanoid(length);
  return id;
};

export const signToken = async (payload) => {
  const token = await jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  return token;
};

export const verifyToken = async (token) => {
  const decoded = await jsonwebtoken.verify(token, process.env.JWT_SECRET);
  return decoded;
};
