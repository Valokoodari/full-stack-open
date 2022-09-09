const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (_, res) => {
  const blogs = await Blog.find({})

  res.json(blogs)
})

blogsRouter.post("/", async (req, res) => {
  try {
    const blog = new Blog(req.body)

    const savedBlog = await blog.save()

    res.status(201).json(savedBlog)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)

  res.status(204).end()
})

module.exports = blogsRouter
