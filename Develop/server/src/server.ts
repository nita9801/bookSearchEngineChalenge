import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import routes from './routes/index.js';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './schema/typeDefs.js';
import  resolvers  from './schema/resolvers.js';
import { ApolloServer } from '@apollo/server';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(cors({ origin: 'http://localhost:3000' }));

// Serve the `index.html` file from the root of the client directory
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});
// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, '../../client/build')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
console.log('Serving static files from:', path.join(__dirname, '../client/build'));

const startApolloServer = async () => {
  await server.start();
  await db();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => {
      // Add authentication or other context logic here
      return { token: req.headers.authorization || '' };
    },
  })
);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});
}

startApolloServer();