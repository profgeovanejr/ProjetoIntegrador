/**
 * controllers/pedidoController.js
 * 
 * Controller de Pedidos
 * Responsável por:
 * - Gerenciar criação de pedidos
 * - Validar itens e estoque
 * - Gerenciar transições de status
 * - Aplicar regras de negócio
 */

/**
 * POST /pedidos
 * Criar novo pedido
 * 
 * Body esperado:
 * {
 *   "items": [
 *     { "produtoId": 1, "quantity": 2 },
 *     { "produtoId": 3, "quantity": 1 }
 *   ]
 * }
 */
exports.criaPedido = (req, res) => {
  try {
    const { items } = req.body;
    // Em produção, viria do middleware de autenticação
    const userId = req.user?.id || 1;

    // ============================================
    // VALIDAÇÕES
    // ============================================

    // Validar items
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: ['Campo "items" deve ser um array']
      });
    }

    if (items.length === 0) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: ['Pedido deve ter pelo menos um item']
      });
    }

    // Validar cada item
    const errors = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item.produtoId) {
        errors.push(`Item ${i + 1}: produtoId é obrigatório`);
      }

      if (!item.quantity || !Number.isInteger(item.quantity) || item.quantity <= 0) {
        errors.push(`Item ${i + 1}: quantity deve ser um número inteiro maior que 0`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors
      });
    }

    // ============================================
    // VALIDAR ESTOQUE (simulado)
    // ============================================
    // Em produção, verificaríamos o banco de dados

    // Simular verificação de estoque
    const stockCheck = [
      { produtoId: 1, available: 10 },
      { produtoId: 2, available: 5 },
      { produtoId: 3, available: 0 }
    ];

    for (let item of items) {
      const stock = stockCheck.find(s => s.produtoId === item.produtoId);

      if (!stock) {
        return res.status(404).json({
          message: 'Produto não encontrado',
          produtoId: item.produtoId
        });
      }

      if (stock.available < item.quantity) {
        // Status 409: Conflict (conflito de negócio)
        return res.status(409).json({
          message: 'Estoque insuficiente',
          produtoId: item.produtoId,
          requested: item.quantity,
          available: stock.available
        });
      }
    }

    // ============================================
    // CALCULAR TOTAL (simulado)
    // ============================================

    const produtos = [
      { id: 1, price: 2500.00 },
      { id: 2, price: 50.00 },
      { id: 3, price: 150.00 }
    ];

    let total = 0;
    const itensPedido = items.map(item => {
      const product = produtos.find(p => p.id === item.produtoId);
      const subtotal = product.price * item.quantity;
      total += subtotal;

      return {
        produtoId: item.produtoId,
        quantity: item.quantity,
        unitPrice: product.price,
        subtotal
      };
    });

    // ============================================
    // CRIAR PEDIDO
    // ============================================

    const novoPedido = {
      id: Math.floor(Math.random() * 100000),
      userId,
      items: itensPedido,
      status: 'CREATED',
      total,
      data_criacao: new Date().toISOString(),
      data_atualizacao: new Date().toISOString()
    };

    // ============================================
    // RESPOSTA COM STATUS 201 (CREATED)
    // ============================================

    return res.status(201).json({
      message: 'Pedido criado com sucesso',
      pedido: novoPedido

    });

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return res.status(500).json({
      message: 'Erro ao criar pedido',
      error: error.message
    });
  }
};

/**
 * GET /pedidos
 * Listar pedidos
 * 
 * Comportamento:
 * - CUSTOMER: vê apenas seus pedidos
 * - ADMIN: vê todos os pedidos
 * 
 * Query parameters (opcionais):
 * - status=CREATED|PAID|SHIPPED|CANCELED
 * - page=1
 * - limit=20
 */
exports.listaPedido = (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    // Em produção, viria do middleware de autenticação
    const userId = req.user?.id || 1;
    const userRole = req.user?.role || 'CUSTOMER';

    // Simular lista de pedidos
    let pedidos = [
      {
        id: 1,
        userId: 1,
        status: 'CREATED',
        total: 2550.00,
        data_criacao: new Date().toISOString()
      },
      {
        id: 2,
        userId: 1,
        status: 'PAID',
        total: 5100.00,
        data_criacao: new Date().toISOString()
      },
      {
        id: 3,
        userId: 2,
        status: 'SHIPPED',
        total: 150.00,
        data_criacao: new Date().toISOString()
      }
    ];

    // ============================================
    // FILTRAR POR PERMISSÃO
    // ============================================

    if (userRole === 'CUSTOMER') {
      // CUSTOMER só vê seus próprios pedidos
      pedidos
 = pedidos
.filter(o => o.userId === userId);
    }
    // ADMIN vê todos (sem filtro)

    // ============================================
    // FILTRAR POR STATUS (se fornecido)
    // ============================================

    if (status) {
      const validStatuses = ['CREATED', 'PAID', 'SHIPPED', 'CANCELED'];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message: 'Status inválido',
          validStatuses
        });
      }

      pedidos = pedidos.filter(o => o.status === status);
    }

    // ============================================
    // APLICAR PAGINAÇÃO
    // ============================================

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedpedidos = pedidos.slice(startIndex, endIndex);

    // ============================================
    // RESPOSTA COM STATUS 200 (OK)
    // ============================================

    return res.status(200).json({
      message: 'Pedidos listados com sucesso',
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: pedidos.length,
        totalPages: Math.ceil(pedidos.length / limitNum)
      },
      pedidos: paginatedpedidos

    });

  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    return res.status(500).json({
      message: 'Erro ao listar pedidos',
      error: error.message
    });
  }
};

