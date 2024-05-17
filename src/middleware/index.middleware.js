
// src/middleware/auth/index.middleware.js
const { requireAuth, requireAdminAuth, requireRole, verifyAndDecodeToken,requireSAdminAuth } = require('./authVer');
const generateToken = require('./generateToken');
const { addToBlacklist, isTokenBlacklisted } = require('./blacklist');
const renewToken = require('./renewToken');
const invalidarToken = require('./invalidarToken'); 

module.exports = { 
    requireAuth, 
    requireSAdminAuth,
    requireAdminAuth, 
    requireRole, 
    verifyAndDecodeToken, 
    generateToken, 
    addToBlacklist, 
    isTokenBlacklisted, 
    renewToken, 
    invalidarToken 
};
