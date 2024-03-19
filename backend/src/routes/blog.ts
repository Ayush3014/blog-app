import { Hono } from 'hono';
import { verify } from 'hono/jwt';

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

blogRouter.get('/bulk', (c) => {
  return c.text('All blogs');
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

// add middleware here, user posts a blog
blogRouter.post('/', (c) => {
  console.log(c.get('userId'));
  return c.text('Blog');
});

// add middleware here, user updates a blog
blogRouter.put('/', (c) => {
  console.log(c.get('userId'));
  return c.text('Update blog');
});

// add middleware here, user gets a blog with a specific id
blogRouter.get('/:id', (c) => {
  console.log(c.get('userId'));
  const id = c.req.param('id');
  return c.text('Blog with id: ' + id);
});
