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
  buscaProdutoPorId,
  criaProduto,
  atualizaProduto,
  atualizaStatus,
  atualizaEstoque,
  excluiProduto
};
// module.exports = {listaProduto};

// // exports.listaProduto = (req, res) => {
// //   try {
// //     const { ativo, page = 1, limit = 20 } = req.query;
    
// //     // Simular lista de produtos
// //     let produtos = [
// //       {
// //         id: 1,
// //         nome: 'Notebook Dell',
// //         valor_unitario: 2500.00,
// //         quantidade_estoque: 10,
// //         ativo: true,
// //         data_criacao: new Date().toISOString()
// //       },
// //       {
// //         id: 2,
// //         nome: 'Mouse Logitech',
// //         valor_unitario: 50.00,
// //         quantidade_estoque: 100,
// //         ativo: true,
// //         data_criacao: new Date().toISOString()
// //       },
// //       {
// //         id: 3,
// //         nome: 'Teclado Mecânico',
// //         valor_unitario: 150.00,
// //         quantidade_estoque: 0,
// //         ativo: false,
// //         data_criacao: new Date().toISOString()
// //       }
// //     ];
    
// //     // Filtrar por ativo se fornecido
// //     if (ativo !== undefined) {
// //       const isativo = ativo === 'true';
// //       produtos = produtos.filter(p => p.ativo === isativo);
// //     }
    
// //     // Aplicar paginação
// //     const pageNum = parseInt(page);
// //     const limitNum = parseInt(limit);
// //     const startIndex = (pageNum - 1) * limitNum;
// //     const endIndex = startIndex + limitNum;
// //     const paginatedProducts = produtos.slice(startIndex, endIndex);
    
// //     // ============================================
// //     // RESPOSTA COM STATUS 200 (OK)
// //     // ============================================
    
// //     return res.status(200).json({
// //       message: 'Produtos listados com sucesso',
// //       pagination: {
// //         page: pageNum,
// //         limit: limitNum,
// //         total: produtos.length,
// //         totalPages: Math.ceil(produtos.length / limitNum)
// //       },
// //       produtos: paginatedProducts
// //     });
    
// //   } catch (error) {
// //     console.error('Erro ao listar produtos:', error);
// //     return res.status(500).json({
// //       message: 'Erro ao listar produtos',
// //       error: error.message
// //     });
// //   }
// // };

// /**
//  * GET /produtos/:id
//  * Detalhar um produto específico
//  */
// exports.buscaProdutoPorId = (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Validar ID
//     if (!id || isNaN(id)) {
//       return res.status(400).json({
//         message: 'ID do produto inválido'
//       });
//     }
    
//     // Simular busca
//     const produto = {
//       id: parseInt(id),
//       nome: 'Notebook Dell',
//       valor_unitario: 2500.00,
//       quantidade_estoque: 10,
//       descricao: 'Notebook para desenvolvimento',
//       ativo: true,
//       data_criacao: new Date().toISOString(),
//       data_atualizacao: new Date().toISOString()
//     };
    
//     // Simular produto não encontrado
//     if (parseInt(id) === 999) {
//       return res.status(404).json({
//         message: 'Produto não encontrado'
//       });
//     }
    
//     // ============================================
//     // RESPOSTA COM STATUS 200 (OK)
//     // ============================================
    
//     return res.status(200).json({
//       message: 'Produto encontrado',
//       produto
//     });
    
//   } catch (error) {
//     console.error('Erro ao buscar produto:', error);
//     return res.status(500).json({
//       message: 'Erro ao buscar produto',
//       error: error.message
//     });
//   }
// };

// exports.criaProduto = (req, res) => {
//   try {
//     const { nome, valor_unitario, quantidade_estoque, descricao } = req.body;
    
//     // ============================================
//     // VALIDAÇÕES
//     // ============================================
    
//     // Validar nome
//     if (!nome || !nome.trim()) {
//       return res.status(400).json({
//         message: 'Validação falhou',
//         errors: ['Nome do produto é obrigatório']
//       });
//     }
    
//     if (nome.trim().length < 3) {
//       return res.status(400).json({
//         message: 'Validação falhou',
//         errors: ['Nome deve ter pelo menos 3 caracteres']
//       });
//     }
    
//     // Validar preço
//     if (valor_unitario === undefined || valor_unitario === null) {
//       return res.status(400).json({
//         message: 'Validação falhou',
//         errors: ['Preço é obrigatório']
//       });
//     }
    
//     if (typeof valor_unitario !== 'number' || valor_unitario <= 0) {
//       return res.status(400).json({
//         message: 'Validação falhou',
//         errors: ['Preço deve ser um número maior que 0']
//       });
//     }
    
