import { Request, Response } from 'express';
import { findTicketByTicketTypeId, getTicketsType } from '../factories';
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK } from 'http-status';

async function returnTypesTicket(req: Request, res: Response) {
  try {
    const tickets = await getTicketsType();

    if (tickets.length === 0) return res.status(OK).send([]);

    return res.status(OK).send(tickets);
  } catch (err) {
    return res.sendStatus(500).send(err.message);
  }
}
async function createTicket(req: Request, res: Response) {
  const { ticketTypeId } = req.body;
  try {
    const ticketExist = findTicketByTicketTypeId(ticketTypeId)
    if(!ticketExist) return res.sendStatus(BAD_REQUEST)
    
    return res.status(CREATED).send({});
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export { returnTypesTicket, createTicket };
