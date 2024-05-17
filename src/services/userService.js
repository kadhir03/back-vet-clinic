// src/services/userService.js
const CryptoJS = require("crypto-js");
const { Op } = require('sequelize');
const { User } = require('../models/user');

const RoleService = require('../services/roleService');

const UserService = {

    async create({name, username, email, password, cellPhone, age, birthDate, address, rolId }) {
        
        if (!username || !email || !password || !rolId) {
            throw new Error('Faltan campos requeridos');
        }
        
        const existingRole = await RoleService.findById(rolId);
        if (!existingRole) {
            throw new Error('El Rol con el ID proporcionado no existe');
        }
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }, { cellPhone }],
            },
        });
        if (existingUser) {
            throw new Error('El nombre de usuario, correo electrónico o número de teléfono ya existen');
        }
        const salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
        const hashedPassword = CryptoJS.PBKDF2(password, salt, {
            keySize: 512 / 32,
            iterations: 10000,
            hasher: CryptoJS.algo.SHA512,
        }).toString(CryptoJS.enc.Hex);

        const newUser = await User.create({
           name, username, email, password: `${salt}$${hashedPassword}`, cellPhone, age, birthDate, address, rolId,
        });

        return newUser;
    },

    async update(id, updateData) {
        const updatedUser = await User.update(updateData, {
            where: { id },
            returning: true,
        });
        if (updatedUser[0] === 0) {
            throw new Error('Usuario no encontrado');
        }
        return updatedUser[1][0];
    },

    async destroy(id) {
      const deleted = await User.destroy({ where: { id } });
      if (!deleted) {
          throw new Error('Usuario no encontrado');
      }
      return deleted;
  },

  async findAll() {
      return await User.findAll();
  },

  async findById(id) {
      const user = await User.findByPk(id);
      if (!user) {
          throw new Error('Usuario no encontrado');
      }
      return user;
  },

  async getByRole(rolId) {
      return await User.findAll({ where: { rolId } });
  },

  async findByUsername(username) {
      const user = await User.findOne({ where: { username } });
      if (!user) {
          throw new Error('Usuario no encontrado');
      }
      return user;
  },

  async findByEmail(email) {
      const user = await User.findOne({ where: { email } });
      if (!user) {
          throw new Error('Usuario no encontrado');
      }
      return user;
  },
};

module.exports = UserService;
