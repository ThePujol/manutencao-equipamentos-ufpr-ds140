const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'leo',
    password: 'admin',
    database: 'bancomanutencao_equipamentos'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar:', err);
        return;
    }
    console.log('Conectado ao MySQL!');
});

module.exports = connection;
