const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class User extends Model {
  toJSON = () => {
    const { passwordHash, ...rest } = this.get();
    return rest;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "user",
    defaultScope: {
      attributes: { exclude: ["passwordHash"] },
    },
  }
);

module.exports = User;
