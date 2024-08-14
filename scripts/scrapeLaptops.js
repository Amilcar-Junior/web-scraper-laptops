const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function scrapeProductDetails(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const productName = $('.title.card-title').text().trim();
        const basePrice = parseFloat($('.price').text().replace('$', ''));
        const productDescription = $('.description.card-text').text().trim();
        const productImage = $('.image.img-fluid.img-responsive').attr('src');
        const productRating = $('.ratings p[data-rating] span').length;
        const productReviews = parseInt($('.ratings .review-count').text().replace('reviews', '').trim()) || 0;

        // Coleta de HDD e seus preços
        let hddOptions = [];

        $('.swatches .btn.swatch').each((i, element) => {
            const hddSize = parseInt($(element).text().trim());
            const isDisabled = $(element).attr('disabled') === 'disabled';

            if (isDisabled) {
                hddOptions.push({
                    size: hddSize,
                    price: null
                });
            } else {
                const price = basePrice + (i * 20);  // Incrementa o preço com base no índice do HDD.
                hddOptions.push({
                    size: hddSize,
                    price: price
                });
            }
        });

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
        console.error(`Erro ao processar o produto em ${url}:`, error.message);
        return null;
    }
}

async function scrapeLaptops() {
    let currentPage = 1;
    let hasMorePages = true;
    let laptops = [];

    while (hasMorePages) {
        try {
            const { data } = await axios.get(`https://webscraper.io/test-sites/e-commerce/static/computers/laptops?page=${currentPage}`);
            const $ = cheerio.load(data);

            const productLinks = [];

            $('.thumbnail .title').each((i, element) => {
                const productLink = 'https://webscraper.io' + $(element).attr('href');
                productLinks.push(productLink);
            });

            for (const link of productLinks) {
                const productDetails = await scrapeProductDetails(link);
                if (productDetails) {
                    laptops.push(productDetails);
                }
            }

            // Verifica se há mais páginas
            const nextPageLink = $('.pagination .page-item.active').next('.page-item').find('a').attr('href');
            if (nextPageLink) {
                currentPage++;
            } else {
                hasMorePages = false;
            }
        } catch (error) {
            console.error(`Erro ao processar a página ${currentPage}:`, error.message);
            hasMorePages = false;
        }
    }

    return laptops;
}

module.exports = { scrapeLaptops };
