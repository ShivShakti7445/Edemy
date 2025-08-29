import express from 'express';
import { checkDBConnection } from '../controllers/healthCheckController.js';

const healthCheckRouter = express.Router();

healthCheckRouter.get('/', checkDBConnection);

export default healthCheckRouter;