//     // Validar estoque
//     if (quantidade_estoque === undefined || quantidade_estoque === null) {
//       return res.status(400).json({
//         message: 'Validação falhou',
//         errors: ['Estoque é obrigatório']
//       });
//     }
    
//     if (!Number.isInteger(quantidade_estoque) || quantidade_estoque < 0) {
//       return res.status(400).json({
//         message: 'Validação falhou',
//         errors: ['Estoque deve ser um número inteiro não-negativo']
//       });
//     }
    
//     // ============================================
//     // CRIAR PRODUTO (simulado, sem banco)
//     // ============================================
    
//     const novoProduto = {
//       id: Math.floor(Math.random() * 100000),
//       nome: nome.trim(),
//       valor_unitario,
//       quantidade_estoque,
//       descricao: descricao || null,
//       ativo: true,
//       data_criacao: new Date().toISOString(),
//       data_atualizacao: new Date().toISOString()
//     };
    
//     // ============================================
//     // RESPOSTA COM STATUS 201 (CREATED)
//     // ============================================
    
//     return res.status(201).json({
//       message: 'Produto criado com sucesso',
//       produto: novoProduto
//     });
    
//   } catch (error) {
//     console.error('Erro ao criar produto:', error);
//     return res.status(500).json({
//       message: 'Erro ao criar produto',
//       error: error.message
//     });
//   }
// };

// /**
//  * GET /produtos
//  * Listar todos os produtos
//  * 
//  * Query parameters (opcionais):
//  * - ativo=true|false
//  * - page=1
//  * - limit=20
//  */

// /**
//  * PUT /produtos/:id
//  * Atualizar produto COMPLETO
//  * 
//  * Body esperado (todos os campos obrigatórios):
//  * {
//  *   "nome": "Novo nome",
//  *   "valor_unitario": 3000.00,
//  *   "quantidade_estoque": 20,
//  *   "descricao": "Nova descrição"
//  * }
//  */
// exports.atualizaProduto = (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nome, valor_unitario, quantidade_estoque, descricao } = req.body;
    
//     // Validar ID
//     if (!id || isNaN(id)) {
//       return res.status(400).json({
//         message: 'ID do produto inválido'
//       });
//     }
    
//     // ============================================
//     // VALIDAÇÕES (mesmas de create)
//     // ============================================
    
//     const errors = [];
    
//     if (!nome || !nome.trim()) {
//       errors.push('Nome do produto é obrigatório');
//     }
    
//     if (!valor_unitario || typeof valor_unitario !== 'number' || valor_unitario <= 0) {
//       errors.push('Preço deve ser um número maior que 0');
//     }
    
//     if (quantidade_estoque === undefined || !Number.isInteger(quantidade_estoque) || quantidade_estoque < 0) {
//       errors.push('Estoque deve ser um número inteiro não-negativo');
//     }
    
//     if (errors.length > 0) {
//       return res.status(400).json({
//         message: 'Validação falhou',
//         errors
//       });
//     }
    
//     // Simular produto não encontrado
//     if (parseInt(id) === 999) {
//       return res.status(404).json({
//         message: 'Produto não encontrado'
//       });
//     }
    
//     // ============================================
//     // ATUALIZAR PRODUTO (simulado)
//     // ============================================
    
//     const produtoAtualizado = {
//       id: parseInt(id),
//       nome: nome.trim(),
//       valor_unitario,
//       quantidade_estoque,
//       descricao: descricao || null,
//       ativo: true,
//       data_criacao: new Date().toISOString(),
//       data_atualizacao: new Date().toISOString()
//     };
    
//     // ============================================
//     // RESPOSTA COM STATUS 200 (OK)
//     // ============================================
    
//     return res.status(200).json({
//       message: 'Produto atualizado com sucesso',
//       produto: produtoAtualizado
//     });
    
//   } catch (error) {
//     console.error('Erro ao atualizar produto:', error);
//     return res.status(500).json({
//       message: 'Erro ao atualizar produto',
//       error: error.message
//     });
//   }
// };

// /**
//  * PATCH /produtos/:id/ativo
//  * Ativar ou desativar um produto
//  * 
//  * Body esperado:
//  * {
//  *   "ativo": true ou false
//  * }
//  */
// exports.atualizaStatus = (req, res) => {
//   try {
//     const { id } = req.params;
//     const { ativo } = req.body;
    
//     // Validar ID
//     if (!id || isNaN(id)) {
//       return res.status(400).json({
//         message: 'ID do produto inválido'
//       });
//     }
    
