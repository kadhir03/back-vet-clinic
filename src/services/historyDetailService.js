// src/services/historyDetailService.js
const { HistoryDetail } = require('../models/historyDetail');
const UserService = require('../services/userService');
const ClinicHistoryService = require('../services/clinicHistoryService');

const moment = require('moment');

const HistoryDetailService = {

  async create(temperature, weight, heartRate, observation, userId, clinicHistoryId) {

    if (!temperature || !weight || !heartRate || !observation || !userId || !clinicHistoryId) {
      throw new Error('Faltan campos requeridos');
  }

  const existingUser = await UserService.findById(userId);
  if (!existingUser) {
      throw new Error('El cliente con el ID proporcionado no existe');
  }

  const existingClinicHistory = await ClinicHistoryService.findById(clinicHistoryId);
  if (!existingClinicHistory) {
      throw new Error('El cliente con el ID proporcionado no existe');
  }


  const currentDate = moment().format('YYYY-MM-DD');

  const currentTime = moment().format('HH:mm:ss');

    const newHistoryDetail = await HistoryDetail.create({
      temperature,
      weight,
      heartRate,
      date: currentDate,
      time: currentTime,
      observation,
      userId,
      clinicHistoryId
    });

    return newHistoryDetail;
  },



  async update(id, temperature, weight, heartRate, date, time, observation, userId, clinicHistoryId) {
    const [updateCount, updatedHistoryDetails] = await HistoryDetail.update(
      { temperature, weight, heartRate, date, time, observation, userId, clinicHistoryId },
      {
        where: { id },
        returning: true,
      }
    );
    if (updateCount === 0) {
      throw new Error('History detail not found');
    }
    return updatedHistoryDetails[0];
  },

  async destroy(id) {
    const deletedCount = await HistoryDetail.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new Error('History detail not found');
    }
  },

  async findAll() {
    const historyDetails = await HistoryDetail.findAll();
    return historyDetails;
  },

  async findById(id) {
    const historyDetail = await HistoryDetail.findByPk(id);
    if (!historyDetail) {
      throw new Error('History detail not found');
    }
    return historyDetail;
  },
};

module.exports = HistoryDetailService;
