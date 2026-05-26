import { prisma } from '../utils/prisma.js';
import { allowCors, readRequestBody, sendJson, serializeTodo, todoSchema } from '../utils/helpers.js';

export default async function handler(req, res) {
  if (allowCors(req, res)) {
    return;
  }

  if (req.method !== 'PUT') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const body = todoSchema.parse(readRequestBody(req));
  if (!body.id) {
    return sendJson(res, 400, { error: 'Todo id is required' });
  }

  const todo = await prisma.todo.update({
    where: { id: body.id },
    data: {
      title: body.title,
      description: body.description || null,
      dueDate: new Date(body.dueDate),
      status: body.status,
      priority: body.priority
    }
  });

  return sendJson(res, 200, { todo: serializeTodo(todo) });
}