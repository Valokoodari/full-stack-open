const Favorite = require("./favorite");
const Session = require("./session");
const Blog = require("./blog");
const User = require("./user");

User.hasMany(Blog);
User.hasMany(Session);
User.hasMany(Favorite);

Blog.belongsTo(User);
Blog.hasMany(Favorite);

Session.belongsTo(User);

Favorite.belongsTo(User);
Favorite.belongsTo(Blog);

module.exports = {
  Favorite,
  Session,
  Blog,
  User,
};
