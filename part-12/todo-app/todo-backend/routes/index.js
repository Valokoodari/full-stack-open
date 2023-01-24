const express = require("express");
const router = express.Router();

const configs = require("../util/config");
const { getAsync } = require("../redis");

let visits = 0;

router.get("/statistics", async (req, res) => {
  const added_todos = await getAsync("added_todos");
  if (!added_todos || isNaN(added_todos)) {
    return res.send({ added_todos: 0 });
  }
  return res.send({ added_todos: parseInt(added_todos) });
});

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

module.exports = router;
