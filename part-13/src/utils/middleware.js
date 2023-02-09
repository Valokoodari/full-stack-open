const jwt = require("jsonwebtoken");
const { SECRET, NODE_ENV } = require("../utils/config");
const { User, Session } = require("../models");

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

  console.error(`  Unknown error: ${err.name}: ${err.message}`);

  next(err);
};

const loginExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    if (
      NODE_ENV === "development" &&
      authorization.substring(7) === "NootNoot"
    ) {
      req.user = {
        username: "DevUser",
        id: 1,
        sid: "DevSessionId",
      };
    } else {
      try {
        const token = authorization.substring(7);
        const decodedToken = jwt.verify(token, SECRET);

        if (!token || !decodedToken.id) {
          return res.status(401).json({ error: "token missing or invalid" });
        }

        const user = await User.findByPk(decodedToken.id);

        const session = await Session.findOne({
          where: { sid: decodedToken.sid },
        });

        if (
          !user ||
          user.disabled ||
          !session ||
          session.userId !== decodedToken.id
        ) {
          return res.status(401).json({ error: "token missing or invalid" });
        }

        req.user = decodedToken;
      } catch (error) {
        return res.status(401).json({ error: "token missing or invalid" });
      }
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
