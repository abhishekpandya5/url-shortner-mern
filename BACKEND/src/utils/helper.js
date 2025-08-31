import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken";

export const generateNanoId = (length) => {
  const id = nanoid(length);
  return id;
};

export const signToken = (payload) => {
  const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
  return token;
};

export const verifyToken = (token) => {
  const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};
