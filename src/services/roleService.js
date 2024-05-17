const { Role } = require('../models/role');

const RoleService = {

  async create(name, status) {

    if (!name || !status) {
      throw new Error('Faltan campos requeridos');
    }

    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      throw new Error('El nombre del role ya existe.');
    }
    const newRole = await Role.create({ name, status });
    return newRole;
  },


  async update(id, name, status) {
    const [updateCount, updatedRoles] = await Role.update({ name, status }, {
      where: { id },
      returning: true,
    });
    if (updateCount === 0) {
      throw new Error('Rol no encontrado');
    }
    return updatedRoles[0];
  },

  async destroy(id) {
    const deletedCount = await Role.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new Error('Rol no encontrado');
    }
  },

  async findAll() {
    const roles = await Role.findAll();
    return roles;
  },

  async findById(id) {
    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error('Rol no encontrado');
    }
    return role;
  },

  async findByname(name) {
    const role = await Role.findOne({ where: { name: name } });
    if (!role) {
      throw new Error('Rol no encontrado');
    }
    return role;
  },
};

module.exports = RoleService;
