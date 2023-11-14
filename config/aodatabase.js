const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'timmy', 'timmy', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to PGSQL has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;