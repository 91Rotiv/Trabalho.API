



  Capturas de Tela (Screenshots)
As capturas de tela comprovando o funcionamento de todos os endpoints estão na pasta "Testes".

  API de Gerenciamento de Produtos

Este projeto consiste em uma API REST desenvolvida em Node.js com o framework Express e banco de dados SQLite. A aplicação permite o gerenciamento completo de um inventário de produtos, incluindo persistência de dados em arquivo, listagem com filtros dinâmicos, ordenação, paginação e validações robustas.

## Como Executar o Projeto

Certifique-se de ter o Node.js instalado em sua máquina.

1.  **Instalar dependências**:
    Na pasta do projeto, abra o terminal e execute:
    
    "npm install"
    
2.  **Popular o Banco de Dados**:
    Execute o script de semente para criar a tabela e inserir os 20 registros obrigatórios:
    
    "node seed.js"
    
3.  **Iniciar o servidor**:
    
    "node index.js"

4.  **Acesso**:

    A API estará disponível em: `http://localhost:3000`



## Tecnologias Utilizadas

* **Runtime**: Node.js
* **Framework**: Express
* **Banco de Dados**: SQLite (via biblioteca `better-sqlite3`)
* **Ferramenta de Testes**: Postman
* **Versionamento**: Git & GitHub


## Endpoints da API

**1. Listar Produtos (Inteligente)**
Retorna os produtos cadastrados com suporte a filtros dinâmicos, ordenação e paginação.

* **Método**: `GET`
* **URL**: `/api/produtos`
* **Parâmetros de Consulta (Query Params)**:
    * `categoria`: Filtra por categoria específica.
    * `preco_min` / `preco_max`: Filtra por faixa de preço.
    * `ordem`: Ordena por campo (nome, preco, estoque).
    * `direcao`: Define ordem `asc` ou `desc`.
    * `pagina` / `limite`: Controla a paginação dos resultados.

**2. Buscar Produto por ID**
Busca um único recurso através de seu identificador único.

* **Método**: `GET` | **Exemplo**: `/api/produtos/1`
* **Resposta**: Retorna o objeto do produto ou erro `404 Not Found`.

**3. Cadastrar Novo Produto**
Adiciona um novo item ao banco de dados SQLite.

* **Método**: `POST` | **URL**: `/api/produtos`
* **Corpo (JSON)**: `{"nome": "Webcam Pro", "preco": 450.90, "categoria": "Periféricos", "estoque": 10}`

**4. Atualizar Produto (Total)**
Substitui todos os dados de um produto existente (PUT).

* **Método**: `PUT` | **URL**: `/api/produtos/:id`
* **Corpo (JSON)**: Deve conter `nome`, `preco`, `categoria` e `estoque`.

**5. Atualizar Produto (Parcial)**
Altera apenas campos específicos (PATCH).

* **Método**: `PATCH` | **URL**: `/api/produtos/:id`
* **Uso**: Ideal para atualizar apenas o preço ou o saldo em estoque.

**6. Remover Produto**
Exclui um item permanentemente do banco de dados.
* **Método**: `DELETE` | **URL**: `/api/produtos/:id`
* **Resposta**: `204 No Content` em caso de sucesso.

## Explicação das Validações e Segurança

Para garantir a integridade dos dados e a nota máxima nos requisitos, a API implementa:

1.  **Persistência Real**: Uso de SQLite para que os dados não sumam ao reiniciar o servidor.
2.  **Campos Obrigatórios**: Verificação rigorosa de dados enviados no `POST` e `PUT`.
3.  **Lógica de Negócio**: Preços devem ser números positivos e nomes devem ter no mínimo 3 caracteres.
4.  **Tratamento de Erros (Try/Catch)**: Todas as rotas são protegidas por blocos `try/catch` para evitar quedas do servidor e retornar `500 Internal Server Error` quando necessário.
5.  **Status Codes Corretos**: Uso de `201` para criação, `204` para deleção, `400` para erros do cliente e `404` para recursos não encontrados.

## Testes no Postman

O projeto inclui uma collection completa para importação imediata.
* **Arquivo**: `Trabalho API.postman_collection.json`
* **Cenários inclusos**: Paginação, Filtros combinados, Erros de Validação e CRUD completo.

**Capturas de Tela (Screenshots)**
As capturas de tela comprovando o funcionamento de todos os endpoints estão na pasta "Testes".