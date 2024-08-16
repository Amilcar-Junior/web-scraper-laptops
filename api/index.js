// Importa os módulos necessários: express para criar o servidor, swaggerUi para a interface do Swagger, YAML para carregar arquivos YAML
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const laptopsRouter = require('./routes/laptops'); // Importa as rotas de laptops

// Carrega o documento Swagger a partir do arquivo YAML
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

const app = express(); // Cria uma instância do servidor Express

// Configura a documentação da API '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configura as rotas de laptops na rota '/laptops'
app.use('/laptops', laptopsRouter);

module.exports = app;
