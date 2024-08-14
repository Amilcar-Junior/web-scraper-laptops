const express = require('express');
const { getLaptops } = require('../controllers/laptopsController');

const router = express.Router();

/**
 * @swagger
 * /laptops:
 *   get:
 *     summary: Retorna todos os produtos de desktops ordenados por preço
 *     responses:
 *       200:
 *         description: Lista de produtos de desktops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Nome do produto
 *                   price:
 *                     type: number
 *                     description: Preço base do produto
 *                   description:
 *                     type: string
 *                     description: Descrição do produto
 *                   rating:
 *                     type: integer
 *                     description: Classificação do produto (em número de estrelas)
 *                   reviews:
 *                     type: integer
 *                     description: Número de avaliações do produto
 *                   image:
 *                     type: string
 *                     description: URL da imagem do produto
 *                   hddOptions:
 *                     type: array
 *                     description: Opções de HDD e preços associados
 *                     items:
 *                       type: object
 *                       properties:
 *                         size:
 *                           type: integer
 *                           description: Tamanho do HDD em GB
 *                         price:
 *                           type: number
 *                           description: Preço associado a essa opção de HDD
 *                   link:
 *                     type: string
 *                     description: URL da página do produto
 */
router.get('/', getLaptops);

module.exports = router;
