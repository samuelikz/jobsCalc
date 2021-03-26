const express = require("express"); // importar o express
const server = express(); // executar o express
const routes = require("./routes/routes"); // chamar arquivo de rotas

server.set('view engine', 'ejs') // usar template, motor v8 ejs

//habilitar arquivos statics
server.use(express.static("public")); //express aqui esta todo arquivo static esta aqui

//habilitar rotas
server.use(routes);

server.listen(3000, () => console.log('Servidor funcionando')); //Função para ligar o servidor
