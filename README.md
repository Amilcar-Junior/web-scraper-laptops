<div align="center">
  <a>
    <img src="https://avatars.githubusercontent.com/u/28140896?s=200&v=4" alt="Logo" width="80" height="80">
  </a>
</div>

# <p align="center">Laptops Web Scraper API</p>

Este projeto é uma API para coletar e fornecer informações sobre produtos de desktops de uma página de testes de web scraping. Utilizando Node.js, Express, e bibliotecas como Axios e Cheerio, a API realiza a coleta de dados de forma automatizada e os disponibiliza através de um endpoint RESTful.

## 🛠️ Tecnologias Utilizadas
- [Node.js](https://nodejs.org/pt) : Ambiente de execução JavaScript.
- [Express](https://expressjs.com) : Framework para construção da API.
- [Axios](https://axios-http.com/docs/intro) : Biblioteca para fazer requisições HTTP.
- [Cheerio](https://cheerio.js.org) : Biblioteca para manipulação de HTML e web scraping.
- [Swagger](https://swagger.io) : Ferramenta para documentação da API.

## ➤ Install Dependencies    
```bash
npm install
```
## ➤ Inicie o Servidor
```bash
npm run start
```

## ➤ A documentação Swagger 
```bash
http://localhost:3000/api-docs
```

## ➤ API
```http
GET /laptops
```

| Parametro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `name`   | `string` | Nome do produto    |
| `price`  | `number` | Preço do produto  |
| `description`| `string` | Descrição do produto |
| `rating`| `integer` | Avaliação do produto (em número de estrelas) |
| `reviews`| `integer` | Quantidade de comentários |
| `image`| `string` | URL da imagem do produto |
| `hddOptions`| `array` | Opções de HDD e preços associados |
| `link`| `string` | URL da página do produto |

## ➤ Estrutura do Projeto
web-scraper-laptops/<br/>
├── api/ <br/>
│   ├── routes/<br/>
│   │   └── laptops.js<br/>
│   ├── controllers/<br/>
│   │   └── laptopsController.js<br/>
│   ├── swagger/<br/>
│   │   ├── swagger.yaml<br/>
│   └── index.js<br/>
├── data/<br/>
│   └── products.json<br/>
├── scripts/<br/>
│   └── scrapeLaptops.js<br/>
├── app.js<br/>
├── package.json<br/>
└── README.md<br/>

## 🙇 Autor
#### Amílcar Júnior

<a href="https://www.linkedin.com/in/amilcar-junior/" target="_blank">
    <img src="https://img.shields.io/static/v1?message=LinkedIn&logo=linkedin&label=&color=0077B5&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="linkedin logo"  />
  </a>
  <a href="mailto:amilcarjunior2000@gmail.com" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Gmail&logo=gmail&label=&color=D14836&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="gmail logo"  />
  </a>
  <a href="https://www.instagram.com/mikamikaus/" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Instagram&logo=instagram&label=&color=E4405F&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="instagram logo"  />
  </a>
