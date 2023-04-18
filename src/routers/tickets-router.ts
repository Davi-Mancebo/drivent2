import { createNewTicket, findUserTicket, returnTypesTicket } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketRouter = Router();

ticketRouter
    .all('/*', authenticateToken)
    .get('/', findUserTicket)
    .get('/types', returnTypesTicket)
    .post('/', createNewTicket);
export { ticketRouter };
