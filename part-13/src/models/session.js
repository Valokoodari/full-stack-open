const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Session extends Model {}

Session.init(
  {
    sid: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    underscored: true,
    modelName: "session",
  }
);

module.exports = Session;
