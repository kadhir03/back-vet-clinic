const UserController = require('../../src/controllers/userController');
const UserService = require('../services/userService');
const generateToken = require('../middleware/generateToken');
// Simulamos las dependencias
jest.mock('../services/userService');
jest.mock('../middleware/generateToken');

describe('UserController', () => {
  describe('create', () => {
    it('should create a new user successfully', async () => {
      const req = {
        body: {
          username: 'testUser',
          email: 'test@example.com',
          password: 'testPassword',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(), // Para permitir encadenamiento como res.status(201).json(...)
      };
      UserService.create.mockResolvedValue(req.body);

      await UserController.create(req, res);

      expect(UserService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should handle errors', async () => {
      const req = {
        body: {
          username: 'testUser',
          email: 'test@example.com',
          password: 'testPassword',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();
      UserService.create.mockRejectedValue(new Error('Fake error'));

      await UserController.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});

describe('update', () => {
  // Caso de prueba exitoso
  it('should update a user successfully', async () => {
    const req = {
      params: { id: '1' },
      body: { username: 'updatedUser' },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    UserService.update.mockResolvedValue({ id: req.params.id, ...req.body });

    await UserController.update(req, res);

    expect(UserService.update).toHaveBeenCalledWith(req.params.id, req.body);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario actualizado exitosamente', data: { id: '1', username: 'updatedUser' } });
  });

  // Caso de prueba de fallo
  it('should handle errors on update', async () => {
    const req = { params: { id: '1' }, body: { username: 'updatedUserFail' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    UserService.update.mockRejectedValue(new Error('Update error'));

    await UserController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('destroy', () => {
  // Caso de prueba exitoso
  it('should delete a user successfully', async () => {
    const req = { params: { id: '1' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    UserService.destroy.mockResolvedValue({});

    await UserController.destroy(req, res);

    expect(UserService.destroy).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario eliminado exitosamente' });
  });

  // Caso de prueba de fallo
  it('should handle errors on delete', async () => {
    const req = { params: { id: '1' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    UserService.destroy.mockRejectedValue(new Error('Delete error'));

    await UserController.destroy(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('findAll', () => {
  // Caso de prueba exitoso
  it('should return all users', async () => {
    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    UserService.findAll.mockResolvedValue([{ id: '1', username: 'user1' }, { id: '2', username: 'user2' }]);

    await UserController.findAll(req, res);

    expect(UserService.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: '1', username: 'user1' }, { id: '2', username: 'user2' }]);
  });

  // Caso de prueba de fallo
  it('should handle errors on findAll', async () => {
    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    UserService.findAll.mockRejectedValue(new Error('Find all error'));

    await UserController.findAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

