const Sequelize = require('sequelize');
const sequelize = require('../config/aodatabase');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stockQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Product;