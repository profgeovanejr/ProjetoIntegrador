require('dotenv').config();
const pool = require('./src/config/database');

async function testarConexao() {
  console.log('🔄 Tentando conectar ao MySQL...');
  console.log('   Host:', process.env.DB_HOST);
  console.log('   User:', process.env.DB_USER);
  console.log('   DB:  ', process.env.DB_NAME);
  console.log('   Port:', process.env.DB_PORT || 3306);

  try {
    // Testa se consegue pegar uma conexão do pool
    const connection = await pool.getConnection();
    console.log('\n✅ Conexão estabelecida com sucesso!');

    // Executa uma query simples para confirmar
    const [rows] = await connection.query('SELECT NOW() AS hora_atual');
    console.log('🕐 Hora do servidor MySQL:', rows[0].hora_atual);

    // Devolve a conexão ao pool
    connection.release();
    console.log('🔁 Conexão devolvida ao pool.');

    // Testa se a tabela produtos existe
    const [tabelaProdutos] = await pool.query('SHOW TABLES LIKE "produtos"');

    if (tabelaProdutos.length > 0) {
      console.log('📋 Tabela produtos: ✅ encontrada');
    } else {
      console.log('📋 Tabela produtos: ⚠️ não encontrada — rode o CREATE TABLE');
    }

    // Testa se a tabela pedidos existe
    const [tabelaPedidos] = await pool.query('SHOW TABLES LIKE "pedidos"');

    if (tabelaPedidos.length > 0) {
      console.log('📋 Tabela pedidos: ✅ encontrada');
    } else {
      console.log('📋 Tabela pedidos: ⚠️ não encontrada — rode o CREATE TABLE');
    }

    // Testa se a tabela clientes existe
    const [tabelaCliente] = await pool.query('SHOW TABLES LIKE "clientes"');

    if (tabelaCliente.length > 0) {
      console.log('📋 Tabela clientes: ✅ encontrada');
    } else {
      console.log('📋 Tabela clientes: ⚠️ não encontrada — rode o CREATE TABLE');
    }

  } catch (error) {
    console.error('\n❌ Falha na conexão!');
    console.error('   Erro:', error.message);
    console.error('\n💡 Verifique:');
    console.error('   - O MySQL está rodando?');
    console.error('   - As credenciais no .env estão corretas?');
    console.error('   - O banco "' + process.env.DB_NAME + '" existe?');
  } finally {
    // Encerra o pool para o processo terminar
    await pool.end();
    console.log('\n🔌 Pool encerrado.');
  }
}

testarConexao();