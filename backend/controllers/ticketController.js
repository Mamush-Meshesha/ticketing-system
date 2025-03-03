import Ticket from "../models/ticketModel.js";
import logger from "../utils/logger.js";


const createNewTicket = async (req, res) => {
    const { title, description, status, category, priority} = req.body;
    try {
        const user = req.user?.id;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const data = {
            user,
            title,
            description,
            status: status || "open",
            category,
            priority: priority || "low"
        }
        const tiket = await Ticket.create(data);
        res.status(201).json({ message: "Ticket created successfully", tiket });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ message: "Server Error" });
    }
}

const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({});
        res.status(200).json({ tickets });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        logger.error(error.message);
    }
}

const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ ticket });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        logger.error(error.message);
    }
}

const updateTicket = async (req, res) => {
    const { title, description, status, category} = req.body;
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        ticket.title = title || ticket.title;
        ticket.description = description || ticket.description;
        ticket.status = status || ticket.status;
        ticket.category = category || ticket.category;
        const updatedTicket = await ticket.save();
        res.status(200).json({ message: "Ticket updated successfully", updatedTicket });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        logger.error(error.message);
    }
}

const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        await ticket.remove();
        res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        logger.error(error.message);
    }
}

export { createNewTicket , getAllTickets, getTicketById, updateTicket, deleteTicket };