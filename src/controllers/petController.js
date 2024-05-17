// src/controllers/petController.js
const PetService = require('../services/petService');
const { errorHandler } = require('../utils/errorHandler');

const PetController = {
  async create(req, res) {
    try {
      const { name, breed, gender, clientId } = req.body;
      const newPet = await PetService.create(name, breed, gender, clientId);
      res.status(201).json(newPet);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, breed, gender, clientId } = req.body;
      const updatedPet = await PetService.update(id, name, breed, gender, clientId);
      res.json({ message: 'Pet updated successfully', data: updatedPet });
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await PetService.destroy(id);
      res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findAll(req, res) {
    try {
      const pets = await PetService.findAll();
      res.status(200).json(pets);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const pet = await PetService.findById(id);
      res.status(200).json(pet);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findByClient(req, res) {
    try {
      const { clientId } = req.params;
      const pets = await PetService.findByClient(clientId);
      res.status(200).json(pets);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  async findByName(req, res) {
    try {
      const { name } = req.params;
      const pets = await PetService.findByName(name);
      res.status(200).json(pets);
    } catch (error) {
      errorHandler(error, res);
    }
  },

  // async findByBreedAndGender(req, res) {
  //   try {
  //     const { breed, gender } = req.params;
  //     const pets = await PetService.findByBreedAndGender(breed, gender);
  //     res.status(200).json(pets);
  //   } catch (error) {
  //     errorHandler(error, res);
  //   }
  // },
};

module.exports = PetController;
