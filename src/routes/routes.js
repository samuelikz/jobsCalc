const express = require('express'); // chamar o express
const routes = express.Router();
const ProfileController = require('../controllers/ProfileController') //importar da pasta controllers
const JonController = require('../controllers/JobController') //importar job Controllers
const DashController = require('../controllers/DashboardController') //importar dasBoard Controllers

routes.get('/', DashController.index); // buscar no diretorio raiz 
routes.get('/job', JonController.create); // Formulario para criar jobs
routes.post('/job', JonController.save); // Salvar dados rota post /job 
routes.get('/job/:id', JonController.show); // Mostrar jobs 
routes.post('/job/:id', JonController.update); // Salvar dados rota post
routes.post('/job/delete/:id', JonController.delete); // Salvar dados rota post 
routes.get('/profile', ProfileController.index ); // Mostrar perfil
routes.post('/profile', ProfileController.update ); // Salvar dados rota post 

module.exports = routes; //exportar para fora