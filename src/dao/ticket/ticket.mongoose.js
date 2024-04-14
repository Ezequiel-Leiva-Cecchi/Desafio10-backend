import { ticketModel } from "../../models/ticket.model.js";

export class TicketMongoose {
  async createTicket(ticketData) {
    const ticket = new ticketModel(ticketData);
    await ticket.save();
    return ticket.toObject({ virtuals: true });
  }

  async getTicketById(id) {
    return await ticketModel.findOne({ _id: id }).lean({ virtuals: true });
  }
}