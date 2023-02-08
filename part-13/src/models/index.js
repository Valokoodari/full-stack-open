const Favorite = require("./favorite");
const Blog = require("./blog");
const User = require("./user");

User.hasMany(Blog);
User.hasMany(Favorite);

Blog.belongsTo(User);
Blog.hasMany(Favorite);

Favorite.belongsTo(User);
Favorite.belongsTo(Blog);

module.exports = {
  Favorite,
  Blog,
  User,
};
