const errorHandler = (err, _, res, next) => {
  console.error(`${err.name}: ${err.message}`);

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeDatabaseError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    err.errors.forEach((error) => {
      res.status(400).json({ error: error.message });
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

module.exports = {
  errorHandler,
};
