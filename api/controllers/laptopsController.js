// Importa a função scrapeLaptops do módulo de scripts
const { scrapeLaptops } = require('../../scripts/scrapeLaptops');

// Função controladora para lidar com requisições GET na rota /laptops
const getLaptops = async (req, res) => {
    try {
        // Chama a função de scraping para coletar os dados dos laptops
        const laptops = await scrapeLaptops();
        // Responde com os dados coletados em formato JSON
        res.json(laptops);
    } catch (error) {
        // Em caso de erro
        res.status(500).send('Erro ao processar a requisição');
    }
};

// Exporta a função para que possa ser usada nas rotas
module.exports = { getLaptops };
