// src/models/pet.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');
const { Client } = require('./client'); 

const Pet = sequelize.define('Pet', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING(1),
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    references: {
      model: Client,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
  freezeTableName: true,
  tableName: 'pets',
});

module.exports = {
  Pet
};
