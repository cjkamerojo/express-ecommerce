const crypto = require('crypto');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/aodatabase');

class User extends Model {
  validatePassword(passwordAttempt) {
    const hash = crypto.createHash('sha256');
    hash.update(passwordAttempt + this.salt);
    const hashedAttempt = hash.digest('hex');
    return this.password === hashedAttempt;
  }
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!',
      },
      validate: {
        isEmail: true,
      },
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.createHash('sha256');
        hash.update(value + salt);
        this.setDataValue('password', hash.digest('hex'));
        this.setDataValue('salt', salt);
      },
    },
  },
  { sequelize }
);

module.exports = User;