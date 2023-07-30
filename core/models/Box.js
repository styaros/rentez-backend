const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../database/sequelize");
const Sportground = require("./Sportground");

const Box = sequelize.define(
  "boxes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    hour_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Box.belongsTo(Sportground, {
  foreignKey: "sportground_id",
  onDelete: "CASCADE",
});

module.exports = Box;
