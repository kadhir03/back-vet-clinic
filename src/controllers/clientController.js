// src/controllers/clientController.js
const ClientService = require('../services/clientService');
const { errorHandler } = require('../utils/errorHandler');

const ClientController = {
  async create(req, res) {
    try {
      const { names, document, phone, address, age } = req.body;
      const newClient = await ClientService.create(names, document, phone, address, age);
      res.status(201).json(newClient);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { names, document, phone, address, age } = req.body;
      const updatedClient = await ClientService.update(id, names, document, phone, address, age);
      res.json({ message: 'Client updated successfully', data: updatedClient });
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await ClientService.destroy(id);
      res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findAll(req, res) {
    try {
      const clients = await ClientService.findAll();
      res.status(200).json(clients);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const client = await ClientService.findById(id);
      res.status(200).json(client);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findByDocument(req, res) {
    try {
      const { document } = req.params;
      const client = await ClientService.findByDocument(document);
      res.status(200).json(client);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findByNames(req, res) {
    try {
      const { names } = req.params;
      const clients = await ClientService.findByNames(names);
      res.status(200).json(clients);
    } catch (error) {
      errorHandler(error, res);
    }
  },
};

module.exports = ClientController;
