//src/config/connection.js
const { Sequelize } = require("sequelize");
require('dotenv').config();

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

let sequelize;

try {
  sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'postgres',
    pool: {
      max: 5, // Número máximo de conexiones en el pool
      min: 0, // Número mínimo de conexiones en el pool
      acquire: 30000, // Tiempo máximo en milisegundos para adquirir una conexión
      idle: 10000, // Tiempo máximo en milisegundos que una conexión puede estar inactiva en el pool
    },
  });
} catch (error) {
  console.error('Error en la conexión a la base de datos:', error);
} finally {
  if (sequelize) {
    console.log('Conexión a la base de datos establecida correctamente.');
  }
}

module.exports = {
  sequelize,
};
