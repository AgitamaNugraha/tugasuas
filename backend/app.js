require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const inquirer = require('inquirer');
const { sequelize, createDatabase, checkDatabaseExistence } = require('./config/database');
const db = require('./models');
const setupSwaggerDocs = require('./swagger'); // Import Swagger setup

// Create express app
const app = express();

// Middleware untuk mengabaikan permintaan logo
app.use((req, res, next) => {
  if (req.url.startsWith('/logo')) {
    return res.status(404).send('Not found');
  }
  next();
});

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

const checkDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
};

const createAndSyncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

const initApp = async () => {
  const databaseExists = await checkDatabaseExistence();

  if (!databaseExists) {
    const answer = await inquirer.prompt({
      type: 'confirm',
      name: 'createDatabase',
      message: 'Database does not exist. Do you want to create it?',
      default: false
    });

    if (answer.createDatabase) {
      await createDatabase();
    } else {
      console.log('Exiting application.');
      process.exit(1);
    }
  }

  const isDatabaseConnected = await checkDatabaseConnection();
  if (isDatabaseConnected) {
    await createAndSyncDatabase();
  } else {
    console.log('Unable to connect to the database after creation.');
    process.exit(1);
  }

  // Routes
  app.use('/api', require('./routes/api'));

  // Start server and setup Swagger
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    setupSwaggerDocs(app, port); // Setup Swagger docs
  });
};

initApp();
