const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('restaurant_db', 'root', 'daman123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
