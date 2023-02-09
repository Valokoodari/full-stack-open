const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sessions", {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
    await queryInterface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions");
    await queryInterface.removeColumn("users", "disabled");
  },
};
