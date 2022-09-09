require("dotenv").config()

const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || "development"
const MONGODB_URI = NODE_ENV === "test"
  ? "mongodb://localhost/bloglist-test"
  : process.env.MONGODB_URI || "mongodb://localhost/bloglist"

module.exports = {
  MONGODB_URI,
  NODE_ENV,
  PORT
}
