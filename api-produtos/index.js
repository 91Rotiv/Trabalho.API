const express = require('express');
const Database = require('better-sqlite3');
const app = express();
const PORT = 3000;
const db = new Database('produtos.db');

app.use(express.json());

// 1. GET /api/produtos - Listagem com Filtros, Ordenação e Paginação
app.get('/api/produtos', (req, res) => {
    try {
        const { 
            categoria, preco_max, preco_min, 
            ordem, direcao,
            pagina = 1, 
            limite = 10
        } = req.query;
        
        // Construção dinâmica da Query SQL
        let sql = 'SELECT * FROM produtos WHERE 1=1';
        const params = [];
        
        // Filtros
        if (categoria) {
            sql += ' AND categoria = ?';
            params.push(categoria);
        }
        if (preco_max) {
            sql += ' AND preco <= ?';
            params.push(parseFloat(preco_max));
        }
        if (preco_min) {
            sql += ' AND preco >= ?';
            params.push(parseFloat(preco_min));
        }
        
        // Contagem total para paginação (antes do LIMIT)
        let countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');
        const countStmt = db.prepare(countSql);
        const { total } = countStmt.get(...params);
        
        // Ordenação (Segurança com Whitelist)
        if (ordem) {
            const camposValidos = ['nome', 'preco', 'categoria', 'estoque'];
            if (camposValidos.includes(ordem)) {
                sql += ` ORDER BY ${ordem}`;
                sql += (direcao === 'desc') ? ' DESC' : ' ASC';
            }
        }
        
        // Paginação (LIMIT e OFFSET)
        const limiteNum = parseInt(limite);
        const paginaNum = parseInt(pagina);
        const offset = (paginaNum - 1) * limiteNum;
        
        sql += ' LIMIT ? OFFSET ?';
        params.push(limiteNum, offset);
        
        const stmt = db.prepare(sql);
        const produtos = stmt.all(...params);
        
        res.json({
            dados: produtos,
            paginacao: {
                pagina_atual: paginaNum,
                itens_por_pagina: limiteNum,
                total_itens: total,
                total_paginas: Math.ceil(total / limiteNum)
            }
        });
    } catch (error) {
        console.error("Erro na busca:", error);
        res.status(500).json({ erro: 'Erro ao processar busca no banco' });
    }
});

// 2. GET /api/produtos/:id - Buscar por ID
app.get('/api/produtos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const produto = db.prepare('SELECT * FROM produtos WHERE id = ?').get(id);
        
        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar produto' });
    }
});

// 3. POST /api/produtos - Criar produto
app.post('/api/produtos', (req, res) => {
    try {
        const { nome, preco, categoria, estoque = 0 } = req.body;
        
        if (!nome || !preco || !categoria) {
            return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
        }

        const stmt = db.prepare(`
            INSERT INTO produtos (nome, preco, categoria, estoque)
            VALUES (?, ?, ?, ?)
        `);
        const result = stmt.run(nome, preco, categoria, estoque);
        
        const produtoCriado = db.prepare('SELECT * FROM produtos WHERE id = ?').get(result.lastInsertRowid);
        res.status(201).json(produtoCriado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao criar produto' });
    }
});

// 4. PUT /api/produtos/:id - Atualização Total
app.put('/api/produtos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        // Verificar existência
        const produtoExiste = db.prepare('SELECT id FROM produtos WHERE id = ?').get(id);
        if (!produtoExiste) return res.status(404).json({ erro: 'Produto não encontrado' });
        
        const { nome, preco, categoria, estoque } = req.body;
        if (!nome || !preco || !categoria) {
            return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
        }

        const stmt = db.prepare(`
            UPDATE produtos SET nome = ?, preco = ?, categoria = ?, estoque = ? WHERE id = ?
        `);
        stmt.run(nome, preco, categoria, estoque || 0, id);
        
        const produtoAtualizado = db.prepare('SELECT * FROM produtos WHERE id = ?').get(id);
        res.json(produtoAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao atualizar' });
    }
});

// 5. PATCH /api/produtos/:id - Atualização Parcial
app.patch('/api/produtos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const campos = req.body;

        const produtoAtual = db.prepare('SELECT * FROM produtos WHERE id = ?').get(id);
        if (!produtoAtual) return res.status(404).json({ erro: 'Produto não encontrado' });

        const nome = campos.nome || produtoAtual.nome;
        const preco = campos.preco || produtoAtual.preco;
        const categoria = campos.categoria || produtoAtual.categoria;
        const estoque = campos.estoque !== undefined ? campos.estoque : produtoAtual.estoque;

        db.prepare(`UPDATE produtos SET nome = ?, preco = ?, categoria = ?, estoque = ? WHERE id = ?`)
          .run(nome, preco, categoria, estoque, id);

        res.json({ mensagem: "Atualizado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro no patch' });
    }
});

// 6. DELETE /api/produtos/:id - Deletar produto
app.delete('/api/produtos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const resultado = db.prepare('DELETE FROM produtos WHERE id = ?').run(id);

        if (resultado.changes === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao deletar' });
    }
});

app.listen(PORT, () => {
    console.log(' API Completa')
    console.log(` Servidor rodando em http://localhost:${PORT}`);
});