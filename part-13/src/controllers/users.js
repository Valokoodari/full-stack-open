const bcrypt = require("bcrypt");
const router = require("express").Router();
const { User, Blog } = require("../models");

router.get("/", async (_, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: ["title", "url", "likes"],
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
      return res.status(400).json({
        error: "username, name, and password are required",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ username, name, passwordHash });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    if (user) {
      user.username = req.body.username;
      await user.save();
      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
