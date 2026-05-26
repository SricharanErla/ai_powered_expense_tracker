import { prisma } from '../utils/prisma.js';
import { allowCors, readRequestBody, sendJson, serializeTodo, todoSchema } from '../utils/helpers.js';

export default async function handler(req, res) {
  if (allowCors(req, res)) {
    return;
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const body = todoSchema.parse(readRequestBody(req));
  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      description: body.description || null,
      dueDate: new Date(body.dueDate),
      status: body.status,
      priority: body.priority
    }
  });

  return sendJson(res, 201, { todo: serializeTodo(todo) });
}