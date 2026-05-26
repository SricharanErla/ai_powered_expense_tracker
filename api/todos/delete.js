import { prisma } from '../utils/prisma.js';
import { allowCors, readRequestBody, sendJson } from '../utils/helpers.js';

export default async function handler(req, res) {
  if (allowCors(req, res)) {
    return;
  }

  if (req.method !== 'DELETE') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const body = readRequestBody(req);
  if (!body.id) {
    return sendJson(res, 400, { error: 'Todo id is required' });
  }

  await prisma.todo.delete({ where: { id: body.id } });
  return sendJson(res, 200, { ok: true });
}