import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));

const client = spawn(process.execPath, [resolve(root, 'node_modules/vite/bin/vite.js'), '--config', resolve(root, 'frontend/vite.config.js')], {
  stdio: 'inherit',
  shell: false
});

const api = spawn(process.execPath, [resolve(root, 'scripts/local-api-server.mjs')], {
  stdio: 'inherit',
  shell: false
});

const shutdown = () => {
  client.kill();
  api.kill();
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

client.on('exit', (code) => {
  api.kill();
  process.exit(code ?? 0);
});

api.on('exit', (code) => {
  client.kill();
  process.exit(code ?? 0);
});