const fs = require('fs');
const path = require('path');

const dirs = [
  path.join('src'),
  path.join('src', 'routes'),
  path.join('src', 'controllers'),
  path.join('src', 'middlewares'),
];

const files = [
  path.join('src', 'app.js'),
  path.join('src', 'server.js'),
  path.join('src', 'routes', 'index.js'),
  path.join('src', 'routes', 'product.routes.js'),
  path.join('src', 'controllers', 'product.controller.js'),
  path.join('src', 'middlewares', 'requestLogger.js'),
];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

for (const file of files) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, '', { encoding: 'utf8' });
}

console.log('✅ Estrutura criada com sucesso!');
