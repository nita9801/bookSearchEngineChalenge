import { Router, Request, Response } from 'express'; // Import Router
import apiRoutes from './api/index.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define your routes here
  router.get('/example', (_req, res) => {
  res.send('Example route');
});
router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

export default router;
