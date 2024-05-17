require('dotenv').config();

const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

const { User } = require('../models/user'); 

const { isTokenBlacklisted } = require('./blacklist');


// Función auxiliar para verificar y decodificar el token
const verifyAndDecodeToken = async (token) => {
    if (await isTokenBlacklisted(token)) {
        throw new Error('Token en lista negra');
    }
    const bytes = CryptoJS.AES.decrypt(token, process.env.CRYPTO_JS_SECRET);
    const originalToken = bytes.toString(CryptoJS.enc.Utf8);
    const decoded = jwt.verify(originalToken, process.env.JWT_SECRET);
    return decoded;
};

// Middleware para autenticar usando JWT
const requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await verifyAndDecodeToken(token);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'Token no válido o usuario no encontrado' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error en la autenticación:', error.message);
        return res.status(401).json({ error: 'Error al procesar el token' });
    }
};

// Middleware para requerir un rol de administrador
const requireAdminAuth = async (req, res, next) => {
    requireAuth(req, res, async () => {
        // Este código se ejecutará después de que `requireAuth` llame a `next()`
        // Asumiendo que `req.user` ya está establecido por `requireAuth`
        if (req.user && req.user.rolId === 2) {
            next();
        } else {
            return res.status(403).json({ error: 'Acceso denegado' });
        }
    });
};

// Middleware para requerir un rol de superadministrador
const requireSAdminAuth = async (req, res, next) => {
    requireAuth(req, res, async () => {
        // Este código se ejecutará después de que `requireAuth` llame a `next()`
        // Asumiendo que `req.user` ya está establecido por `requireAuth`
        if (req.user && req.user.rolId === 1) {
            next();
        } else {
            return res.status(403).json({ error: 'Acceso denegado' });
        }
    });
};

// Middleware para verificar roles específicos
const requireRole = (expectedRoles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await verifyAndDecodeToken(token);
        const user = await User.findByPk(decoded.id);
        if (!user || !expectedRoles.includes(user.rolId)) {
            return res.status(403).json({ error: 'Acceso denegado' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error en la autorización:', error.message);
        return res.status(401).json({ error: 'Error al procesar el token' });
    }
};

module.exports = { requireAuth, requireAdminAuth, requireRole, verifyAndDecodeToken,requireSAdminAuth };

