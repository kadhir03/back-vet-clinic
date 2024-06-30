const express = require('express');
const router = express.Router();
const { requireAuth, requireAdminAuth, requireSAdminAuth } = require('../middleware/authVer');
const PetController = require('../controllers/petController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - breed
 *         - gender
 *         - clientId
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autoincremental de la mascota
 *         name:
 *           type: string
 *           description: El nombre de la mascota
 *         breed:
 *           type: string
 *           description: La raza de la mascota
 *         gender:
 *           type: string
 *           description: El género de la mascota
 *         clientId:
 *           type: integer
 *           description: El ID del cliente propietario de la mascota
 *       example:
 *         name: Luna
 *         breed: Labrador
 *         gender: F
 *         clientId: 1
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Retorna una lista de mascotas
 *     tags: [Mascotas]
 *     responses:
 *       200:
 *         description: La lista de mascotas
 *       404:
 *         description: Lista no encontrada
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Retorna una mascota por ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la mascota
 *     responses:
 *       200:
 *         description: Una mascota por ID
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /pets/name/{name}:
 *   get:
 *     summary: Retorna una mascota por nombre
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: El nombre de la mascota
 *     responses:
 *       200:
 *         description: Una mascota encontrada por nombre
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /pets/client/{clientId}:
 *   get:
 *     summary: Retorna las mascotas de un cliente por ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del cliente propietario de las mascotas
 *     responses:
 *       200:
 *         description: Las mascotas del cliente
 *       404:
 *         description: Cliente no encontrado o sin mascotas asociadas
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Crea una nueva mascota
 *     tags: [Mascotas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Mascota creada exitosamente
 *       404:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /pets/{id}:
 *   patch:
 *     summary: Actualiza una mascota por ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       200:
 *         description: Mascota actualizada exitosamente
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Elimina una mascota por ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota eliminada exitosamente
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error en el servidor
 */

router.get('', requireAuth, requireAdminAuth, PetController.findAll);
router.get('/:id', requireAuth, requireAdminAuth, PetController.findById);
router.get('/name/:name', requireAuth, requireAdminAuth, PetController.findByName);
router.get('/client/:clientId', PetController.findByClient);
router.post('/', requireAuth, requireAdminAuth, PetController.create);
router.patch('/:id', requireAuth, requireAdminAuth, PetController.update);
router.delete('/:id', requireAuth, requireAdminAuth, PetController.destroy);

module.exports = router;