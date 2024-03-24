import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

// passing database url type as a generic to access it in context (c)
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use('/*', cors({
  origin: "https://blog-app-six-sand.vercel.app"
}));
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app;
