const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/tasks', taskRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
