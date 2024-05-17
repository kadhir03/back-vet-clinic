// src/models/user
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');
const { Role } = require('./role');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cellPhone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      is: {
        args: [/^\d{10}$/],
        msg: "El número de teléfono debe ser de 10 dígitos."
      }
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  rolId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role, // Use the imported Role model
      key: 'id',
    },
  }
},{
  timestamps: true, // Enable createdAt and updatedAt (if needed)
  freezeTableName: true,
  tableName: 'users'
});

module.exports = {
    User
};
