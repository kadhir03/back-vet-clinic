// src/services/petService.js
const { Pet } = require('../models/pet');
const ClientService = require('../services/clientService');

const PetService = {

  async create(name, breed, gender, clientId) {
    
    if (!name || !breed || !gender || !clientId) {
      throw new Error('Faltan campos requeridos');
    }
  
    const existingClient = await ClientService.findById(clientId);
    if (!existingClient) {
        throw new Error('El cliente con el ID proporcionado no existe');
    }

    const newPet = await Pet.create({ name, breed, gender, clientId });
    return newPet;

  },

  async update(id, name, breed, gender, clientId) {
    const [updateCount, updatedPets] = await Pet.update({ name, breed, gender, clientId }, {
      where: { id },
      returning: true,
    });
    if (updateCount === 0) {
      throw new Error('Pet not found');
    }
    return updatedPets[0];
  },

  async destroy(id) {
    const deletedCount = await Pet.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new Error('Pet not found');
    }
  },

  async findAll() {
    const pets = await Pet.findAll();
    return pets;
  },

  async findById(id) {
    const pet = await Pet.findByPk(id);
    if (!pet) {
      throw new Error('Pet not found');
    }
    return pet;
  },

  async findByClient(clientId) {
    const pets = await Pet.findAll({ where: { clientId } });
    return pets;
  },

  async findByName(name) {
    const pets = await Pet.findAll({ where: { name: name } });
    return pets;
  },

  // async findByBreedAndGender(breed, gender) {
  //   const pets = await Pet.findAll({ where: { breed, gender } });
  //   return pets;
  // },

};

module.exports = PetService;
