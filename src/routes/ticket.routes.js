// ticket.routes.js
import { Router } from "express";
import * as ticketController from '../controllers/ticket.controller.js';

const ticketRouter = Router();

ticketRouter.get('/tickets', ticketController.getTickets);
ticketRouter.get('/tickets/:ticketId', ticketController.getTicketById);
ticketRouter.post('/tickets', ticketController.addTicket);

export default ticketRouter;
