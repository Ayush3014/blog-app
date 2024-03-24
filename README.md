
# Blog App
[Deployed using Vercel](https://blog-app-ayush-3014.vercel.app/signup)

## Stack

1. **Frontend**: React with Vite  
2. **Backend**: Cloudflare Workers with Hono.js framework
3. **Validation Library**: Zod (deployed to npm), providing type inference for frontend types
4. **Language**: TypeScript
5. **ORM**: Prisma
6. **Database**: Postgres
7. **Authentication**: JWT

## Features

- Signup: Register as a new user.
- Signin: Log in to your account.
- View All Posts: See all posts created by all users.
- View Specific Post: Read a specific post in detail.
- Publish a Post: Create and publish new posts.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ayush3014/blog-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd blog-app
   ```

3. Install dependencies for each folder:
   ```bash
   cd backend
   npm install

   cd ../common
   npm install

   cd ../frontend
   npm install
   ```

4. **Frontend Setup**:
   - The frontend is built with React using Vite.
   - Update the `config.ts` file in the `frontend` folder with the corresponding backend URL (localhost or Cloudflare URL).

5. **Backend Setup**:
   - In the `backend` folder, modify the `wrangler.toml` and `.env` files to configure the database URL. If you have a local PostgreSQL database available, set the URL accordingly. Otherwise, use the online PostgreSQL database URL.
   - Optionally, deploy the backend to Cloudflare Workers after changing the environment variables.
   - If running locally, make sure to start the backend server.

6. Once both frontend and backend are set up, you can run the application locally.

