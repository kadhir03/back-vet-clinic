// src/controllers/clinicHistoryController.js
const ClinicHistoryService = require('../services/clinicHistoryService');
const { errorHandler } = require('../utils/errorHandler');

const ClinicHistoryController = {
  
  async create(req, res) {
    try {
      const {  petId } = req.body;
      const newClinicHistory = await ClinicHistoryService.create(petId);
      res.status(201).json(newClinicHistory);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { date, time, petId } = req.body;
      const updatedClinicHistory = await ClinicHistoryService.update(id, date, time, petId);
      res.json({ message: 'Clinic history updated successfully', data: updatedClinicHistory });
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await ClinicHistoryService.destroy(id);
      res.status(200).json({ message: 'Clinic history deleted successfully' });
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findAll(req, res) {
    try {
      const clinicHistories = await ClinicHistoryService.findAll();
      res.status(200).json(clinicHistories);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const clinicHistory = await ClinicHistoryService.findById(id);
      res.status(200).json(clinicHistory);
    } catch (error) {
      errorHandler(error, res);
    }
  },
};

module.exports = ClinicHistoryController;
