
import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
// Import the ApolloServer class
import {
  ApolloServer,
} from '@apollo/server';
import {
  expressMiddleware
} from '@apollo/server/express4';
import { authenticateToken } from './services/auth.js';
import { typeDefs, resolvers } from './schema/index.js';
import db from './config/connection.js';
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const app = express();

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  await db;
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
  
      if (!token) {
        console.error('No token provided');
        return { user: null };
      }
  
      try {
        const user = authenticateToken(token); // Verify the token
        return { user };
      } catch (err) {
        console.error('Error authenticating token:', err);
        return { user: null };
      }
    },
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};
// Call the async function to start the server
startApolloServer();