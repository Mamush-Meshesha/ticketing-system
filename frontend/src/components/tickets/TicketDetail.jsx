// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, Button, Avatar, TextareaAutosize, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
// import { ArrowBack, Delete, Send, Close } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// // Dummy data for ticket statuses, priorities, and categories
// const TICKET_STATUSES = {
//   open: { label: 'Open', color: 'primary' },
//   inProgress: { label: 'In Progress', color: 'secondary' },
//   closed: { label: 'Closed', color: 'error' },
// };

// const TICKET_PRIORITIES = {
//   low: { label: 'Low', color: 'success' },
//   medium: { label: 'Medium', color: 'warning' },
//   high: { label: 'High', color: 'error' },
// };

// const TICKET_CATEGORIES = {
//   bug: { label: 'Bug', color: 'primary' },
//   feature: { label: 'Feature', color: 'secondary' },
//   support: { label: 'Support', color: 'success' },
// };

// // Dummy ticket data
// const ticket = {
//   id: '12345678',
//   title: 'Issue with app login',
//   createdAt: '2025-03-02T12:00:00Z',
//   description: 'The user is unable to log in after the update.',
//   status: 'open',
//   priority: 'high',
//   category: 'bug',
//   comments: [
//     { id: '1', userId: 'admin', content: 'Please check the server logs.', createdAt: '2025-03-02T12:05:00Z' },
//     { id: '2', userId: 'agent', content: 'I will investigate this issue.', createdAt: '2025-03-02T12:10:00Z' },
//   ],
// };

// const TicketDetail = () => {
//   const [comment, setComment] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const navigate = useNavigate();

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     }).format(date);
//   };

//   const handleCommentSubmit = () => {
//     if (!comment.trim()) return;

//     setIsSubmitting(true);
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setComment('');
//     }, 500);
//   };

//   const handleDeleteTicket = () => {
//     // Handle ticket deletion
//     setOpenDeleteDialog(false);
//     navigate('/tickets');
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate('/tickets')}>Back</Button>
//         <div>
//           <Typography variant="h5">{ticket.title}</Typography>
//           <Typography variant="body2" color="textSecondary">
//             Ticket ID: #{ticketId.slice(0, 8)} • Created {formatDate(ticket.createdAt)}
//           </Typography>
//         </div>
//         <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => setOpenDeleteDialog(true)}>
//           Delete
//         </Button>
//       </div>

//       <div className="grid gap-6 md:grid-cols-3">
//         <div className="md:col-span-2 space-y-6">
//           <Card>
//             <CardHeader title="Description" />
//             <CardContent>
//               <Typography variant="body2">{ticket.description}</Typography>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader title={`Comments (${ticket.comments.length})`} />
//             <CardContent>
//               {ticket.comments.length > 0 ? (
//                 ticket.comments.map((comment, index) => (
//                   <div key={index} className="flex gap-4 p-4">
//                     <Avatar>{comment.userId.substring(0, 2).toUpperCase()}</Avatar>
//                     <div>
//                       <Typography variant="body2">
//                         {comment.userId === 'admin' ? 'Admin' : 'Agent'} - {formatDate(comment.createdAt)}
//                       </Typography>
//                       <Typography variant="body2">{comment.content}</Typography>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <Typography variant="body2" color="textSecondary">
//                   No comments yet
//                 </Typography>
//               )}

//               {ticket.status !== 'closed' && (
//                 <div className="mt-4">
//                   <TextareaAutosize
//                     placeholder="Add a comment..."
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     minRows={3}
//                     style={{ width: '100%' }}
//                   />
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleCommentSubmit}
//                     disabled={!comment.trim() || isSubmitting}
//                     startIcon={<Send />}
//                   >
//                     Send
//                   </Button>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader title="Ticket Information" />
//             <CardContent>
//               <div>
//                 <Typography variant="body2" color="textSecondary">Status</Typography>
//                 <Button variant="contained" color={TICKET_STATUSES[ticket.status].color}>
//                   {TICKET_STATUSES[ticket.status].label}
//                 </Button>
//               </div>
//               <div>
//                 <Typography variant="body2" color="textSecondary">Priority</Typography>
//                 <Button variant="contained" color={TICKET_PRIORITIES[ticket.priority].color}>
//                   {TICKET_PRIORITIES[ticket.priority].label}
//                 </Button>
//               </div>
//               <div>
//                 <Typography variant="body2" color="textSecondary">Category</Typography>
//                 <Button variant="contained" color={TICKET_CATEGORIES[ticket.category].color}>
//                   {TICKET_CATEGORIES[ticket.category].label}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader title="Actions" />
//             <CardContent>
//               <Button variant="contained" color="primary" onClick={() => console.log('Updating status')}>
//                 Update Status
//               </Button>
//               {ticket.status !== 'closed' && (
//                 <Button variant="contained" color="secondary" onClick={() => console.log('Closing ticket')}>
//                   Close Ticket
//                 </Button>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
//         <DialogTitle>Are you sure?</DialogTitle>
//         <DialogContent>
//           <Typography variant="body2" color="textSecondary">
//             This action cannot be undone. This will permanently delete the ticket and all its associated comments.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">Cancel</Button>
//           <Button onClick={handleDeleteTicket} color="error" startIcon={<Delete />}>Delete</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default TicketDetail;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Button,
//   Avatar,
//   TextareaAutosize,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Typography,
// } from "@mui/material";
// import { ArrowBack, Delete, Send, Close } from "@mui/icons-material";
// import { getTicketsDetailRequest } from "../../stores/redux/tiket";
// import { useDispatch } from "react-redux";

