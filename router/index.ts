import { Router } from 'express';
import { CreateWorker } from '../controller/workerController';

const router = Router();

router.get('/worker', CreateWorker);

export default router;