import { createTicket, returnTypesTicket } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketRouter = Router();

ticketRouter
    .all('/*', authenticateToken)
    .get('/')
    .get('/types', returnTypesTicket)
    .post('/', createTicket);
export { ticketRouter };
