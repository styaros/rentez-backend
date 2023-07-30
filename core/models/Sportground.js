const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../database/sequelize");
const SportgroundType = require("./SportgroundType");
const Company = require("./Company");

const Sportground = sequelize.define(
  "sportgrounds",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    work_start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    work_end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Sportground.belongsTo(SportgroundType, {
  foreignKey: "sportground_type_id",
  onDelete: "SET NULL",
});
Sportground.belongsTo(Company, {
  foreignKey: "company_id",
  onDelete: "CASCADE",
});

module.exports = Sportground;
