import express from 'express';

import { createNewTicket, getTicketById, getAllTickets, updateTicket } from '../controllers/ticketController.js';

const router = express.Router();

router.post("/create", createNewTicket)
router.get("/", getAllTickets)
router.get("/:id", getTicketById)
router.put("/:id", updateTicket)

export default router;