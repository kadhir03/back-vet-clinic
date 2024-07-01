const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Especifica la versión de OpenAPI
    info: {
      title: 'Veterinaria  API', // Título del documento
      version: '1.0.0',
      description: 'Aplicacion para administrar una Veterinaria',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  // Rutas a tus archivos de endpoint para que Swagger las documente
  apis: ['./src/routes/*.js'],

};

const specs = swaggerJsDoc(options);

module.exports = specs;
