const User = require('./user');
const Cart = require('./cart');
const Product = require('./product');
const sequelize = require('../config/aodatabase');

// Define relationships
User.hasMany(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart, { through: 'CartProduct' });
Cart.belongsToMany(Product, { through: 'CartProduct' });


// Sync the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('PostgreSQL database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });



//Export the Modules
module.exports = { User, Cart, Product };