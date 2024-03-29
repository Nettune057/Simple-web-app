require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
import routes from './routes';

// hellllooooo
// MongoDB Connection Config
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connection successful!'))
  .catch((err) => console.error(`There was an error: ${err}`));

// Declare Application
const app = express();

// Apply Middleware to Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cors());

// Routes //
app.use('/stats', routes.stats);

// Create HTTP Server
const server = http.createServer(app);

server.listen(process.env.PORT ? process.env.PORT : 4000);
