import { ticketDAO } from "../dao/ticket/index.js";

export const getTickets = async (req, res, next) => {
    try {
        const tickets = await ticketDAO.getTickets(); 
        res.json({ tickets }); 
    } catch (error) {
        res.json({ error: error.message }); 
    }
};

export const getTicketById = async (req, res, next) => {
    try {
        const { ticketId } = req.params; 
        const ticket = await ticketDAO.getTicketById(ticketId); 
        if (!ticket) {
            throw new Error('TICKET NOT FOUND'); 
        }
        res.json({ ticket }); 
    } catch (error) {
        res.json({ error: error.message }); 
    }
};

export const addTicket = async (req, res, next) => {
    try {
        const ticketData = req.body; 
        const newTicket = await ticketDAO.addTicket(ticketData); 
        res.json({ message: 'Successfully add ticket', ticket: newTicket }); 
    } catch (error) {
        res.json({ error: error.message }); 
    }
};

export const deleteTicket = async (req, res, next) => {
    try {
        const { ticketId } = req.params; 
        const deletedTicket = await ticketDAO.deleteTicket(ticketId); 
        if (!deletedTicket) {
            throw new Error('TICKET NOT FOUND'); 
        }
        res.json({ message: 'Successfully delete ticket' }); 
    } catch (error) {
        res.json({ error: error.message }); 
    }
};

