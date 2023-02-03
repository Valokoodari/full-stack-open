const express = require("express");
const { errorHandler } = require("./utils/middleware");
const { connectToDatabase } = require("./utils/db");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const { PORT } = require("./utils/config");

const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.send("ok");
});

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
