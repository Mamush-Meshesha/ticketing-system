import express from 'express';

import { createNewTicket, getTicketById, getAllTickets, updateTicket, addCommentToTicket, deleteTicket } from '../controllers/ticketController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/create", verifyToken, createNewTicket)
router.get("/",verifyToken, getAllTickets)
router.get("/:id", getTicketById)
router.put("/:id", updateTicket)
router.post("/:id/comment", verifyToken, addCommentToTicket)
router.delete("/delete/:id",verifyToken ,deleteTicket)

export default router;