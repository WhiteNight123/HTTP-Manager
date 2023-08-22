module.exports = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    url: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/http-manager",
  },
  // jwt密钥
  secret: "http-manager",
};
