import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const paymentRouter = Router();

paymentRouter
    .all("/*", authenticateToken)
    .get('/', )
    .post('/process', )
export { paymentRouter };
