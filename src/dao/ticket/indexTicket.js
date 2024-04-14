import { TicketMongoose } from "./ticket.mongoose.js";

let ticketDAO;

const DAO_OPTION = process.env.DAO_OPTION;

switch(DAO_OPTION) {
  case 'mongoose':
    ticketDAO = new TicketMongoose();
    break;
  // Puedes agregar más casos según sea necesario para otros DAO
  default:
    ticketDAO = new TicketMongoose();
}

export { ticketDAO };
