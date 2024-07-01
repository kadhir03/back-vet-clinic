//index.js
const express = require('express');
require('dotenv').config();
const app  = express()
const cors = require('cors');

const PORT = process.env.PORT || 3000; // Default to port 3000 if not defined

// let port;

// if (process.env.NODE_ENV === 'prod') {
//      port = process.env.PORT_PROD;
//  } else if (process.env.NODE_ENV === 'dev') {
//      port = process.env.PORT_DEV;
//  } else if (process.env.NODE_ENV === 'test') {
//      port = process.env.PORT_TEST;
//  } else {
//      port = 3000;
//  }

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swaggerOptions');


const { sequelize } = require('./config/connection');
const syncModels = require('./models/init/index.models');

// Convierte una petición recibida (POST-GET...) a objeto JSON
/*
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//preguntar jhonatan
app.use(cors({
  origin: ' *'
}));

// Importación de rutas
const userRoute = require('./routes/userRoute');
const roleRoute = require('./routes/roleRoute');

const clientRoute = require('./routes/clientRoute');
const clinicHistoryRoute = require('./routes/clinicHistoryRoute');
const historyDetailRoute = require('./routes/historyDetailRoute');
const petRoute = require('./routes/petRoute');


// Configuración de rutas
app.use('/users', userRoute);
app.use('/roles', roleRoute);
app.use('/clients', clientRoute);
app.use('/clinic-histories', clinicHistoryRoute);
app.use('/history-details', historyDetailRoute);
app.use('/pets', petRoute);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Llamada a la función para sincronizar modelos
syncModels(sequelize);
//sequelize.sync({ force: true })   //ese codigo borra la base de datos y crea una nueva
// Sincroniza el modelo con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Database and tables synced!');
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
