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
 *   "name": "Notebook",
 *   "price": 2500.00,
 *   "stock": 10,
 *   "description": "Notebook para desenvolvimento" (opcional)
 * }
 */
exports.create = (req, res) => {
  try {
    const { name, price, stock, description } = req.body;
    
    // ============================================
    // VALIDAÇÕES
    // ============================================
    
    // Validar nome
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: ['Nome do produto é obrigatório']
      });
    }
    
    if (name.trim().length < 3) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: ['Nome deve ter pelo menos 3 caracteres']
      });
    }
    
    // Validar preço
    if (price === undefined || price === null) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: ['Preço é obrigatório']
      });
    }
    
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: ['Preço deve ser um número maior que 0']
      });
    }
    
    // Validar estoque
    if (stock === undefined || stock === null) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: ['Estoque é obrigatório']
      });
    }
    
    if (!Number.isInteger(stock) || stock < 0) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: ['Estoque deve ser um número inteiro não-negativo']
      });
    }
    
    // ============================================
    // CRIAR PRODUTO (simulado, sem banco)
    // ============================================
    
    const criarProduto = {
      id: Math.floor(Math.random() * 100000),
      name: name.trim(),
      price,
      stock,
      description: description || null,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // ============================================
    // RESPOSTA COM STATUS 201 (CREATED)
    // ============================================
    
    return res.status(201).json({
      message: 'Produto criado com sucesso',
      product: criarProduto
    });
    
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return res.status(500).json({
      message: 'Erro ao criar produto',
      error: error.message
    });
  }
};

/**
 * GET /produtos
 * Listar todos os produtos
 * 
 * Query parameters (opcionais):
 * - active=true|false
 * - page=1
 * - limit=20
 */
exports.list = (req, res) => {
  try {
    const { active, page = 1, limit = 20 } = req.query;
    
    // Simular lista de produtos
    let produtos = [
      {
        id: 1,
        name: 'Notebook Dell',
        price: 2500.00,
        stock: 10,
        active: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Mouse Logitech',
        price: 50.00,
        stock: 100,
        active: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Teclado Mecânico',
        price: 150.00,
        stock: 0,
        active: false,
        createdAt: new Date().toISOString()
      }
    ];
    
    // Filtrar por active se fornecido
    if (active !== undefined) {
      const isActive = active === 'true';
      produtos = produtos.filter(p => p.active === isActive);
    }
    
    // Aplicar paginação
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedProducts = produtos.slice(startIndex, endIndex);
    
    // ============================================
    // RESPOSTA COM STATUS 200 (OK)
    // ============================================
    
    return res.status(200).json({
      message: 'Produtos listados com sucesso',
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: produtos.length,
        totalPages: Math.ceil(produtos.length / limitNum)
      },
      produtos: paginatedProducts
    });
    
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    return res.status(500).json({
      message: 'Erro ao listar produtos',
      error: error.message
    });
  }
};

/**
 * GET /produtos/:id
 * Detalhar um produto específico
 */
exports.findById = (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID do produto inválido'
      });
    }
    
    // Simular busca
    const product = {
      id: parseInt(id),
      name: 'Notebook Dell',
      price: 2500.00,
      stock: 10,
      description: 'Notebook para desenvolvimento',
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Simular produto não encontrado
    if (parseInt(id) === 999) {
      return res.status(404).json({
        message: 'Produto não encontrado'
      });
    }
    
    // ============================================
    // RESPOSTA COM STATUS 200 (OK)
    // ============================================
    
    return res.status(200).json({
      message: 'Produto encontrado',
      product
    });
    
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return res.status(500).json({
      message: 'Erro ao buscar produto',
      error: error.message
    });
  }
};

/**
 * PUT /produtos/:id
 * Atualizar produto COMPLETO
 * 
 * Body esperado (todos os campos obrigatórios):
 * {
 *   "name": "Novo nome",
 *   "price": 3000.00,
 *   "stock": 20,
 *   "description": "Nova descrição"
 * }
 */
