const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const config = require("./utils/config")
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)

module.exports = app
