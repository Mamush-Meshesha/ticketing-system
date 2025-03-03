import express from 'express';

import { createNewTicket, getTicketById, getAllTickets, updateTicket } from '../controllers/ticketController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/create", verifyToken, createNewTicket)
router.get("/", getAllTickets)
router.get("/:id", getTicketById)
router.put("/:id", updateTicket)

export default router;