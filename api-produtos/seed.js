const Database = require('better-sqlite3');
const db = new Database('produtos.db');

db.prepare('DELETE FROM produtos').run();
db.prepare("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'produtos'").run();

const produtosSeed = [
    
    { nome: "Teclado Mecânico RGB", preco: 350.00, categoria: "Periféricos", estoque: 15 },
    { nome: "Mouse Gamer Pro", preco: 180.00, categoria: "Periféricos", estoque: 25 },
    { nome: "Monitor 27' 144Hz", preco: 1200.00, categoria: "Monitores", estoque: 8 },
    { nome: "Headset Wireless", preco: 450.00, categoria: "Periféricos", estoque: 12 },
    { nome: "Monitor 24' Curvo", preco: 850.00, categoria: "Monitores", estoque: 5 },
    { nome: "Cadeira Gamer", preco: 1500.00, categoria: "Móveis", estoque: 10 },
    { nome: "Webcam Full HD", preco: 290.00, categoria: "Periféricos", estoque: 20 },
    { nome: "Microfone Condensador", preco: 420.00, categoria: "Áudio", estoque: 7 },
    { nome: "SSD 1TB NVMe", preco: 550.00, categoria: "Hardware", estoque: 30 },
    { nome: "Placa de Vídeo RTX", preco: 3200.00, categoria: "Hardware", estoque: 3 },
    { nome: "Gabinete Mid Tower", preco: 480.00, categoria: "Hardware", estoque: 6 },
    { nome: "Memória RAM 16GB DDR4", preco: 320.00, categoria: "Hardware", estoque: 40 },
    { nome: "Processador i7 12ª Geração", preco: 1850.00, categoria: "Hardware", estoque: 10 },
    { nome: "Mousepad Extra Large", preco: 85.00, categoria: "Periféricos", estoque: 50 },
    { nome: "Caixa de Som Bluetooth", preco: 220.00, categoria: "Áudio", estoque: 18 },
    { nome: "Hub USB-C 7 em 1", preco: 150.00, categoria: "Acessórios", estoque: 14 },
    { nome: "Suporte de Monitor Articulado", preco: 210.00, categoria: "Móveis", estoque: 9 },
    { nome: "Fonte 750W 80 Plus Gold", preco: 640.00, categoria: "Hardware", estoque: 11 },
    { nome: "Cabo HDMI 2.1 2m", preco: 45.00, categoria: "Acessórios", estoque: 100 },
    { nome: "Mesa Digitalizadora", preco: 380.00, categoria: "Periféricos", estoque: 4 }
];

const insert = db.prepare(`
    INSERT INTO produtos (nome, preco, categoria, estoque) 
    VALUES (@nome, @preco, @categoria, @estoque)
`);

const insertMany = db.transaction((lista) => {
    for (const p of lista) insert.run(p);
});

insertMany(produtosSeed);

console.log("✅ Banco de dados populado com 20 produtos!");