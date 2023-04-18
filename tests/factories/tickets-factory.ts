import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

export async function createTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: faker.datatype.boolean(),
      includesHotel: faker.datatype.boolean(),
    },
  });
}

export async function findTicketsType() {
  return await prisma.ticketType.findMany();
}
export async function findTicketsTypeById(id: number) {
  return await prisma.ticketType.findFirst({ where: { id } });
}
export async function findTicketsTypeByEnrollmentId(id: number) {
  return await prisma.ticket.findFirst({where: {enrollmentId: id}})
}
export async function findTicketByTicketTypeId(id: number) {
  return await prisma.ticket.findFirst({ where: {ticketTypeId: id} });
}

export async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}
