import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentRequest,
  getTicketsDetailRequest,
  tiketDeleteRequest,
} from "../stores/redux/tiket";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  Typography,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ArrowBack, Delete, Update } from "@mui/icons-material";
import { Send } from "@mui/icons-material";
import {
  getCategoryColor,
  getPriorityColor,
  getStatusColor,
} from "../utils/badge";
import { getUserForComment } from "../stores/redux/users";

const TicketDetailPage = () => {
  const isSidebarCollapsed = useSelector(
    (state) => state.sidebar.isSidebarCollapsed
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    dispatch(getTicketsDetailRequest(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserForComment());
  }, [dispatch]);

  const {
    ticket = [],
    isLoading,
    error,
  } = useSelector((state) => state.tiket.tikets);
  const { users } = useSelector((state) => state.users.users);

  const getUserName = (userId) => {
    if (!users || users.length === 0) {
      console.log("Users array is empty or undefined.");
      return "Unknown User";
    }

    const user = users.find((u) => u._id === userId);
    return user ? user.name : "Unknown User";
  };
  const getUserRole = (userId) => {    
    if (!users || users.length === 0) {
      console.log("Users array is empty or undefined.");
      return "Unknown User";
    }
  
    const user = users.find((u) => u._id === userId);
    
    return user ? user.role : "un-authorized";
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!ticket) return <p>No Ticket Found</p>;

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;

    dispatch(
      createCommentRequest({
        id: ticket._id,
        comment: comment,
      })
    );

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setComment("");
    }, 500);
  };

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [title, setTitle] = useState(ticket?.title || "");
  const [description, setDescription] = useState(ticket?.description || "");
  const [priority, setPriority] = useState(ticket?.priority || "");
  const [category, setCategory] = useState(ticket?.category || "");
  const [status, setStatus] = useState(ticket?.status || "");

  const handleOpenUpdateDialog = () => {
    setTitle(ticket?.title || "");
    setDescription(ticket?.description || "");
    setPriority(ticket?.priority || "");
    setCategory(ticket?.category || "");
    setOpenUpdateDialog(true);
  };

  const handleDeleteTicket = (id) => {
    dispatch(tiketDeleteRequest(id));
    setOpenDeleteDialog(false);
    navigate("/tickets");
  };

  const handleUpdateTicket = () => {
    dispatch(
      updateTicketRequest({
        id: ticket._id,
        title,
        description,
        priority,
        category,
      })
    );
    setOpenUpdateDialog(false);
  };

  return (
    <div
      className="container mx-auto mt-20"
    >
      <div className="space-y-12 mt-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate("/tickets")}
            >
              Back
            </Button>
            <div>
              <Typography variant="h5">{ticket.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                Ticket ID: #{ticket._id} • Created{" "}
                {formatDate(ticket.updatedAt) || ""}
              </Typography>
            </div>
          </div>
      {
        users.role === "admin" && (
          <div className="flex gap-3">
          <Button
            color="update"
            startIcon={<Update size="17px" />}
            onClick={handleOpenUpdateDialog}
            className="!text-xs !bg-[#2b7fff] !text-white"
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete size="17px" />}
            className="!text-xs !bg-[#f32b11] !text-white"
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
          </Button>
        </div>
        )
      }
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader title="Description" />
              <CardContent>
                <Typography variant="body2">{ticket.description}</Typography>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Comments" />
              <CardContent>
                {ticket.comments && ticket.comments.length > 0 ? (
                  ticket.comments.map((commentItem) => (
                    <div key={commentItem._id} className="mb-4">
                      <Typography variant="body2" color="textSecondary">
                        <strong>{getUserName(commentItem.user)}</strong>({getUserRole(commentItem.user)})
                        commented:
                      </Typography>
                      <Typography variant="body2">
                        {commentItem.comment}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {formatDate(commentItem.createdAt)}
                      </Typography>
                    </div>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No comments yet
                  </Typography>
                )}

                {ticket.status !== "closed" && (
                  <div className="mt-4">
                    <TextareaAutosize
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      minRows={3}
                      style={{ width: "100%" }}
                      className="outline-1 px-2 rounded-md"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCommentSubmit}
                      disabled={!comment.trim() || isSubmitting}
                      startIcon={<Send />}
                    >
                      Send
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader title="Ticket Information" />
              <CardContent>
                <div>
                  <Typography variant="body2" color="textSecondary">
                    Status
                  </Typography>
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(
                      ticket.status
                    )}`}
                    variant="contained"
                  >
                    {ticket.status}
                  </span>
                </div>
                <div className="py-3">
                  <Typography variant="body2" color="textSecondary">
                    Priority
                  </Typography>
                  <span
                    variant="contained"
                    className={`px-2 py-1 rounded text-sm font-semibold ${getPriorityColor(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority}
                  </span>
                </div>
                <div>
                  <Typography variant="body2" color="textSecondary">
                    Category
                  </Typography>
                  <span
                    variant="contained"
                    className={`px-2 py-1 rounded text-sm font-semibold ${getCategoryColor(
                      ticket.category
                    )}`}
                  >
                    {ticket.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="textSecondary">
              This action cannot be undone. This will permanently delete the
              ticket.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteTicket(id)}
              color="error"
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openUpdateDialog}
          onClose={() => setOpenUpdateDialog(false)}
        >
          <DialogTitle>Update Ticket</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="dense"
              multiline
              rows={4}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                defaultValue={priority}
              >
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={status}
                onChange={(e) => setPriority(e.target.value)}
                defaultValue={status}
              >
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
                <MenuItem value="in-progress">In progress</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="quary">Query</MenuItem>
                <MenuItem value="network">Network</MenuItem>
                <MenuItem value="authentication">Authentication</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenUpdateDialog(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateTicket}
              color="primary"
              startIcon={<Update />}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        
      </div>
    </div>
  );
};

export default TicketDetailPage;
