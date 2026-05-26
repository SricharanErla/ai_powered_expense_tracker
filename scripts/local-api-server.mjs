import { createServer } from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const routeMap = new Map([
  ['/api/expenses/getAll', './api/expenses/getAll.js'],
  ['/api/expenses/create', './api/expenses/create.js'],
  ['/api/expenses/update', './api/expenses/update.js'],
  ['/api/expenses/delete', './api/expenses/delete.js'],
  ['/api/todos/getAll', './api/todos/getAll.js'],
  ['/api/todos/create', './api/todos/create.js'],
  ['/api/todos/update', './api/todos/update.js'],
  ['/api/todos/delete', './api/todos/delete.js'],
  ['/api/analytics/insights', './api/analytics/insights.js']
]);

const toNodeRequest = async (req) => {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  const parsedUrl = new URL(req.url, 'http://localhost:3000');
  let body = rawBody;

  if (rawBody) {
    try {
      body = JSON.parse(rawBody);
    } catch {
      body = rawBody;
    }
  }

  return {
    method: req.method,
    url: req.url,
    headers: req.headers,
    query: Object.fromEntries(parsedUrl.searchParams.entries()),
    body
  };
};

const createResponse = (res) => {
  const response = {
    statusCode: 200,
    headers: {},
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(name, value) {
      this.headers[name] = value;
      return this;
    },
    json(payload) {
      if (!this.headers['Content-Type']) {
        this.headers['Content-Type'] = 'application/json';
      }
      res.writeHead(this.statusCode, this.headers);
      res.end(JSON.stringify(payload));
      return this;
    },
    end(payload = '') {
      res.writeHead(this.statusCode, this.headers);
      res.end(payload);
      return this;
    }
  };

  return response;
};

const server = createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, 'http://localhost:3000');
  const routePath = parsedUrl.pathname;
  const modulePath = routeMap.get(routePath);

  if (!modulePath) {
    res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  try {
    const module = await import(pathToFileURL(resolve(root, modulePath)).href);
    const handler = module.default;

    if (typeof handler !== 'function') {
      throw new Error(`Handler missing for ${routePath}`);
    }

    const request = await toNodeRequest(req);
    const response = createResponse(res);
    await handler(request, response);
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({ error: error.message || 'Internal server error' }));
  }
});

server.listen(3000, () => {
  console.log('Local API server running on http://localhost:3000');
});