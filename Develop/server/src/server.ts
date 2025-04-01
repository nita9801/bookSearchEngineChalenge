import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import  typeDefs  from './schema/typeDefs.js';
import  resolvers  from './schema/resolvers.js';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => {
      // Add any context logic here (e.g., authentication)
      return { token: req.headers.authorization };
    },
  })
);

// Serve the `index.html` file from the root of the client directory
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});