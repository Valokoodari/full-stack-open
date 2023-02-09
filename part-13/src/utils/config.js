require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "production",
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET,
};
