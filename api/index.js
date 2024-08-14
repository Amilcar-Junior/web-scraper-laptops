const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const laptopsRouter = require('./routes/laptops');

const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/laptops', laptopsRouter);

module.exports = app;
