// src/controllers/roleController.js

const RoleService = require('../services/roleService');
const { errorHandler } = require('../utils/errorHandler');

const RoleController = {

  async create(req, res) {
    try {
      const { name, status } = req.body;
      const newRole = await RoleService.create(name, status);
      res.status(201).json(newRole);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, status } = req.body;
      const updatedRole = await RoleService.update(id, name, status);
      res.json({ message: 'Rol actualizado exitosamente', data: updatedRole });
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await RoleService.destroy(id);
      res.status(200).json({ message: 'Rol eliminado exitosamente' });
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findAll(req, res) {
    try {
      const roles = await RoleService.findAll();
      res.status(200).json(roles);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const role = await RoleService.findById(id);
      res.status(200).json(role);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findByname(req, res) {
    try {
      const { name } = req.params;
      const role = await RoleService.findByname(name);
      res.status(200).json(role);
    } catch (error) {
      errorHandler(error, res);
    }
  },

};

module.exports = RoleController;
