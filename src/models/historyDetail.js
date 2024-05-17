// src/models/historyDetail.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');
const { ClinicHistory } = require('./clinicHistory'); // Import the ClinicHistory model for the relationship
const { User } = require('./user'); // Import the User model for the relationship (assuming there's a User model)

const HistoryDetail = sequelize.define('HistoryDetail', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  heartRate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  observation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  clinicHistoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: ClinicHistory,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
  freezeTableName: true,
  tableName: 'history_details',
});

module.exports = {
  HistoryDetail
};
