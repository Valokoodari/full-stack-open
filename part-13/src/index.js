const express = require("express");
const readingListRouter = require("./controllers/favorites");
const authorsRouter = require("./controllers/authors");
const { errorHandler } = require("./utils/middleware");
const logoutRouter = require("./controllers/logout");
const { connectToDatabase } = require("./utils/db");
const blogsRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const { PORT } = require("./utils/config");

const app = express();

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readingListRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
