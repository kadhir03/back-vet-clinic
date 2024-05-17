// src/controllers/historyDetailController.js
const HistoryDetailService = require('../services/historyDetailService');
const { errorHandler } = require('../utils/errorHandler');

const HistoryDetailController = {
  async create(req, res) {
    try {
      const { temperature, weight, heartRate, observation, userId, clinicHistoryId } = req.body;
      const newHistoryDetail = await HistoryDetailService.create(temperature, weight, heartRate, observation, userId, clinicHistoryId);
      res.status(201).json(newHistoryDetail);
    } catch (error) {
      errorHandler(error, res);
    }
  },


async update(req, res) {
  try {
    const { id } = req.params;
    const { temperature, weight, date, time, heartRate, observation, userId, clinicHistoryId } = req.body;
    const updatedHistoryDetail = await HistoryDetailService.update(id, temperature, weight, heartRate, date, time, observation, userId, clinicHistoryId);
    res.json({ message: 'History detail updated successfully', data: updatedHistoryDetail });
  } catch (error) {
    errorHandler(error, res);
  }
},

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await HistoryDetailService.destroy(id);
      res.status(200).json({ message: 'History detail deleted successfully' });
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findAll(req, res) {
    try {
      const historyDetails = await HistoryDetailService.findAll();
      res.status(200).json(historyDetails);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const historyDetail = await HistoryDetailService.findById(id);
      res.status(200).json(historyDetail);
    } catch (error) {
      errorHandler(error, res);
    }
  },
};

module.exports = HistoryDetailController;
