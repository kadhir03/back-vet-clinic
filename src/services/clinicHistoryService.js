// src/services/clinicHistoryService.js
const { ClinicHistory } = require('../models/clinicHistory');
const PetService = require('../services/petService');
const moment = require('moment');


const ClinicHistoryService = {
  async create(petId) {

    if (!petId) {
      throw new Error('Faltan campos requeridos');
    }

    const existingPet = await PetService.findById(petId);
        if (!existingPet) {
            throw new Error('El Pet con el ID proporcionado no existe');
        }

    const currentDate = moment().format('YYYY-MM-DD');

    const currentTime = moment().format('HH:mm:ss');

    const newClinicHistory = await ClinicHistory.create({ date: currentDate, time: currentTime, petId });
    return newClinicHistory;
  },

  
  async update(id, date, time, petId) {
    const [updateCount, updatedClinicHistories] = await ClinicHistory.update({ date, time, petId }, {
      where: { id },
      returning: true,
    });
    if (updateCount === 0) {
      throw new Error('Clinic history not found');
    }
    return updatedClinicHistories[0];
  },

  async destroy(id) {
    const deletedCount = await ClinicHistory.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new Error('Clinic history not found');
    }
  },

  async findAll() {
    const clinicHistories = await ClinicHistory.findAll();
    return clinicHistories;
  },

  async findById(id) {
    const clinicHistory = await ClinicHistory.findByPk(id);
    if (!clinicHistory) {
      throw new Error('Clinic history not found');
    }
    return clinicHistory;
  },
};

module.exports = ClinicHistoryService;
