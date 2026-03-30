const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let produtos = [
    { id: 1, nome: "Teclado Mecânico RGB", preco: 350.00, categoria: "Periféricos", estoque: 15 },
    { id: 2, nome: "Mouse Gamer Pro", preco: 180.00, categoria: "Periféricos", estoque: 25 },
    { id: 3, nome: "Monitor 27' 144Hz", preco: 1200.00, categoria: "Monitores", estoque: 8 },
    { id: 4, nome: "Headset Wireless", preco: 450.00, categoria: "Periféricos", estoque: 12 },
    { id: 5, nome: "Monitor 24' Curvo", preco: 850.00, categoria: "Monitores", estoque: 5 }
];
let proximoId = 6;

app.get('/api/produtos', (req, res) => {
    let resultado = [...produtos];
    const { categoria, ordem, busca, preco_min, preco_max, pagina = 1, limite = 10 } = req.query;

    if (categoria) resultado = resultado.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    if (busca) resultado = resultado.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));
    if (preco_min) resultado = resultado.filter(p => p.preco >= parseFloat(preco_min));
    if (preco_max) resultado = resultado.filter(p => p.preco <= parseFloat(preco_max));

    if (ordem === 'asc') resultado.sort((a, b) => a.preco - b.preco);
    else if (ordem === 'desc') resultado.sort((a, b) => b.preco - a.preco);

    const inicio = (pagina - 1) * limite;
    const fim = pagina * limite;
    const paginado = resultado.slice(inicio, fim);

    res.json({ total: resultado.length, pagina: parseInt(pagina), dados: paginado });
});

app.get('/api/produtos/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
});

app.post('/api/produtos', (req, res) => {
    const { nome, preco, categoria } = req.body;

    if (!nome || !preco || !categoria) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, preco e categoria." });
    }
    if (typeof preco !== 'number' || preco <= 0) {
        return res.status(400).json({ erro: "O preço deve ser um número maior que zero." });
    }
    if (nome.length < 3) {
        return res.status(400).json({ erro: "O nome deve ter pelo menos 3 caracteres." });
    }

    const novoProduto = { id: proximoId++, nome, preco, categoria };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.listen(PORT, () => console.log(`🚀 API COMPLETA na porta ${PORT}`));