exports.update = (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, description } = req.body;
    
    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID do produto inválido'
      });
    }
    
    // ============================================
    // VALIDAÇÕES (mesmas de create)
    // ============================================
    
    const errors = [];
    
    if (!name || !name.trim()) {
      errors.push('Nome do produto é obrigatório');
    }
    
    if (!price || typeof price !== 'number' || price <= 0) {
      errors.push('Preço deve ser um número maior que 0');
    }
    
    if (stock === undefined || !Number.isInteger(stock) || stock < 0) {
      errors.push('Estoque deve ser um número inteiro não-negativo');
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors
      });
    }
    
    // Simular produto não encontrado
    if (parseInt(id) === 999) {
      return res.status(404).json({
        message: 'Produto não encontrado'
      });
    }
    
    // ============================================
    // ATUALIZAR PRODUTO (simulado)
    // ============================================
    
    const updatedProduct = {
      id: parseInt(id),
      name: name.trim(),
      price,
      stock,
      description: description || null,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // ============================================
    // RESPOSTA COM STATUS 200 (OK)
    // ============================================
    
    return res.status(200).json({
      message: 'Produto atualizado com sucesso',
      product: updatedProduct
    });
    
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return res.status(500).json({
      message: 'Erro ao atualizar produto',
      error: error.message
    });
  }
};

/**
 * PATCH /produtos/:id/active
 * Ativar ou desativar um produto
 * 
 * Body esperado:
 * {
 *   "active": true ou false
 * }
 */
exports.updateActive = (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    
    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID do produto inválido'
      });
    }
    
    // Validar campo active
    if (typeof active !== 'boolean') {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: ['Campo "active" deve ser true ou false']
      });
    }
    
    // Simular produto não encontrado
    if (parseInt(id) === 999) {
      return res.status(404).json({
        message: 'Produto não encontrado'
      });
    }
    
    // ============================================
    // ATUALIZAR APENAS O CAMPO active
    // ============================================
    
    const updatedProduct = {
      id: parseInt(id),
      active,
      updatedAt: new Date().toISOString()
    };
    
    // ============================================
    // RESPOSTA COM STATUS 200 (OK)
    // ============================================
    
    return res.status(200).json({
      message: 'Status do produto atualizado com sucesso',
      product: updatedProduct
    });
    
  } catch (error) {
    console.error('Erro ao atualizar status do produto:', error);
    return res.status(500).json({
      message: 'Erro ao atualizar status do produto',
      error: error.message
    });
  }
};

/**
 * PATCH /produtos/:id/stock
 * Ajustar estoque de um produto
 * 
 * Body esperado:
 * {
 *   "quantity": 50
 * }
 */
exports.updateStock = (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID do produto inválido'
      });
    }
    
    // Validar quantidade
    if (quantity === undefined || !Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: ['Quantidade deve ser um número inteiro não-negativo']
      });
    }
    
    // Simular produto não encontrado
    if (parseInt(id) === 999) {
      return res.status(404).json({
        message: 'Produto não encontrado'
      });
    }
    
    // ============================================
    // ATUALIZAR APENAS O CAMPO stock
    // ============================================
    
    const updatedProduct = {
      id: parseInt(id),
      stock: quantity,
      updatedAt: new Date().toISOString()
    };
    
    // ============================================
    // RESPOSTA COM STATUS 200 (OK)
    // ============================================
    
    return res.status(200).json({
      message: 'Estoque atualizado com sucesso',
      product: updatedProduct
    });
    
  } catch (error) {
    console.error('Erro ao atualizar estoque:', error);
    return res.status(500).json({
      message: 'Erro ao atualizar estoque',
      error: error.message
    });
  }
};

/**
 * DELETE /produtos/:id
 * Deletar um produto
 */
exports.remove = (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID do produto inválido'
      });
    }
    
    // Simular produto não encontrado
    if (parseInt(id) === 999) {
      return res.status(404).json({
        message: 'Produto não encontrado'
      });
    }
    
    // ============================================
    // DELETAR PRODUTO (simulado)
    // ============================================
    
    // ============================================
    // RESPOSTA COM STATUS 204 (NO CONTENT)
    // Sucesso sem conteúdo no corpo
    // ============================================
    
    return res.status(204).send();
    
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return res.status(500).json({
      message: 'Erro ao deletar produto',
      error: error.message
    });
  }
};

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