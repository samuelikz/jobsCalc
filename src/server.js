const express = require("express"); // importar o express
const server = express(); // executar o express
const routes = require("./routes/routes"); // chamar arquivo de rotas

server.set('view engine', 'ejs') // usar template, motor v8 ejs

//habilitar arquivos statics
server.use(express.static("public")); //express aqui esta todo arquivo static esta aqui

//Usar o req.body
server.use(express.urlencoded({ extended: true }))

//habilitar rotas
server.use(routes);

server.listen(3000, () => console.log('Servidor funcionando http://localhost:3000')); //Função para ligar o servidor
