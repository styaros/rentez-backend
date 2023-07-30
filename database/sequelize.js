const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "rentez",
});

module.exports = sequelize;
