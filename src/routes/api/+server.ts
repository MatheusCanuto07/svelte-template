import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    return new Response("Hello world");
};

export const POST: RequestHandler = async () => {
  return new Response("Hello world");
};

export const DELETE: RequestHandler = async () => {
  return new Response("Hello world");
};

export const PUT: RequestHandler = async () => {
  return new Response("Hello world");
};