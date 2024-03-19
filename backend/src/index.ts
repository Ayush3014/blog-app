import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

// passing database url type as a generic to access it in context (c)
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app;