/**
 * GET /pedidos
 /:id
 * Detalhar um pedido específico
 * 
 * Regra:
 * - CUSTOMER: só vê se for dono
 * - ADMIN: vê qualquer um
 */
exports.buscaPorId = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 1;
    const userRole = req.user?.role || 'CUSTOMER';

    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID do pedido inválido'
      });
    }

    // Simular busca
    const pedido = {
      id: parseInt(id),
      userId: 1,
      items: [
        {
          produtoId: 1,
          quantity: 1,
          unitPrice: 2500.00,
          subtotal: 2500.00
        }
      ],
      status: 'CREATED',
      total: 2500.00,
      data_criacao: new Date().toISOString(),
      data_atualizacao: new Date().toISOString()
    };

    // Simular pedido não encontrado
    if (parseInt(id) === 999) {
      return res.status(404).json({
        message: 'Pedido não encontrado'
      });
    }

    // ============================================
    // VERIFICAR PERMISSÃO
    // ============================================

    if (userRole === 'CUSTOMER' && pedido.userId !== userId) {
      // Status 403: Forbidden (sem permissão)
      return res.status(403).json({
        message: 'Você não tem permissão para ver este pedido'
      });
    }

    // ============================================
    // RESPOSTA COM STATUS 200 (OK)
    // ============================================

    return res.status(200).json({
      message: 'Pedido encontrado',
      pedido
    });

  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    return res.status(500).json({
      message: 'Erro ao buscar pedido',
      error: error.message
    });
  }
};

/**
 * PATCH /pedidos
 /:id/status
 * Alterar status do pedido
 * 
 * Body esperado:
 * {
 *   "status": "PAID" ou "SHIPPED" ou "CANCELED"
 * }
 * 
 * Regras:
 * - ADMIN: pode alterar para qualquer status válido
 * - CUSTOMER: só pode cancelar se status for CREATED
 */
exports.atualizaPedidoStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?.id || 1;
    const userRole = req.user?.role || 'CUSTOMER';

    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: 'ID do pedido inválido'
      });
    }

    // Validar status
    const validStatuses = ['CREATED', 'PAID', 'SHIPPED', 'CANCELED'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Validação falhou',
        errors: [`Status deve ser um de: ${validStatuses.join(', ')}`]
      });
    }

    // Simular busca do pedido
    const pedido = {
      id: parseInt(id),
      userId: 1,
      status: 'CREATED',
      total: 2500.00
    };

    // Simular pedido não encontrado
    if (parseInt(id) === 999) {
      return res.status(404).json({
        message: 'Pedido não encontrado'
      });
    }

    // ============================================
    // VERIFICAR PERMISSÃO
    // ============================================

    if (userRole === 'CUSTOMER') {
      // CUSTOMER só pode cancelar
      if (status !== 'CANCELED') {
        return res.status(403).json({
          message: 'Você só pode cancelar pedidos'
        });
      }

      // CUSTOMER só pode cancelar se status for CREATED
      if (pedido.status !== 'CREATED') {
        return res.status(409).json({
          message: 'Só é possível cancelar pedidos em status CREATED',
          currentStatus: pedido.status
        });
      }
    }

    // ============================================
    // VALIDAR TRANSIÇÃO DE STATUS
    // ============================================

    // Não permitir alterar pedido CANCELED
    if (pedido.status === 'CANCELED') {
      return res.status(409).json({
        message: 'Não é possível alterar pedido cancelado'
      });
    }

    // Validar transições válidas (ADMIN)
    if (userRole === 'ADMIN') {
      const validTransitions = {
        'CREATED': ['PAID', 'CANCELED'],
        'PAID': ['SHIPPED', 'CANCELED'],
        'SHIPPED': [],
        'CANCELED': []
      };

      const allowed = validTransitions[pedido.status];
      if (!allowed.includes(status)) {
        return res.status(409).json({
          message: `Transição inválida de ${pedido.status} para ${status}`,
          currentStatus: pedido.status,
          validTransitions: allowed
        });
      }
    }

    // ============================================
    // ATUALIZAR STATUS
    // ============================================

    const atualizaPedido = {
      id: parseInt(id),
      status,
      data_atualizacao: new Date().toISOString()
    };

    // ============================================
    // RESPOSTA COM STATUS 200 (OK)
    // ============================================

    return res.status(200).json({
      message: 'Status do pedido atualizado com sucesso',
      pedido: atualizaPedido
    });

  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    return res.status(500).json({
      message: 'Erro ao atualizar status do pedido',
      error: error.message
    });
  }
};

/**
 * RESUMO DE CONCEITOS:
 * 
 * 1. VALIDAÇÕES COMPLEXAS
 *    - Validar estrutura de dados
 *    - Validar relacionamentos (estoque, produtos)
 *    - Validar regras de negócio
 * 
 * 2. CONFLITOS DE NEGÓCIO
 *    - Status 409: Conflict
 *    - Exemplo: estoque insuficiente
 *    - Exemplo: transição de status inválida
 * 
 * 3. AUTORIZAÇÃO
 *    - Status 403: Forbidden
 *    - Verificar permissões do usuário
 *    - CUSTOMER vs ADMIN
 * 
 * 4. TRANSIÇÕES DE ESTADO
 *    - Validar transições permitidas
 *    - Impedir operações em estados finais
 *    - Comunicar transições válidas
 * 
 * 5. CÁLCULOS
 *    - Calcular totais
 *    - Capturar preços no momento do pedido
 *    - Aplicar regras de negócio
 */