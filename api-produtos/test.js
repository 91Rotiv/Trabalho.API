const Database = require('better-sqlite3');

// Isso vai criar um arquivo chamado test.db na mesma pasta
const db = new Database('test.db');

console.log('✅ SQLite funcionando!');

// Criando uma tabela simples para testar de verdade
db.exec("CREATE TABLE IF NOT EXISTS teste (id INTEGER PRIMARY KEY, msg TEXT)");
db.prepare("INSERT INTO teste (msg) VALUES (?)").run("Conexão com sucesso!");

const resultado = db.prepare("SELECT msg FROM teste").get();
console.log('Mensagem do banco:', resultado.msg);