import { getPaymentByTicketId, processPayment } from '@/controllers/payments-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const paymentRouter = Router();

paymentRouter
    .all("/*", authenticateToken)
    .get('/', getPaymentByTicketId)
    .post('/process', processPayment)
export { paymentRouter };
