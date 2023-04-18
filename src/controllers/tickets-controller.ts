import { Request, Response } from 'express';
import {
  findTicketByTicketTypeId,
  findEnrollmentByUserId,
  findTicketsType,
  findTicketsTypeById,
  findTicketsTypeByEnrollmentId,
} from '../factories';
import httpStatus from 'http-status';
import { createTicket } from '../factories';

async function returnTypesTicket(req: Request, res: Response) {
  try {
    const tickets = await findTicketsType();

    if (tickets.length === 0) return res.status(httpStatus.OK).send([]);

    return res.status(httpStatus.OK).send(tickets);
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}
async function createNewTicket(req: Request, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = res.locals;
  try {
    if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);
    const ticketExist = await findTicketsTypeById(ticketTypeId);
    if (!ticketExist) return res.sendStatus(httpStatus.NOT_FOUND);

    const createTct = await createTicket(userId, ticketTypeId, 'RESERVED');
    const returnableObject = {
      id: createTct.id,
      status: createTct.status, //RESERVED | PAID
      ticketTypeId: createTct.ticketTypeId,
      enrollmentId: createTct.enrollmentId,
      TicketType: {
        id: ticketExist.id,
        name: ticketExist.name,
        price: ticketExist.price,
        isRemote: ticketExist.isRemote,
        includesHotel: ticketExist.includesHotel,
        createdAt: ticketExist.createdAt,
        updatedAt: ticketExist.updatedAt,
      },
      createdAt: createTct.createdAt,
      updatedAt: createTct.updatedAt,
    };

    return res.status(httpStatus.CREATED).send(returnableObject);
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

async function findUserTicket(req: Request, res: Response) {
  const { userId } = res.locals;
  try {
    const enrollment = await findEnrollmentByUserId(userId);
    if (!enrollment) return res.sendStatus(httpStatus.NOT_FOUND);
    const ticket = await findTicketsTypeByEnrollmentId(enrollment.id);
    if (!ticket) return res.sendStatus(httpStatus.NOT_FOUND);
    const ticketType = await findTicketsTypeById(ticket.id);

    const returnable = {
      id: ticket.id,
      status: ticket.status, //RESERVED | PAID
      ticketTypeId: ticket.ticketTypeId,
      enrollmentId: ticket.enrollmentId,
      TicketType: {
        id: ticketType.id,
        name: ticketType.name,
        price: ticketType.price,
        isRemote: ticketType.isRemote,
        includesHotel: ticketType.includesHotel,
        createdAt: ticketType.createdAt,
        updatedAt: ticketType.updatedAt,
      },
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    };
    return res.status(httpStatus.OK).send(returnable);
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export { returnTypesTicket, createNewTicket, findUserTicket };
