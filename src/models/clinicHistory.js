// src/models/clinicHistory.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');
const { Pet } = require('./pet'); 

const ClinicHistory = sequelize.define('ClinicHistory', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  petId: {
    type: DataTypes.INTEGER,
    references: {
      model: Pet,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
  freezeTableName: true,
  tableName: 'clinic_histories',
});

module.exports = {
  ClinicHistory
};
