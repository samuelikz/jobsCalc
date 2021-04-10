const sqlite3 = require('sqlite3') //importar sqlite3
const { open } = require('sqlite') //importar apenas a funcionalidade open

module.exports = () =>
//Abrindo conexão com o banco
open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});
