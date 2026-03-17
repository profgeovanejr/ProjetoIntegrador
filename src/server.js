/**
 * server.js
 * 
 * Arquivo de inicialização do servidor
 * Responsável por:
 * - Importar a aplicação
 * - Definir porta
 * - Iniciar o servidor
 */

const app = require('./app');

// ============================================
// CONFIGURAÇÃO
// ============================================

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// ============================================
// INICIAR SERVIDOR
// ============================================

const server = app.listen(PORT, HOST, () => {
  console.log(`╔════════════════════════════════════════╗`);
  console.log(`║  Desenvolvimento Back-End com Node.js  ║`);
  console.log(`║  Servidor iniciado com sucesso!        ║`);
  console.log(`╚════════════════════════════════════════╝`);
  console.log(`\n📍 Servidor rodando em: http://${HOST}:${PORT}`);
  console.log(`\n🔗 Endpoints disponíveis:\n`);
  console.log(`  PRODUTOS:`);
  console.log(`    POST   /produtos              - Criar produto`);
  console.log(`    GET    /produtos              - Listar produtos`);
  console.log(`    GET    /produtos/:id          - Detalhar produto`);
  console.log(`    PUT    /produtos/:id          - Atualizar produto`);
  console.log(`    PATCH  /produtos/:id/ativo    - Ativar/desativar`);
  console.log(`    PATCH  /produtos/:id/estoque  - Ajustar estoque`);
  console.log(`    DELETE /produtos/:id          - Deletar produto`);
  console.log(`\n  PEDIDOS:`);
  console.log(`    POST   /pedidos                - Criar pedido`);
  console.log(`    GET    /pedidos                - Listar pedidos`);
  console.log(`    GET    /pedidos/:id            - Detalhar pedido`);
  console.log(`    PATCH  /pedidos/:id/status     - Alterar status`);
  console.log(`\n  SAÚDE:`);
  console.log(`    GET    /                      - Health check`);
  console.log(`\n💡 Dica: Use Postman ou Insomnia para testar os endpoints!\n`);
});

// ============================================
// TRATAMENTO DE SINAIS
// ============================================

process.on('SIGTERM', () => {
  console.log('\n⚠️  SIGTERM recebido. Encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT recebido. Encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado');
    process.exit(0);
  });
});

/**
 * COMO USAR:
 * 
 * 1. Instalar dependências:
 *    npm install express
 * 
 * 2. Iniciar servidor:
 *    node server.js
 * 
 * 3. Testar endpoints:
 *    - Abrir Postman ou utilizar plugin Thunder Client no VSCode
 *    - Criar requisições para http://localhost:3000
 *    - Exemplos nos comentários acima
 * 
 * 4. Parar servidor:
 *    Ctrl + C
 */