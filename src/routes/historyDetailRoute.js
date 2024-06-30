const express = require('express');
const router = express.Router();
const HistoryDetailController = require('../controllers/historyDetailController.js');
const { requireAuth, requireAdminAuth, requireSAdminAuth } = require('../middleware/authVer');
/**
 * @swagger
 * components:
 *   schemas:
 *     HistoryDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID del detalle del historial
 *         temperature:
 *           type: number
 *           format: float
 *           description: La temperatura registrada
 *         weight:
 *           type: number
 *           format: float
 *           description: El peso registrado
 *         heartRate:
 *           type: integer
 *           description: La frecuencia cardíaca registrada
 *         date:
 *           type: string
 *           format: date
 *           description: La fecha del registro
 *         time:
 *           type: string
 *           format: time
 *           description: La hora del registro
 *         observation:
 *           type: string
 *           description: Observaciones adicionales
 *         userId:
 *           type: integer
 *           description: ID del usuario asociado al detalle del historial
 *         clinicHistoryId:
 *           type: integer
 *           description: ID de la historia clínica asociada al detalle del historial
 *       example:
 *         id: 1
 *         temperature: 37.5
 *         weight: 70.2
 *         heartRate: 80
 *         date: "2024-05-15"
 *         time: "08:30:00"
 *         observation: "El paciente se quejó de dolor de cabeza"
 *         userId: 1
 *         clinicHistoryId: 1
 */

/**
 * @swagger
 * /history-details:
 *   get:
 *     summary: Retorna una lista de detalles del historial
 *     tags: [History Details]
 *     responses:
 *       200:
 *         description: La lista de detalles del historial
 *       404:
 *         description: Detalles del historial no encontrados
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /history-details/{id}:
 *   get:
 *     summary: Retorna un detalle del historial por ID
 *     tags: [History Details]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del detalle del historial
 *     responses:
 *       200:
 *         description: Un detalle del historial por ID
 *       404:
 *         description: Detalle del historial no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /history-details:
 *   post:
 *     summary: Crea un nuevo detalle del historial
 *     tags: [History Details]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistoryDetail'
 *     responses:
 *       201:
 *         description: Detalle del historial creado exitosamente
 *       404:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /history-details/{id}:
 *   patch:
 *     summary: Actualiza un detalle del historial por ID
 *     tags: [History Details]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del detalle del historial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistoryDetail'
 *     responses:
 *       200:
 *         description: Detalle del historial actualizado exitosamente
 *       404:
 *         description: Detalle del historial no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /history-details/{id}:
 *   delete:
 *     summary: Elimina un detalle del historial por ID
 *     tags: [History Details]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del detalle del historial
 *     responses:
 *       200:
 *         description: Detalle del historial eliminado exitosamente
 *       404:
 *         description: Detalle del historial no encontrado
 *       500:
 *         description: Error en el servidor
 */


router.get('',requireAuth,requireAdminAuth, HistoryDetailController.findAll);
router.get('/:id',requireAuth,requireAdminAuth, HistoryDetailController.findById);


router.post('/',requireAuth,requireAdminAuth, HistoryDetailController.create);

router.patch('/:id',requireAuth,requireAdminAuth, HistoryDetailController.update);
router.delete('/:id',requireAuth,requireAdminAuth, HistoryDetailController.destroy);

module.exports = router;