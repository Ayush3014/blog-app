import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { createPostInput, updatePostInput } from '@ayush3014/common-app';

// passing database url type as a generic to access it in context (c)
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ posts });
  } catch (error) {
    c.status(403);
    return c.json({ error: 'Failed to fetch the blogs' });
  }
});

// middleware verifying the token
blogRouter.use('/*', async (c, next) => {
  const jwt = c.req.header('Authorization');
  if (!jwt) {
    c.status(401);
    return c.json({ error: 'Unauthorized' });
  }

  const token = jwt.split(' ')[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: 'Unauthorized' });
  }

  c.set('userId', payload.id);

  await next();
});

// middleware here, user posts a blog
blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get('userId');
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: 'Invalid input' });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({ id: post.id });
  } catch (error) {
    c.status(403);
    return c.json({ error: 'Failed to post the blog' });
  }
});

// add middleware here, user updates a blog
blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId');
  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: 'Invalid inputs!' });
  }

  try {
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.text('Post updated');
  } catch (error) {
    c.status(403);
    return c.json({ error: 'Failed to update the blog' });
  }
});

// add middleware here, user gets a blog with a specific id
blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    return c.json({ blog });
  } catch (error) {
    c.status(403);
    return c.json({ error: 'Failed to get the blog' });
  }
});
