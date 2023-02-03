const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

const errorHandler = (err, _, res, next) => {
  console.error(`${err.name}: ${err.message}`);

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeDatabaseError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    err.errors.forEach((error) => {
      return res.status(400).json({ error: error.message });
    });
    return res.status(400).json({ error: err.message });
  }

  if (
    err.name === "SequelizeConnectionRefusedError" ||
    err.name === "SequelizeConnectionError"
  ) {
    return res.status(500).json({ error: "Database connection error" });
  }

  console.log(`Unknown error: ${err.name}: ${err.message}`);

  next(err);
};

const loginExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);
      const decodedToken = jwt.verify(token, SECRET);
      if (!token || !decodedToken.id) {
        return res.status(401).json({ error: "token missing or invalid" });
      }
      req.user = decodedToken;
    } catch (error) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  next();
};

module.exports = {
  loginExtractor,
  errorHandler,
};
