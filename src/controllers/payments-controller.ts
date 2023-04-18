import { prisma } from '@/config';
import httpStatus from 'http-status';
import { Request, Response } from 'express';

export async function processPayment(req: Request, res: Response) {
  const { ticketId, cardData } = req.body;

  if (!ticketId || !cardData) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const paymentValue = await prisma.ticketType.findUnique({
    where: { id: Number(ticketId) },
  });

  if (!paymentValue) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

  try {
    const payment = await prisma.payment.create({
      data: {
        ticketId: Number(ticketId),
        value: paymentValue.price,
        cardIssuer: cardData.issuer,
        cardLastDigits: cardData.number.toString().slice(-4),
      },
    });

    return res.json(payment);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getPaymentByTicketId(req: Request, res: Response) {
    const { ticketId } = req.params;
  
    if (!ticketId) {
      return res.status(httpStatus.BAD_REQUEST).send();
    }
  
    const payment = await prisma.payment.findUnique({
      where: { id: Number(ticketId) },
    });
  
    if (!payment) {
      return res.status(httpStatus.NOT_FOUND).send();
    }
    const returnable = { 
            id: payment.id,
            ticketId: payment.ticketId,
            value: payment.value,
            cardIssuer: payment.cardIssuer,
            cardLastDigits: payment.cardLastDigits,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
    }
    return res.status(httpStatus.OK).send();
  }