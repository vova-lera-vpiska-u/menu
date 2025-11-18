import express from "express";
import jsonwebtoken from "jsonwebtoken";

// Helper to decode your base64 private key from env
export const getPrivateKey = (): string => {
  const key = process.env.TOKEN_PRIVATE_KEY;
  if (!key) {
    throw new Error("TOKEN_PRIVATE_KEY is not defined in environment variables");
  }
  return Buffer.from(key, "base64").toString("utf8");
};

const algorithm: jsonwebtoken.Algorithm = "RS256";

// JWT config object
export const jwt = {
  secret: getPrivateKey(),
  algorithms: [algorithm],
  onExpired: async (req: Request, err: { inner: { expiredAt: number } }) => {
    // allow a small grace period of 5 seconds
    if (Date.now() - err.inner.expiredAt < 5000) {
      return;
    }
    throw err;
  },
  getToken: (req: express.Request): string | null => {
    // assumes you are using cookie-parser
    if (req.cookies?.jwt && typeof req.cookies.jwt === "string") {
      return req.cookies.jwt;
    }
    return null;
  },
};
