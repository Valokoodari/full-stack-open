const { Op } = require("sequelize");
const router = require("express").Router();
const { loginExtractor } = require("../utils/middleware");
const { Blog, User } = require("../models");

const blogFinder = async (req, _, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    next();
  } catch (error) {
    next(error);
  }
};

router.get("/", async (req, res, next) => {
  try {
    console.log("Query: ", req.query);
    let where = {};

    if (req.query.search) {
      where.title = {
        [Op.substring]: req.query.search.toLocaleLowerCase(),
      };
    }

    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
      },
      where,
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", loginExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    try {
      await req.blog.save();
      res.json(req.blog);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", blogFinder, loginExtractor, async (req, res) => {
  if (req.blog) {
    const user = await User.findByPk(req.user.id);
    if (req.blog.userId !== user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await req.blog.destroy();
  }
  res.status(204).end();
});

module.exports = router;
