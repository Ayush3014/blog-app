import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.post('/api/v1/user/signup', (c) => {
  return c.text('Sign Up');
});

app.post('/api/v1/user/signin', (c) => {
  return c.text('Sign In');
});

app.post('/api/v1/blog', (c) => {
  return c.text('Blog');
});

app.put('/api/v1/blog', (c) => {
  return c.text('Update blog');
});

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('All blogs');
});

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id');
  return c.text('Blog with id: ' + id);
});

export default app;
