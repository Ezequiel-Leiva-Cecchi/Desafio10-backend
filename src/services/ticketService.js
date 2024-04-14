import { ticketDAO } from "../dao/ticket/index.js";

export const generateTicket = async (ticketData) => {
  try {
    const ticket = await ticketDAO.createTicket(ticketData);
    return ticket;
  } catch (error) {
    throw new Error(error.message);
  }
};