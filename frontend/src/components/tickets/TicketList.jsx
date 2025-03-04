import React, { useEffect, useState } from "react";
import { Card, Button, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import {  SortAsc, SortDesc, PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketRequest, getTicketsDetailRequest } from "../../stores/redux/tiket";
import { getStatusColor,getCategoryColor,getPriorityColor } from "../../utils/badge";
import { Link, useNavigate } from "react-router-dom";

const TICKET_STATUSES = {
  open: "Open",
  "in-progress": "In Progress",
  closed: "Closed",
};

const TICKET_PRIORITIES = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const TICKET_CATEGORIES = {
  network: "Network",
  ui: "UI",
  security: "Security",
  database: "Database",
};




const TicketList = ({ onCreateTicket }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("updatedAt");
  const [sortDirection, setSortDirection] = useState("desc");

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { tickets = [], isLoading, error } = useSelector((state) => state.tiket.tikets);

  useEffect(() => {
    dispatch(getTicketRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTicketsDetailRequest())
  },[dispatch])

  console.log(tickets)

  const handleSortChange = (field) => {
    setSortDirection(sortField === field && sortDirection === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  const handleTicketClick = (id) => {
    dispatch(getTicketsDetailRequest(id)); 
    navigate(`/tickets/${id}`);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  if (isLoading) return <div className="text-center py-12">Loading tickets...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <TextField
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          className="!w-1/2"
        />
        <FormControl variant="outlined"  className="!w-1/2">
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <MenuItem value="all">All Status</MenuItem>
            {Object.entries(TICKET_STATUSES).map(([value, label]) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" startIcon={<PlusCircle />} onClick={onCreateTicket}>
          New Ticket
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="outlined" size="small" onClick={() => handleSortChange("updatedAt")}>
          {sortField === "updatedAt" && sortDirection === "asc" ? <SortAsc /> : <SortDesc />} Last Updated
        </Button>
        <Button variant="outlined" size="small" onClick={() => handleSortChange("priority")}>
          {sortField === "priority" && sortDirection === "asc" ? <SortAsc /> : <SortDesc />} Priority
        </Button>
      </div>

      {tickets.length > 0 ? (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <Card key={ticket._id} onClick={() => handleTicketClick(ticket._id)} className="shadow-sm !w-full  gap-4 transition-transform hover:shadow-lg! duration-150 p-4">
              <div  className="flex justify-between !w-full">
                <div className="w-1/2">
                  <h3 className="font-medium line-clamp-1 capitalize">{ticket.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{ticket.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
                    <span className={`px-2 py-1 rounded text-sm font-semibold ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
                    <span className={`px-2 py-1 rounded text-sm font-semibold ${getCategoryColor(ticket.category)}`}>{ticket.category}</span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-muted-foreground">Updated</p>
                  <p className="font-medium">{formatDate(ticket.updatedAt)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3>No tickets found</h3>
          <Button variant="contained" color="primary" startIcon={<PlusCircle />} onClick={onCreateTicket}>
            Create New Ticket
          </Button>
        </div>
      )}
    </div>
  );
};

export default TicketList;
