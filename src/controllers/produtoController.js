/**
 * controllers/produtoController.js
 * 
 * Controller de Produtos
 * Responsável por:
 * - Receber requisições
 * - Validar dados
 * - Chamar serviços
 * - Retornar respostas com status codes apropriados
 */

/**
 * POST /produtos
 * Criar novo produto
 * 
 * Body esperado:
 * {
 *   "nome": "Notebook",
 *   "valor_unitario": 2500.00,
 *   "quantidade_estoque": 10,
 *   "descricao": "Notebook para desenvolvimento" (opcional)
 * }
 */

const poolConexao = require('../config/database');

/**
 * funcao listaProduto
 * atende o metodo GET /produtos
 * Listar todos os produtos
 * 
 * Query parameters (opcionais):
 * - ativo=true|false
 * - page=1
 * - limit=20
 */

async function listaProduto(req, res) {
  try {
    const [rows] = await poolConexao.execute(
      'SELECT id, nome, descricao, valor_unitario, quantidade_estoque, ativo, data_criacao FROM produtos ' +
      'ORDER BY id'
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
}

async function listaProdutoAtivo(req, res) {
  try {
    const [resultado] = await poolConexao.execute(
      'SELECT id, nome, descricao, valor_unitario, quantidade_estoque, ativo, data_criacao FROM produtos ' +
      'WHERE ativo = true ' +
      'ORDER BY nome'
    );
    if (resultado.length == 0) {
      return res.status(404).json({ message: 'Nenhum produto ativo encontrado' });
    }
    res.json(resultado);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
}

// GET /produtos/:id
async function buscaProdutoPorId(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID do produto inválido'
      });
    }

    const [rows] = await poolConexao.execute(
      `SELECT id, nome, descricao, valor_unitario, quantidade_estoque, ativo, data_criacao
       FROM produtos
       WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: `Produto id: ${id} não encontrado`
      });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

// POST /produtos
function criaProduto(req, res) {
  return res.status(501).json({
    message: 'Rota ainda não implementada nesta aula'
  });
}

// PUT /produtos/:id
function atualizaProduto(req, res) {
  return res.status(501).json({
    message: 'Rota ainda não implementada nesta aula'
  });
}

// PATCH /produtos/:id/ativo
function atualizaStatus(req, res) {
  return res.status(501).json({
    message: 'Rota ainda não implementada nesta aula'
  });
}

// PATCH /produtos/:id/estoque
function atualizaEstoque(req, res) {
  return res.status(501).json({
    message: 'Rota ainda não implementada nesta aula'
  });
}

// DELETE /produtos/:id
function excluiProduto(req, res) {
  return res.status(501).json({
    message: 'Rota ainda não implementada nesta aula'
  });
}

module.exports = {
  listaProduto,
  listaProdutoAtivo,
  buscaProdutoPorId,
  criaProduto,
  atualizaProduto,
  atualizaStatus,
  atualizaEstoque,
  excluiProduto
};
