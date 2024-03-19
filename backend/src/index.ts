import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';

// passing database url type as a generic to access it in context (c)
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: 'Error while signing up' });
  }
});

app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: 'User not found!' });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('All blogs');
});

// middleware verifying the token
app.use('/api/v1/blog/*', async (c, next) => {
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

// add middleware here, user posts a blog
app.post('/api/v1/blog', (c) => {
  console.log(c.get('userId'));
  return c.text('Blog');
});

// add middleware here, user updates a blog
app.put('/api/v1/blog', (c) => {
  console.log(c.get('userId'));
  return c.text('Update blog');
});

// add middleware here, user gets a blog with a specific id
app.get('/api/v1/blog/:id', (c) => {
  console.log(c.get('userId'));
  const id = c.req.param('id');
  return c.text('Blog with id: ' + id);
});

export default app;
