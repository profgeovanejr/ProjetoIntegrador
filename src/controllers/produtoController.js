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

const poolConexao = require('../config/database');

const Produto = require('../models/Produto');

// GET /produtos/pagina&limite
async function listaProduto(req, res) {

  try {

    const { pagina = 1, limite = 10 } = req.query;
    const offset = (pagina - 1) * limite;

    const { count, rows } = await Produto.findAndCountAll({

      limit: parseInt(limite),
      offset: parseInt(offset),
      order: [['data_criacao', 'DESC']]
    });

    const totalPaginas = Math.ceil(count / limite);

    return res.status(200).json({

      total: count,
      page: parseInt(pagina),
      limit: parseInt(limite),
      totalPages: Math.ceil(count / limite),
      paginaPosterior: pagina < totalPaginas,
      paginaAnterior: pagina > 1,
      produto: rows
    });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// GET /produtos/:id
async function buscaProdutoPorId(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID do produto inválido'
      });
    }

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ error: `Produto id: ${id} não encontrado` });
    }

    return res.status(200).json(produto);
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

// POST /produtos
async function criaProduto(req, res) {
  try {
    const {
      nome,
      descricao,
      valorUnitario,
      quantidadeEstoque,
      ativo
    } = req.body;

    const novoProduto = await Produto.create({
      nome,
      descricao,
      valorUnitario,
      quantidadeEstoque,
      ativo
    });

    return res.status(201).json({
      message: 'Produto cadastrado com sucesso',
      produto: novoProduto
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Erro de validação',
        erros: error.errors.map((err) => ({
          campo: err.path,
          mensagem: err.message
        }))
      });
    }

    return res.status(500).json({
      message: 'Erro interno do servidor'
    });
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

// PUT /produtos/:id
async function atualizaProduto(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID do produto inválido'
      });
    }

    const {
      nome,
      descricao,
      valorUnitario,
      quantidadeEstoque,
      ativo
    } = req.body;

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({
        message: `Produto id: ${id} não encontrado`
      });
    }

    await produto.update({
      nome,
      descricao,
      valorUnitario,
      quantidadeEstoque,
      ativo
    });

    return res.status(200).json({
      message: 'Produto atualizado com sucesso',
      produto
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Erro de validação',
        erros: error.errors.map((err) => ({
          campo: err.path,
          mensagem: err.message
        }))
      });
    }

    return res.status(500).json({
      message: 'Erro interno do servidor'
    });
  }
}

// PATCH /produtos/:id/ativo
async function atualizaStatus(req, res) {
  try {
    const { id } = req.params;
    const { ativo } = req.body;

    // valida ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID do produto inválido'
      });
    }

    // valida campo ativo
    if (typeof ativo !== 'boolean') {
      return res.status(400).json({
        message: 'O campo "ativo" deve ser boolean (true ou false)'
      });
    }

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({
        message: `Produto id: ${id} não encontrado`
      });
    }

    // atualiza apenas o status
    await produto.update({ ativo });

    return res.status(200).json({
      message: 'Status do produto atualizado com sucesso',
      produto
    });

  } catch (error) {
    console.error('Erro ao atualizar status do produto:', error);

    return res.status(500).json({
      message: 'Erro interno do servidor'
    });
  }
}

// PATCH /produtos/:id/estoque
function atualizaEstoque(req, res) {
  return res.status(501).json({
    message: 'Rota ainda não implementada nesta aula'
  });
}

// DELETE /produtos/:id
async function excluiProduto(req, res) {
  try {
    const { id } = req.params;

    // valida ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID do produto inválido'
      });
    }

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({
        message: `Produto id: ${id} não encontrado`
      });
    }

    await produto.destroy();

    return res.status(200).json({
      message: 'Produto excluído com sucesso'
    });

  } catch (error) {
    console.error('Erro ao excluir produto:', error);

    return res.status(500).json({
      message: 'Erro interno do servidor'
    });
  }
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
