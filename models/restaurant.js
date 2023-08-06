const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

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

});

module.exports = Restaurant;
