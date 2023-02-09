const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { SECRET } = require("../utils/config");
const { User, Session } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "username or password missing",
      });
    }

    const user = await User.unscoped().findOne({ where: { username } });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }

    if (user.disabled) {
      return res.status(401).json({
        error: "user is disabled",
      });
    }

    const session = await Session.create({ sid: uuid.v4(), userId: user.id });

    const dataForToken = {
      username: user.username,
      id: user.id,
      sid: session.sid,
    };

    const token = jwt.sign(dataForToken, SECRET, { expiresIn: "30d" });

    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
