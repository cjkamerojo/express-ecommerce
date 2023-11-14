const Sequelize = require('sequelize');
const sequelize = require('../config/aodatabase');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: Sequelize.ENUM('active', 'closed'),
    allowNull: false
  }
});

module.exports = Cart;