'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/appError');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {

    static associate(models) {

    }
  }
  user.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userType: {
      type: DataTypes.ENUM('0', '1', '2'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User type is required',
        },
        notEmpty: {
          msg: 'User type cannot be empty',
        },
      },
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required',
        },
        notEmpty: {
          msg: 'First name cannot be empty',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name is required',
        },
        notEmpty: {
          msg: 'Last name cannot be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please provide a valid email address',
        },
        notNull: {
          msg: 'Email is required',
        },
        notEmpty: {
          msg: 'Email cannot be empty',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required',
        },
        notEmpty: {
          msg: 'Password cannot be empty',
        },
      },
    },
    comfirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (this.password.length < 6) {
          throw new AppError('Password must be between 6 and 30 characters long', 400);
        }
        if (value === this.password) {
          const hashedPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hashedPassword);
          this.setDataValue('comfirmPassword', value);
        } else {
          throw new AppError('Password confirmation does not match password', 400);
        }
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,  
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};