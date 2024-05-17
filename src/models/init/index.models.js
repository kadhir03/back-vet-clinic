
// src/models/model.index.js

const { Role } = require('../role');
const { User } = require('../user');

const { Client } = require('../client');
const { ClinicHistory } = require('../clinicHistory');
const { HistoryDetail } = require('../historyDetail');
const { Pet } = require('../pet');

// Sincroniza los modelos con la base de datos
const syncModels = async () => {
  try {
    // Sincronizar individualmente (opcional, depende de la estrategia)
    await Role.sync();
    await User.sync();
    await Client.sync();
    await ClinicHistory.sync();
    await HistoryDetail.sync();
    await Pet.sync();




    // O sincronizar todos los modelos de una vez
    // await sequelize.sync({ force: true });

    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error syncing tables:', error);
  }
};

module.exports = syncModels;

