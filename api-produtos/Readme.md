  API de Gerenciamento de Produtos
Este projeto consiste em uma API REST desenvolvida em Node.js com o framework Express. A aplicação permite o gerenciamento completo de um inventário de produtos, incluindo listagem com filtros avançados, paginação, atualizações parciais e cadastro seguro com múltiplas validações.

  Como Executar o Projeto
Certifique-se de ter o Node.js instalado.

Na pasta do projeto, instale as dependências: npm install.

Inicie o servidor: node index.js.

A API rodará em: http://localhost:3000.

🛠 Tecnologias Utilizadas
Runtime: Node.js

Framework: Express

Ferramenta de Testes: Postman

Versionamento: Git & GitHub

  Endpoints da API
1. Listar Produtos (Geral)
Retorna a lista de produtos cadastrados com suporte a inteligência de busca, filtros e paginação.

Método: GET

URL: http://localhost:3000/api/produtos

Parâmetros de Consulta:

busca: Filtra por nome do produto.

categoria: Filtra por categoria específica.

ordem: Ordena por preço (asc ou desc).

preco_min / preco_max: Filtra por faixa de preço.

2. Buscar Produto por ID
Busca um único recurso através de seu identificador único.

Método: GET | Exemplo: /api/produtos/1

Resposta de Erro (404 Not Found): Caso o ID não exista no sistema.

3. Cadastrar Novo Produto
Adiciona um novo item ao inventário após passar por camadas de validação.

Método: POST

URL: http://localhost:3000/api/produtos

Corpo (JSON): {"nome": "Webcam Pro", "preco": 450.90, "categoria": "Periféricos"}

4. Atualizar Produto (Total)
Substitui todos os dados de um produto existente.

Método: PUT | URL: /api/produtos/:id

Corpo (JSON): Deve conter nome, preco e categoria.

5. Atualizar Produto (Parcial)
Altera apenas campos específicos (ex: apenas o estoque ou apenas o preço).

Método: PATCH | URL: /api/produtos/:id

6. Remover Produto
Exclui um item permanentemente do inventário.

Método: DELETE | URL: /api/produtos/:id

Resposta: 204 No Content em caso de sucesso.

  Explicação das Validações Implementadas
Para garantir a integridade dos dados, as rotas de criação e edição contam com:

  Campos Obrigatórios: Verifica se nome, preco e categoria foram enviados no POST/PUT.

  Validação de Tipo: O campo preco deve ser obrigatoriamente um número.

Regra de Negócio: Não é permitido preços iguais ou menores que zero.

Consistência de String: O campo nome deve possuir no mínimo 3 caracteres.

Tratamento de ID: Caso um ID inexistente seja solicitado, a API retorna 404 Not Found.

  Testes no Postman
O projeto inclui uma collection completa com todos os cenários de teste (Sucesso e Erro).

Arquivo: Trabalho API.postman_collection.json

Cenários inclusos: Listagem, Busca por ID, Filtros, Erros de Validação (400) e Deleção.

  Capturas de Tela (Screenshots)
As capturas de tela comprovando o funcionamento de todos os endpoints estão na pasta "Testes".