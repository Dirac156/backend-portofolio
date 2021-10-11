import { Router } from 'express';
import { CreateWorker } from '../controller/workerController';

const router = Router();

router.post('/worker', CreateWorker);

export default router;