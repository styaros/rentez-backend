const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../database/sequelize");
const Box = require("./Box");
const User = require("./User");

const Reservation = sequelize.define(
  "reservations",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

Reservation.belongsTo(Box, {
  foreignKey: "box_id",
  onDelete: "SET NULL",
});

Reservation.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = Reservation;
