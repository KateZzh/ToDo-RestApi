const express = require('express');
const router = require('../src/controller/controller');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/task', router);

app.use((error, req, res, _next) => res.send(error.message));

module.exports = app;
