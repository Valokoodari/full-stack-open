const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (_, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.post("/", async (req, res) => {
  try {
    const body = new Blog(req.body)

    const user = await User.findById(body.user)

    if (!user) {
      return res.status(400).json({ error: "invalid user id" })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

blogsRouter.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: "query"
  })

  if (updatedBlog) {
    res.json(updatedBlog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
