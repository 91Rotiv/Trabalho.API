 API de Gerenciamento de Produtos:

Este projeto consiste em uma API REST desenvolvida em Node.js com o framework Express. A aplicação permite o gerenciamento completo de um inventário de produtos, incluindo listagem com filtros avançados, paginação e cadastro seguro com múltiplas validações.

 Tecnologias Utilizadas:
Runtime: Node.js

Framework: Express

Ferramenta de Testes: Postman

Versionamento: Git & GitHub

 Endpoints da API:
1. Listar Produtos (Geral)
Retorna a lista de produtos cadastrados com suporte a inteligência de busca.

Método: GET

URL: http://localhost:3000/api/produtos

Parâmetros de Consulta:

busca: Filtra por nome do produto.

categoria: Filtra por categoria específica.

ordem: Ordena por preço (asc ou desc).

Resposta de Sucesso (200 OK):

JSON
{
  "total": 5,
  "pagina": 1,
  "dados": [ ... ]
}
2. Buscar Produto por ID
Busca um único recurso através de seu identificador único.

Método: GET

URL: http://localhost:3000/api/produtos/:id

Exemplo: /api/produtos/1

Resposta de Erro (404 Not Found): Caso o ID não exista no sistema.

3. Cadastrar Novo Produto
Adiciona um novo item ao inventário após passar por camadas de validação.

Método: POST

URL: http://localhost:3000/api/produtos

Corpo da Requisição (JSON Body):

JSON
{
  "nome": "Webcam Pro 4K",
  "preco": 450.90,
  "categoria": "Periféricos"
}
Resposta de Sucesso (201 Created): Retorna o objeto criado com o ID gerado automaticamente.

  Explicação das Validações Implementadas
Para garantir a integridade dos dados e evitar erros no sistema, a rota POST conta com as seguintes validações:

Campos Obrigatórios: O sistema verifica se nome, preco e categoria foram enviados. Caso falte algum, retorna erro 400.

Validação de Tipo (Data Type): O campo preco deve ser obrigatoriamente um número.

Regra de Negócio (Preço Positivo): Não é permitido cadastrar produtos com preço igual ou menor que zero.

Consistência de Dados (String): O campo nome deve possuir no mínimo 3 caracteres para evitar nomes inválidos ou vazios.

  Exemplos de Testes no Postman
✅ Requisição de Sucesso (POST 201)
Ao enviar um JSON válido, a API processa os dados e incrementa o proximoId.

URL: POST /api/produtos

Status Esperado: 201 Created

 Requisição de Erro (POST 400)
Ao enviar um preço negativo ou omitir um campo obrigatório.

Status Esperado: 400 Bad Request

Mensagem: "erro": "O preço deve ser um número maior que zero."

 Capturas de Tela (Screenshots)
As capturas de tela estão na pasta "Testes"