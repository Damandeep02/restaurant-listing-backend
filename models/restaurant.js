const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 
const User = require('./user');

const Restaurant = sequelize.define('Restaurant', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, 
    allowNull: true, 
  },
  added_by: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
  }

});
Restaurant.belongsTo(User, { foreignKey: 'added_by' });
module.exports = Restaurant;
