const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/clientController');
const { requireAuth, requireAdminAuth, requireSAdminAuth } = require('../middleware/authVer');

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - names
 *         - document
 *         - phone
 *         - address
 *         - age
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autoincremental del cliente
 *         names:
 *           type: string
 *           description: Los nombres del cliente
 *         document:
 *           type: string
 *           description: El documento del cliente
 *         phone:
 *           type: string
 *           description: El número de teléfono del cliente
 *         address:
 *           type: string
 *           description: La dirección del cliente
 *         age:
 *           type: integer
 *           description: La edad del cliente
 *       example:
 *         names: Juan Perez
 *         document: ABC123
 *         phone: 1234567890
 *         address: Calle 123
 *         age: 30
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Retorna una lista de clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: La lista de clientes
 *       404:
 *         description: Lista no encontrada
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Retorna un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del cliente
 *     responses:
 *       200:
 *         description: Un cliente por ID
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /clients/name/{name}:
 *   get:
 *     summary: Retorna un cliente por nombres
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Los nombres del cliente
 *     responses:
 *       200:
 *         description: Un cliente encontrado por nombres
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /clients/document/{document}:
 *   get:
 *     summary: Retorna un cliente por documento
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: document
 *         schema:
 *           type: string
 *         required: true
 *         description: El documento del cliente
 *     responses:
 *       200:
 *         description: Un cliente encontrado por documento
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       404:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /clients/{id}:
 *   patch:
 *     summary: Actualiza un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Elimina un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error en el servidor
 */


router.get('',requireAuth,requireAdminAuth, ClientController.findAll);
router.get('/:id',requireAuth,requireAdminAuth, ClientController.findById);
router.get('/name/:name',requireAuth,requireAdminAuth, ClientController.findByNames);
router.get('/document/:document',requireAuth,requireAdminAuth, ClientController.findByDocument);

router.post('/',requireAuth,requireAdminAuth, ClientController.create);

router.patch('/:id',requireAuth,requireAdminAuth, ClientController.update);
router.delete('/:id',requireAuth,requireAdminAuth, ClientController.destroy);

module.exports = router;
