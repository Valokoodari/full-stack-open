const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Favorite extends Model {}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blogs",
        key: "id",
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "favorite",
  }
);

module.exports = Favorite;
