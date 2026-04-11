const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let produtos = [
    { id: 1, nome: "Teclado Mecânico RGB", preco: 350.00, categoria: "Periféricos", estoque: 15 },
    { id: 2, nome: "Mouse Gamer Pro", preco: 180.00, categoria: "Periféricos", estoque: 25 },
    { id: 3, nome: "Monitor 27' 144Hz", preco: 1200.00, categoria: "Monitores", estoque: 8 },
    { id: 4, nome: "Headset Wireless", preco: 450.00, categoria: "Periféricos", estoque: 12 },
    { id: 5, nome: "Monitor 24' Curvo", preco: 850.00, categoria: "Monitores", estoque: 5 },
    { id: 6, nome: "Cadeira Gamer", preco: 1500.00, categoria: "Móveis", estoque: 10 },
    { id: 7, nome: "Webcam Full HD", preco: 290.00, categoria: "Periféricos", estoque: 20 },
    { id: 8, nome: "Microfone Condensador", preco: 420.00, categoria: "Áudio", estoque: 7 },
    { id: 9, nome: "SSD 1TB NVMe", preco: 550.00, categoria: "Hardware", estoque: 30 },
    { id: 10, nome: "Placa de Vídeo RTX", preco: 3200.00, categoria: "Hardware", estoque: 3 }
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

// PUT /api/produtos/:id - Atualizar produto
app.put('/api/produtos/:id', (req, res) => {
    // 1. Pegar ID da URL
    const id = parseInt(req.params.id);
    
    // 2. Buscar produto no array
    const produto = produtos.find(p => p.id === id);
    
    // 3. Verificar se existe
    if (!produto) {
        return res.status(404).json({ 
            erro: "Produto não encontrado" 
        });
    }
    
    // 4. Extrair dados do body
    const { nome, preco, categoria } = req.body;
    
    // 5. VALIDAÇÕES (igual ao POST!)
    if (!nome || !preco || !categoria) {
        return res.status(400).json({
            erro: "Campos obrigatórios: nome, preco, categoria"
        });
    }
    
    if (typeof preco !== 'number' || preco <= 0) {
        return res.status(400).json({
            erro: "Preço deve ser um número positivo"
        });
    }
    
    // 6. Atualizar campos do produto
    produto.nome = nome;
    produto.preco = preco;
    produto.categoria = categoria;
    
    // 7. Retornar produto atualizado com 200 OK
    res.json(produto);
});

// PATCH /api/produtos/:id - Atualização parcial do produto
app.patch('/api/produtos/:id', (req, res) => {
    // 1. Pegar ID da URL
    const id = parseInt(req.params.id);
    
    // 2. Buscar produto no array
    const produto = produtos.find(p => p.id === id);
    
    // 3. Verificar se existe
    if (!produto) {
        return res.status(404).json({ 
            erro: "Produto não encontrado" 
        });
    }
    
    // 4. Extrair dados do body
    const { nome, preco, categoria, estoque } = req.body;
    
    // 5. VALIDAÇÕES (apenas dos campos enviados!)
    
    if (preco !== undefined) {
        if (typeof preco !== 'number' || preco <= 0) {
            return res.status(400).json({
                erro: "Preço deve ser um número positivo"
            });
        }
    }
    
    if (nome !== undefined && nome.length < 3) {
        return res.status(400).json({
            erro: "Nome deve ter pelo menos 3 caracteres"
        });
    }
    
    // 6. Atualizar apenas os campos enviados
    if (nome !== undefined) produto.nome = nome;
    if (preco !== undefined) produto.preco = preco;
    if (categoria !== undefined) produto.categoria = categoria;
    if (estoque !== undefined) produto.estoque = estoque;
    
    // 7. Retornar produto atualizado
    res.json(produto);
});

// DELETE /api/produtos/:id - Remover produto
app.delete('/api/produtos/:id', (req, res) => {
    // 1. Pegar ID da URL
    const id = parseInt(req.params.id);
    
    // 2. Encontrar índice do produto no array
    const index = produtos.findIndex(p => p.id === id);
    
    // 3. Verificar se existe
    if (index === -1) {
        return res.status(404).json({ 
            erro: "Produto não encontrado" 
        });
    }
    
    // 4. Remover do array
    produtos.splice(index, 1);
    
    // 5. Retornar 204 No Content (sem body!)
    res.status(204).send();
});

app.listen(PORT, () => console.log(`🚀 API COMPLETA na porta ${PORT}`));