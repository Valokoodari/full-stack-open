require("dotenv").config();

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.SECRET || "VERY_SECRET_KEY";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/library";

module.exports = { PORT, JWT_SECRET, MONGODB_URI };
