// src/middleware/auth/renewToken.js
const jwt = require('jsonwebtoken');

require('dotenv').config();

const CryptoJS = require('crypto-js');
const { User } = require('../models/user');

const { isTokenBlacklisted, addToBlacklist } = require('../middleware/blacklist');
const generateToken = require('./generateToken'); // Asegúrate de que este path sea correcto

const renewToken = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        // Verificar si el token está en la lista negra
        if (await isTokenBlacklisted(token)) {
            return res.status(401).json({ error: 'Token no válido' });
        }

        // Descifrar el token si fue cifrado antes de verificarlo
        const bytes = CryptoJS.AES.decrypt(token, process.env.CRYPTO_JS_SECRET);
        const originalToken = bytes.toString(CryptoJS.enc.Utf8);
        const decoded = jwt.verify(originalToken, process.env.JWT_SECRET);
        
        // Verificar si el token está cerca de expirar
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        if (decoded.exp - currentTime > 300) { // Si el token tiene más de 5 minutos restantes
            return res.status(400).json({ error: 'Token aún válido. Renovación no necesaria.' });
        }

        // Generar un nuevo token
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const newToken = generateToken(user); // Asume que esta función ya maneja el cifrado si es necesario
        
        // Añadir el token antiguo a la lista negra
        addToBlacklist(token);

        // Añadir el nuevo token en los headers de respuesta
        res.header('Authorization', `Bearer ${newToken}`);

        res.json({ token: newToken });
    } catch (error) {
        console.error('Error al renovar el token:', error);
        return res.status(401).json({ error: 'Error al procesar la solicitud de renovación' });
    }
};

module.exports = renewToken ;
