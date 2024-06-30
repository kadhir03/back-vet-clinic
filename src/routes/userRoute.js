// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { requireAuth, requireAdminAuth } = require('../middleware/authVer');
const userController = require('../controllers/userController');


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autoincremental del usuario
 *         name:
 *           type: string
 *           description: El nombre del usuario
 *         username:
 *           type: string
 *           description: El nombre de usuario único
 *         email:
 *           type: string
 *           description: La dirección de correo electrónico del usuario
 *         password:
 *           type: string
 *           description: La contraseña del usuario
 *         cellPhone:
 *           type: string
 *           description: El número de teléfono celular del usuario
 *         age:
 *           type: integer
 *           description: La edad del usuario
 *         birthDate:
 *           type: string
 *           format: date
 *           description: La fecha de nacimiento del usuario (en formato AAAA-MM-DD)
 *         address:
 *           type: string
 *           description: La dirección del usuario
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La fecha y hora de creación del usuario
 *         rolId:
 *           type: integer
 *           description: El ID del rol asignado al usuario
 *       example:
 *         name: felipe
 *         username: felipede
 *         email: userk@gmail.com
 *         password: password123
 *         cellPhone: "1234567890"
 *         age: 25
 *         birthDate: "1999-01-01"
 *         address: "123 Calle Principal"
 *         rolId: 2
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna una lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: La lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: lista no encontrada
 *       500:
 *         description: Error en el servidor
 *
 */


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 */


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del usuario
 *     responses:
 *       200:
 *         description: Un usuario encontrado por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: No se encontró el usuario
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /users/username/{username}:
 *   get:
 *     summary: Retorna un usuario por su nombre de usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre de usuario
 *     responses:
 *       200:
 *         description: Un usuario encontrado por nombre de usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: No se encontró el usuario
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Autentica a un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *       401:
 *         description: Autenticación fallida
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Cierra la sesión del usuario
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *       404:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 *
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualiza la información de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Retorna un usuario por su correo electrónico
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: El correo electrónico del usuario
 *     responses:
 *       200:
 *         description: Un usuario encontrado por correo electrónico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: No se encontró el usuario
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /users/rol/{rol}:
 *   get:
 *     summary: Retorna usuarios por su rol
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: rol
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del rol de los usuarios
 *     responses:
 *       200:
 *         description: Usuarios encontrados por el rol especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: No se encontraron usuarios para el rol especificado
 *       500:
 *         description: Error en el servidor
 */

//rutas sin autenticacion

// router.get('',userController.findAll);
// router.get('/:id', userController.findById);
// router.get('/username/:username', userController.findByUsername);
// router.get('/email/:email', userController.findByEmail);
// router.get('/rol/:rolId',userController.getByRole);

// router.post('/',userController.create);
// router.post('/login',userController.login);
// router.post('/logout',userController.logout);

// router.patch('/:id',userController.update);
// router.delete('/:id', userController.destroy);


//Rutas con autenticacion

router.get('',userController.findAll);
router.get('/:id',requireAuth, requireAdminAuth, userController.findById);
router.get('/username/:username',requireAuth,requireAdminAuth, userController.findByUsername);
router.get('/email/:email',requireAuth,requireAdminAuth, userController.findByEmail);
router.get('/rol/:rol',requireAuth,requireAdminAuth, userController.getByRole);

router.post('/',requireAuth, requireAdminAuth,userController.create);
router.post('/login',userController.login);
router.post('/logout',requireAuth,userController.logout);

router.patch('/:id',requireAuth,requireAdminAuth,userController.update);
router.delete('/:id',requireAuth,requireAdminAuth, userController.destroy);

module.exports = router;

