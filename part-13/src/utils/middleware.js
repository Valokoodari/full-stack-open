const errorHandler = (err, req, res, next) => {
  console.error(err.name + ": " + err.message);

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeDatabaseError"
  ) {
    return res.status(400).json({ error: err.message });
  }

  if (
    err.name === "SequelizeConnectionRefusedError" ||
    err.name === "SequelizeConnectionError"
  ) {
    return res.status(500).json({ error: "Database connection error" });
  }

  next(err);
};

module.exports = {
  errorHandler,
};
