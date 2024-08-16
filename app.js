// Carrega o módulo 'app' a partir da pasta 'api/index.js'
const app = require('./api/index');

const PORT = process.env.PORT || 3000;

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    // console.log(`Servidor rodando na porta: ${PORT}`);
    console.log(`Documentação da Api: http://localhost:${PORT}/api-docs`);
});
