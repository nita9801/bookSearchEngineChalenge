import { Router, Request, Response } from 'express'; 
import apiRoutes from './api/index.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use('/api', apiRoutes);

// front-end in production
router.use((_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

export default router;
