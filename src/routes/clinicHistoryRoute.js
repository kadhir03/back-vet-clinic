const express = require('express');
const router = express.Router();
const ClinicHistoryController = require('../controllers/clinicHistoryController');
const { requireAuth, requireAdminAuth, requireSAdminAuth } = require('../middleware/authVer');

/**
 * @swagger
 * components:
 *   schemas:
 *     ClinicHistory:
 *       type: object
 *       required:
 *         - date
 *         - time
 *         - petId
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autoincremental del historial clínico
 *         date:
 *           type: string
 *           format: date
 *           description: La fecha del historial clínico
 *         time:
 *           type: string
 *           format: time
 *           description: La hora del historial clínico
 *         petId:
 *           type: integer
 *           description: El ID de la mascota asociada al historial clínico
 *       example:
 *         date: 2024-05-15
 *         time: "13:30:00"
 *         petId: 1
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */

/**
 * @swagger
 * /clinic-histories:
 *   get:
 *     summary: Retorna una lista de historiales clínicos
 *     tags: [Historiales Clínicos]
 *     responses:
 *       200:
 *         description: La lista de historiales clínicos
 *       404:
 *         description: Lista no encontrada
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /clinic-histories/{id}:
 *   get:
 *     summary: Retorna un historial clínico por ID
 *     tags: [Historiales Clínicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del historial clínico
 *     responses:
 *       200:
 *         description: Un historial clínico por ID
 *       404:
 *         description: Historial clínico no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /clinic-histories:
 *   post:
 *     summary: Crea un nuevo historial clínico
 *     tags: [Historiales Clínicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClinicHistory'
 *     responses:
 *       201:
 *         description: Historial clínico creado exitosamente
 *       404:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /clinic-histories/{id}:
 *   patch:
 *     summary: Actualiza un historial clínico por ID
 *     tags: [Historiales Clínicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del historial clínico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClinicHistory'
 *     responses:
 *       200:
 *         description: Historial clínico actualizado exitosamente
 *       404:
 *         description: Historial clínico no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /clinic-histories/{id}:
 *   delete:
 *     summary: Elimina un historial clínico por ID
 *     tags: [Historiales Clínicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del historial clínico
 *     responses:
 *       200:
 *         description: Historial clínico eliminado exitosamente
 *       404:
 *         description: Historial clínico no encontrado
 *       500:
 *         description: Error en el servidor
 */

router.get('',requireAuth,requireAdminAuth, ClinicHistoryController.findAll);
router.get('/:id',requireAuth,requireAdminAuth, ClinicHistoryController.findById);

router.post('/',requireAuth,requireAdminAuth, ClinicHistoryController.create);

router.patch('/:id',requireAuth,requireAdminAuth, ClinicHistoryController.update);
router.delete('/:id',requireAuth,requireAdminAuth, ClinicHistoryController.destroy);

module.exports = router;