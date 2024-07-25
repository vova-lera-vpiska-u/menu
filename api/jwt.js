export const getPrivateKey = () => Buffer.from(process.env.TOKEN_PRIVATE_KEY || "", "base64").toString("utf8");

export const jwt = {
  secret: getPrivateKey(),
  algorithms: ["RS256"],
  onExpired: async (req, err) => {
    if (new Date() - err.inner.expiredAt < 5000) {
      return;
    }
    throw err;
  },
  getToken: (req) => {
    if (req.cookies?.jwt) {
      return req.cookies.jwt;
    }

    return null;
  },
};
