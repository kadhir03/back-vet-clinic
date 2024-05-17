// src/middleware/auth/invalidarToken.js
const { addToBlacklist } = require('./blacklist');

const invalidarToken = async (token) => {
    await addToBlacklist(token);
};

module.exports = invalidarToken;
