// Importa os módulos necessários: axios para fazer requisições HTTP e cheerio para manipulação de HTML
const axios = require('axios');
const cheerio = require('cheerio');

// Função que realiza o scraping dos detalhes de um produto específico dado o URL da página do produto
async function scrapeProductDetails(url) {
    try {
        // Faz uma requisição HTTP GET para o URL do produto
        const { data } = await axios.get(url);
        const $ = cheerio.load(data); // Carrega o HTML da página na variável $

        // Extrai e limpa as informações necessárias do HTML usando seletores CSS
        const productName = $('.title.card-title').text().trim();
        const basePrice = parseFloat($('.price').text().replace('$', ''));
        const productDescription = $('.description.card-text').text().trim();
        const productImage = 'https://webscraper.io' + $('.image.img-fluid.img-responsive').attr('src');
        const productRating = $('.ratings p[data-rating] span').length;
        const productReviews = parseInt($('.ratings .review-count').text().replace('reviews', '').trim()) || 0;

        // Coleta as opções de HDD e seus respectivos preços, se disponíveis
        let hddOptions = [];
        $('.swatches .btn.swatch').each((i, element) => {
            const hddSize = parseInt($(element).text().trim());
            const isDisabled = $(element).attr('disabled') === 'disabled';

            if (isDisabled) {
                hddOptions.push({
                    size: hddSize,
                    price: null // Se o HDD estiver desabilitado, o preço é null
                });
            } else {
                const price = basePrice + (i * 20);  // Simulação do preço incrementado para cada opção de HDD
                hddOptions.push({
                    size: hddSize,
                    price: price
                });
            }
        });

        // Retorna um objeto contendo todos os detalhes do produto
        return {
            name: productName,
            description: productDescription,
            price: basePrice,
            rating: productRating,
            reviews: productReviews,
            image: productImage,
            hddOptions: hddOptions,
            link: url
        };
    } catch (error) {
        // Em caso de erro, exibe uma mensagem de erro e retorna null
        console.error(`Erro ao processar o produto em ${url}:`, error.message);
        return null;
    }
}

// Função principal que realiza o scraping de todos os produtos em múltiplas páginas
async function scrapeLaptops() {
    let currentPage = 1;
    let hasMorePages = true;
    let laptops = [];

    // Loop sobre as páginas de produtos até que não tenha mais páginas disponíveis
    while (hasMorePages) {
        try {
            // Faz uma requisição HTTP GET para a página atual de laptops
            const { data } = await axios.get(`https://webscraper.io/test-sites/e-commerce/static/computers/laptops?page=${currentPage}`);
            const $ = cheerio.load(data);

            const productLinks = [];

            // Coleta os links para as páginas de detalhes de cada produto na página atual
            $('.thumbnail .title').each((i, element) => {
                const productLink = 'https://webscraper.io' + $(element).attr('href');
                productLinks.push(productLink);
            });

            // scrapeProductDetails sobre cada link de produto e coleta seus detalhes
            for (const link of productLinks) {
                const productDetails = await scrapeProductDetails(link);
                if (productDetails) {
                    laptops.push(productDetails);
                }
            }

            // Verifica se há mais páginas para processar
            const nextPageLink = $('.pagination .page-item.active').next('.page-item').find('a').attr('href');
            if (nextPageLink) {
                currentPage++;
            } else {
                hasMorePages = false; // Se não houver link para a próxima página, encerra o loop
            }
        } catch (error) {
            // Em caso de erro, exibe uma mensagem e encerra o loop
            console.error(`Erro ao processar a página ${currentPage}:`, error.message);
            hasMorePages = false;
        }
    }
    return laptops; // Retorna a lista de todos os laptops coletados
}

module.exports = { scrapeLaptops }; // Exporta a função scrapeLaptops para ser usada em outras partes do código
