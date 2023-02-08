const router = require("express").Router();
const { loginExtractor } = require("../utils/middleware");
const { Blog, User, Favorite } = require("../models");

router.post("/", loginExtractor, async (req, res, next) => {
  try {
    const auth_user = await User.findByPk(req.user.id);
    if (!auth_user || auth_user.id !== req.body.userId) {
      return res.status(401).end();
    }

    const user = await User.findByPk(req.body.userId);
    const blog = await Blog.findByPk(req.body.blogId);

    if (!blog || !user) {
      return res.status(400).end();
    }

    const favorite = await Favorite.create({
      userId: user.id,
      blogId: blog.id,
    });

    const populatedFavorite = await Favorite.findByPk(favorite.id, {
      attributes: ["id", "read"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Blog,
          attributes: ["title", "author"],
        },
      ],
    });

    res.json(populatedFavorite);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", loginExtractor, async (req, res, next) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    if (!favorite) {
      return res.status(404).end();
    }

    const auth_user = await User.findByPk(req.user.id);
    if (!auth_user || auth_user.id !== favorite.userId) {
      return res.status(401).end();
    }

    favorite.read = req.body.read;

    await favorite.save();

    const populatedFavorite = await Favorite.findByPk(favorite.id, {
      attributes: ["id", "read"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Blog,
          attributes: ["title", "author"],
        },
      ],
    });

    res.json(populatedFavorite);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
