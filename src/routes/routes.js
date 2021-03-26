const express = require('express'); // chamar o express
const routes = express.Router();
const basePath = process.cwd () + "/src/views/" // caminho ./src

const profile = {
    name: "Samuel Nunes",
    avatar: "https://avatars.githubusercontent.com/u/62406705?v=4",
    "monthly-budget" : 3000,
    "days-per-week" : 5,
    "hours-per-day" : 5,
    "vacation-per-year" : 4
}

//req, res, render renderizar o html

routes.get('/', (req, res) => res.render(basePath + "index")); // buscar no diretorio raiz 
routes.get('/job', (req, res) => res.render(basePath + "job")); // buscar no diretorio raiz 
routes.get('/job/edit', (req, res) => res.render(basePath + "job-edit")); // buscar no diretorio raiz 
routes.get('/profile', (req, res) => res.render(basePath + "profile", {profile})); // buscar no diretorio raiz 

module.exports = routes; //exportar para fora