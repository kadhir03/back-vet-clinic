// src/services/clientService.js
const { Client } = require('../models/client');

const ClientService = {

  async create(names, document, phone, address, age) {

    if (!names || !document || !phone || !address || !age) {
      throw new Error('Faltan campos requeridos');
    }

    const existingClient = await Client.findOne({ where: { document } });
    if (existingClient) {
      throw new Error('El documento del cliente ya existe.');
    }

    const newClient = await Client.create({ names, document, phone, address, age });
    return newClient;
  },

  async update(id, names, document, phone, address, age) {
    const [updateCount, updatedClients] = await Client.update({ names, document, phone, address, age }, {
      where: { id },
      returning: true,
    });
    if (updateCount === 0) {
      throw new Error('Client not found');
    }
    return updatedClients[0];
  },

  async destroy(id) {
    const deletedCount = await Client.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new Error('Client not found');
    }
  },

  async findAll() {
    const clients = await Client.findAll();
    return clients;
  },

  async findById(id) {
    const client = await Client.findByPk(id);
    if (!client) {
      throw new Error('Client not found');
    }
    return client;
  },

  async findByDocument(document) {
    const client = await Client.findOne({ where: { document } });
    if (!client) {
      throw new Error('Client not found');
    }
    return client;
  },

  async findByNames(names) {
    const clients = await Client.findAll({ where: { names } });
    return clients;
  },
};

module.exports = ClientService;
