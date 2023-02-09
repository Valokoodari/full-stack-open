const router = require("express").Router();
const { loginExtractor } = require("../utils/middleware");
const { Session } = require("../models");

router.delete("/", loginExtractor, async (req, res, next) => {
  try {
    await Session.destroy({ where: { sid: req.user.sid } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
