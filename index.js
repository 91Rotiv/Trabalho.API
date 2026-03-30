// 1. Importar Express
const express = require('express');

// 2. Criar aplicação
const app = express();

// 3. Definir porta
const PORT = 3000;

// 4. Middleware para JSON
app.use(express.json());

// 5. Criar primeiro endpoint
app.get('/', (req, res) => {
    res.json({
        mensagem: '🎉 Minha primeira API funcionando!',
        status: 'sucesso',
        timestamp: new Date().toISOString()
    });
});

// 6. Endpoint de informações
app.get('/info', (req, res) => {
    res.json({
        nome: 'Minha API REST',
        versao: '1.0.0',
        autor: 'Vitor Souza'
    });
});
// 1. Criar uma lista para salvar os produtos (em memória)
let produtos = [];

// 2. Criar a rota POST que o Postman está tentando acessar
app.post('/api/produtos', (req, res) => {
    const { nome, preco, categoria } = req.body;

    const novoProduto = {
        id: produtos.length + 1,
        nome,
        preco,
        categoria,
        createdAt: new Date().toISOString()
    };

    produtos.push(novoProduto);

    // Retorna status 201 (Criado) e o produto em formato JSON
    res.status(201).json(novoProduto);
});
// --- TAREFA 1: Endpoint /api/me ---
app.get('/api/me', (req, res) => {
    res.json({
        nome: "Vitor Souza", // Altere para o seu nome real
        curso: "Engenharia de Software",
        hobbies: ["Andar de Moto", "jogar", "Assistir Corrida"],
        linguagens: ["JavaScript", "Python"]
    });
});

// --- TAREFA 2: Novos Endpoints ---

// Retorna data/hora atual
app.get('/api/data', (req, res) => {
    res.json({ 
        data_atual: new Date().toLocaleDateString(),
        hora_atual: new Date().toLocaleTimeString(),
        iso: new Date().toISOString()
    });
});

// Retorna número aleatório (entre 1 e 100)
app.get('/api/random', (req, res) => {
    const numero = Math.floor(Math.random() * 100) + 1;
    res.json({ 
        numero_aleatorio: numero,
        min: 1,
        max: 100
    });
});

// 7. Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});