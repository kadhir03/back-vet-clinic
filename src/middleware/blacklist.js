// src/middleware/auth/blacklist.js

const blacklist = new Set(); // Conjunto para almacenar los tokens en la lista negra

// Simulación de una lista negra en una base de datos o algún almacenamiento persistente
const addToBlacklist = async (token) => {
  // Aquí deberías almacenar el token en tu base de datos o sistema de almacenamiento persistente
  // Por simplicidad, utilizamos un Set en memoria en este ejemplo
  blacklist.add(token);
};

// Función para verificar si el token está en la lista negra
const isTokenBlacklisted = async (token) => {
  // Aquí deberías consultar tu base de datos o sistema de almacenamiento persistente
  // Por simplicidad, utilizamos un Set en memoria en este ejemplo
  return blacklist.has(token);
};

module.exports = { addToBlacklist, isTokenBlacklisted };