//     // Validar campo ativo
//     if (typeof ativo !== 'boolean') {
//       return res.status(400).json({
//         message: 'Validação falhou',
//         errors: ['Campo "ativo" deve ser true ou false']
//       });
//     }
    
//     // Simular produto não encontrado
//     if (parseInt(id) === 999) {
//       return res.status(404).json({
//         message: 'Produto não encontrado'
//       });
//     }
    
//     // ============================================
//     // ATUALIZAR APENAS O CAMPO ativo
//     // ============================================
    
//     const produtoAtualizado = {
//       id: parseInt(id),
//       ativo,
//       data_atualizacao: new Date().toISOString()
//     };
    
//     // ============================================
//     // RESPOSTA COM STATUS 200 (OK)
//     // ============================================
    
//     return res.status(200).json({
//       message: 'Status do produto atualizado com sucesso',
//       produto: produtoAtualizado
//     });
    
//   } catch (error) {
//     console.error('Erro ao atualizar status do produto:', error);
//     return res.status(500).json({
//       message: 'Erro ao atualizar status do produto',
//       error: error.message
//     });
//   }
// };

// /**
//  * PATCH /produtos/:id/quantidade_estoque
//  * Ajustar estoque de um produto
//  * 
//  * Body esperado:
//  * {
//  *   "quantidade_estoque": 50
//  * }
//  */
// exports.atualizaEstoque = (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantidade_estoque } = req.body;
    
//     // Validar ID
//     if (!id || isNaN(id)) {
//       return res.status(400).json({
//         message: 'ID do produto inválido'
//       });
//     }
    
//     // Validar quantidade
//     if (quantidade_estoque === undefined || !Number.isInteger(quantidade_estoque) || quantidade_estoque < 0) {
//       return res.status(400).json({
//         message: 'Validação falhou',
//         errors: ['Quantidade deve ser um número inteiro não-negativo']
//       });
//     }
    
//     // Simular produto não encontrado
//     if (parseInt(id) === 999) {
//       return res.status(404).json({
//         message: 'Produto não encontrado'
//       });
//     }
    
//     // ============================================
//     // ATUALIZAR APENAS O CAMPO quantidade_estoque
//     // ============================================
    
//     const produtoAtualizado = {
//       id: parseInt(id),
//       quantidade_estoque: quantidade_estoque,
//       data_atualizacao: new Date().toISOString()
//     };
    
//     // ============================================
//     // RESPOSTA COM STATUS 200 (OK)
//     // ============================================
    
//     return res.status(200).json({
//       message: 'Estoque atualizado com sucesso',
//       produto: produtoAtualizado
//     });
    
//   } catch (error) {
//     console.error('Erro ao atualizar estoque:', error);
//     return res.status(500).json({
//       message: 'Erro ao atualizar estoque',
//       error: error.message
//     });
//   }
// };

// /**
//  * DELETE /produtos/:id
//  * Deletar um produto
//  */
// exports.excluiProduto = (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Validar ID
//     if (!id || isNaN(id)) {
//       return res.status(400).json({
//         message: 'ID do produto inválido'
//       });
//     }
    
//     // Simular produto não encontrado
//     if (parseInt(id) === 999) {
//       return res.status(404).json({
//         message: 'Produto não encontrado'
//       });
//     }
    
//     // ============================================
//     // DELETAR PRODUTO (simulado)
//     // ============================================
    
//     // ============================================
//     // RESPOSTA COM STATUS 204 (NO CONTENT)
//     // Sucesso sem conteúdo no corpo
//     // ============================================
    
//     return res.status(204).send();
    
//   } catch (error) {
//     console.error('Erro ao deletar produto:', error);
//     return res.status(500).json({
//       message: 'Erro ao deletar produto',
//       error: error.message
//     });
//   }
// };

/**
 * RESUMO DE CONCEITOS:
 * 
 * 1. VALIDAÇÕES
 *    - Validar TODOS os dados de entrada
 *    - Retornar 400 se inválido
 *    - Mensagens de erro claras
 * 
 * 2. STATUS CODES
 *    - 201: Criado (POST bem-sucedido)
 *    - 200: OK (GET, PUT, PATCH bem-sucedido)
 *    - 204: No Content (DELETE bem-sucedido)
 *    - 400: Bad Request (validação falhou)
 *    - 404: Not Found (recurso não existe)
 *    - 500: Internal Server Error (erro no servidor)
 * 
 * 3. RESPOSTAS CONSISTENTES
 *    - Sempre incluir "message"
 *    - Incluir dados relevantes
 *    - Estrutura JSON consistente
 * 
 * 4. TRATAMENTO DE ERROS
 *    - Try-catch em cada função
 *    - Log de erros
 *    - Resposta apropriada ao cliente
 */