const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Passo 2: Array com 5 produtos e 2 categorias
const produtos = [
    { id: 1, nome: "Teclado Mecânico RGB", preco: 350.00, categoria: "Periféricos", estoque: 15 },
    { id: 2, nome: "Mouse Gamer Pro", preco: 180.00, categoria: "Periféricos", estoque: 25 },
    { id: 3, nome: "Monitor 27' 144Hz", preco: 1200.00, categoria: "Monitores", estoque: 8 },
    { id: 4, nome: "Headset Wireless", preco: 450.00, categoria: "Periféricos", estoque: 12 },
    { id: 5, nome: "Monitor 24' Curvo", preco: 850.00, categoria: "Monitores", estoque: 5 }
];

// Passo 3 & Desafios: Listar todos com Filtros e Paginação
app.get('/api/produtos', (req, res) => {
    let resultado = [...produtos]; // Copia a lista original
    const { categoria, ordem, busca, preco_min, preco_max, pagina = 1, limite = 2 } = req.query;

    // 1. Filtro por Categoria
    if (categoria) {
        resultado = resultado.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }

    // 2. Busca por Nome (?busca=mouse)
    if (busca) {
        resultado = resultado.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));
    }

    // 3. Faixa de Preço (Min/Max)
    if (preco_min) resultado = resultado.filter(p => p.preco >= parseFloat(preco_min));
    if (preco_max) resultado = resultado.filter(p => p.preco <= parseFloat(preco_max));

    // 4. Ordenação por Preço (?ordem=asc ou ?ordem=desc)
    if (ordem === 'asc') {
        resultado.sort((a, b) => a.preco - b.preco);
    } else if (ordem === 'desc') {
        resultado.sort((a, b) => b.preco - a.preco);
    }

    // 5. Paginação (Desafio Extra)
    const inicio = (pagina - 1) * limite;
    const fim = pagina * limite;
    const paginado = resultado.slice(inicio, fim);

    res.json({
        total: resultado.length,
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        dados: paginado
    });
});

// Passo 3: Buscar por ID
app.get('/api/produtos/:id', (req, res) => {
    const { id } = req.params;
    const produto = produtos.find(p => p.id === parseInt(id));

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado 🔍" });
    }
    res.json(produto);
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});