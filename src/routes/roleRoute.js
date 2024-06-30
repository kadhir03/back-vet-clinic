// routes/resourceRoutes.js
const express = require('express');
const router = express.Router();
const { requireAuth, requireAdminAuth, requireSAdminAuth } = require('../middleware/authVer');
const RoleController = require('../controllers/roleController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autoincremental del rol
 *         name:
 *           type: string
 *           description: El nombre del rol
 *         status:
 *           type: boolean
 *           description: Indica si el rol está activo
 *       example:
 *         name: Admin
 *         status: true
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Retorna una lista de roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: La lista de roles
 *       404:
 *         description: lista no encontrada
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Retorna un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del rol
 *     responses:
 *       200:
 *         description: Un rol por ID
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /roles/name/{name}:
 *   get:
 *     summary: Retorna un rol por nombre
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: El nombre del rol
 *     responses:
 *       200:
 *         description: Un rol encontrado por nombre
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 */


/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       404:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /roles/{id}:
 *   patch:
 *     summary: Actualiza un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Elimina un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 */

// router.get('', RoleController.findAll);
// router.get('/:id', RoleController.findById);
// router.get('/name/:name', RoleController.findByname);

// router.post('/', RoleController.create);

// router.patch('/:id', RoleController.update);
// router.delete('/:id', RoleController.destroy);

module.exports = router;

//rutas con autenticacion

router.get('', requireAuth, requireAdminAuth, RoleController.findAll);
 router.get('/:id', requireAuth, requireAdminAuth, RoleController.findById);
router.get('/name/:name', requireAuth, requireAdminAuth, RoleController.findByname);

 router.post('/', requireAuth, requireSAdminAuth, RoleController.create);

router.patch('/:id', requireAuth, requireSAdminAuth, RoleController.update);
 router.delete('/:id', requireAuth, requireSAdminAuth, RoleController.destroy);