// // Sample functions to determine color classes (can be modified based on actual implementation)
// const getStatusColor = (status) => {
//   const colors = {
//     open: "primary",
//     inProgress: "secondary",
//     closed: "error",
//   };
//   return colors[status] || "default";
// };

// const getPriorityColor = (priority) => {
//   const colors = {
//     low: "success",
//     medium: "warning",
//     high: "error",
//   };
//   return colors[priority] || "default";
// };

// const getCategoryColor = (category) => {
//   const colors = {
//     bug: "primary",
//     feature: "secondary",
//     support: "success",
//   };
//   return colors[category] || "default";
// };

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return new Intl.DateTimeFormat("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(date);
// };

// const TicketDetail = ({ tickets }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch()
//   const { tickets = [], isLoading, error } = useSelector((state) => state.tiket.tikets);


//   useEffect(() => {
//     if(id){
//       dispatch(getTicketsDetailRequest(id))
//     }
//   },[dispatch, id])
//   // Find the specific ticket from the tickets list
//   // const ticket = tickets.find((t) => t._id === id);
//   // console.log(ticket);
//   // if (!ticket) {
//   //   return (
//   //     <Typography variant="h6" color="error">
//   //       Ticket not found!
//   //     </Typography>
//   //   );
//   }

//   // const [comment, setComment] = useState("");
//   // const [isSubmitting, setIsSubmitting] = useState(false);
//   // const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

//   // const handleCommentSubmit = () => {
//   //   if (!comment.trim()) return;

//   //   setIsSubmitting(true);
//   //   setTimeout(() => {
//   //     setIsSubmitting(false);
//   //     setComment("");
//   //   }, 500);
//   // };

//   const handleDeleteTicket = () => {
//     // Handle ticket deletion logic here
//     setOpenDeleteDialog(false);
//     navigate("/tickets");
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Button
//           variant="outlined"
//           startIcon={<ArrowBack />}
//           onClick={() => navigate("/tickets")}
//         >
//           Back
//         </Button>
//         <div>
//           <Typography variant="h5">{ticket.title}</Typography>
//           <Typography variant="body2" color="textSecondary">
//             Ticket ID: #{ticket._id.slice(0, 8)} • Created{" "}
//             {formatDate(ticket.updatedAt)}
//           </Typography>
//         </div>
//         <Button
//           variant="outlined"
//           color="error"
//           startIcon={<Delete />}
//           onClick={() => setOpenDeleteDialog(true)}
//         >
//           Delete
//         </Button>
//       </div>

//       <div className="grid gap-6 md:grid-cols-3">
//         <div className="md:col-span-2 space-y-6">
//           <Card>
//             <CardHeader title="Description" />
//             <CardContent>
//               <Typography variant="body2">{ticket.description}</Typography>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader title="Comments (0)" />
//             <CardContent>
//               <Typography variant="body2" color="textSecondary">
//                 No comments yet
//               </Typography>
//               {ticket.status !== "closed" && (
//                 <div className="mt-4">
//                   <TextareaAutosize
//                     placeholder="Add a comment..."
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     minRows={3}
//                     style={{ width: "100%" }}
//                   />
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleCommentSubmit}
//                     disabled={!comment.trim() || isSubmitting}
//                     startIcon={<Send />}
//                   >
//                     Send
//                   </Button>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader title="Ticket Information" />
//             <CardContent>
//               <div>
//                 <Typography variant="body2" color="textSecondary">
//                   Status
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   color={getStatusColor(ticket.status)}
//                 >
//                   {ticket.status}
//                 </Button>
//               </div>
//               <div>
//                 <Typography variant="body2" color="textSecondary">
//                   Priority
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   color={getPriorityColor(ticket.priority)}
//                 >
//                   {ticket.priority}
//                 </Button>
//               </div>
//               <div>
//                 <Typography variant="body2" color="textSecondary">
//                   Category
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   color={getCategoryColor(ticket.category)}
//                 >
//                   {ticket.category}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       <Dialog
//         open={openDeleteDialog}
//         onClose={() => setOpenDeleteDialog(false)}
//       >
//         <DialogTitle>Are you sure?</DialogTitle>
//         <DialogContent>
//           <Typography variant="body2" color="textSecondary">
//             This action cannot be undone. This will permanently delete the
//             ticket.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDeleteTicket}
//             color="error"
//             startIcon={<Delete />}
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default TicketDetail;


import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTicketsDetailRequest } from "../../stores/redux/tiket";

const TicketDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (id) {
      dispatch(getTicketsDetailRequest(id));
    }
  }, [dispatch, id]);

  const { tiket, isLoading, error } = useSelector((state) => state.tiket);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!tiket) return <p>No Ticket Found</p>;

  return (
    <div>
      <h1>Ticket Detail</h1>
      <p><strong>ID:</strong> {tiket.id}</p>
      <p><strong>Title:</strong> {tiket.title}</p>
      <p><strong>Description:</strong> {tiket.description}</p>
    </div>
  );
};

export default TicketDetail;
