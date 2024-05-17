// src/middleware/auth/generateToken.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

// Función para generar un token JWT y cifrarlo
const generateToken = (user) => {
  // Primero, generamos el token sin cifrar
  const rawToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Luego, ciframos el token
  const encryptedToken = CryptoJS.AES.encrypt(rawToken, process.env.CRYPTO_JS_SECRET).toString();

  // Devolvemos el token cifrado
  return encryptedToken;
};

module.exports = generateToken;

