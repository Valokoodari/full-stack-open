require("dotenv").config();
const { Sequelize, Model, DataTypes, QueryTypes } = require("sequelize");
const express = require("express");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3001;

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: DataTypes.TEXT,
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);
Blog.sync();

app.use(express.json());

app.get("/api/blogs", async (_, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).end();
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      await blog.destroy();
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
