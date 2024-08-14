const { scrapeLaptops } = require('../../scripts/scrapeLaptops');

const getLaptops = async (req, res) => {
    try {
        const laptops = await scrapeLaptops();
        res.json(laptops);
    } catch (error) {
        res.status(500).send('Erro ao processar a requisição');
    }
};

module.exports = { getLaptops };
