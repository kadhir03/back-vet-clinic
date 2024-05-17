// src/controllers/userController.js
const UserService = require('../services/userService');
const CryptoJS = require("crypto-js");
const generateToken = require('../middleware/generateToken');
const invalidarToken = require('../middleware/invalidarToken');
const { errorHandler } = require('../utils/errorHandler');

const UserController = {

     async create(req, res) {
        try {
            const newUser = await UserService.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            errorHandler(error, res);
        }
    },

    async update(req, res) {
      try {
          const updatedUser = await UserService.update(req.params.id, req.body);
          res.json({ message: 'Usuario actualizado exitosamente', data: updatedUser });
      } catch (error) {
          errorHandler(error, res);
      }
  },


  async destroy(req, res) {
        try {
            await UserService.destroy(req.params.id);
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
            errorHandler(error, res);
        }
    },

    async findAll(req, res) {
      try {
          const users = await UserService.findAll();
          res.status(200).json(users);
      } catch (error) {
          errorHandler(error, res);
      }
  },

  async findById(req, res) {
      try {
          const user = await UserService.findById(req.params.id);
          res.status(200).json(user);
      } catch (error) {
          errorHandler(error, res);
      }
  },

  async getByRole(req, res) {
      try {
          const users = await UserService.getByRole(req.params.rolId);
          res.status(200).json(users);
      } catch (error) {
          errorHandler(error, res);
      }
  },

  async findByUsername(req, res) {
      try {
          const user = await UserService.findByUsername(req.params.username);
          res.status(200).json(user);
      } catch (error) {
          errorHandler(error, res);
      }
  },

  async findByEmail(req, res) {
      try {
          const user = await UserService.findByEmail(req.params.email);
          res.status(200).json(user);
      } catch (error) {
          errorHandler(error, res);
      }
  },

    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            // Busca al usuario por el nombre de usuario
            const user = await UserService.findByUsername( username);
            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            // Separando la sal y el hash almacenados
            const [storedSalt, storedHash] = user.password.split('$');
            // Hashing de la contraseña ingresada con la sal almacenada usando CryptoJS
            const hashOfInputPassword = CryptoJS.PBKDF2(password, storedSalt, {
                keySize: 512 / 32,
                iterations: 10000,
                hasher: CryptoJS.algo.SHA512
            }).toString(CryptoJS.enc.Hex);

            if (hashOfInputPassword !== storedHash) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            // Generar el token para el usuario
            const token = generateToken(user);

            return res.status(200).json({ message: 'Inicio de sesión exitoso', token, dataUser: user });
        } catch (error) {
            console.error('Error', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    //Controlador cerrar session
    async logout(req, res) {
        const token = req.headers.authorization.split(' ')[1];
        await invalidarToken(token); // Usar invalidarToken en lugar de addToBlacklist directamente
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    },
};

module.exports = UserController;



