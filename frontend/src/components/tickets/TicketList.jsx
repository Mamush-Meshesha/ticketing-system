import React, { useState } from 'react';
import { Card, Button, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import { Search, Filter, SortAsc, SortDesc, PlusCircle } from 'lucide-react';

const TICKET_STATUSES = {
    open: { label: 'Open', color: 'blue' },
    'in-progress': { label: 'In Progress', color: 'orange' },
    closed: { label: 'Closed', color: 'green' },
  };
  
  const TICKET_PRIORITIES = {
    critical: { label: 'Critical', color: 'red' },
    high: { label: 'High', color: 'yellow' },
    medium: { label: 'Medium', color: 'blue' },
    low: { label: 'Low', color: 'gray' },
  };
  
  const TICKET_CATEGORIES = {
    network: { label: 'Network', color: 'cyan' },
    ui: { label: 'UI', color: 'purple' },
    security: { label: 'Security', color: 'pink' },
    database: { label: 'Database', color: 'green' },
  };
  

const dummyTickets = [
  { id: '1', title: 'Ticket 1', description: 'Description of ticket 1', status: 'open', priority: 'critical', category: 'network', comments: [], updatedAt: '2025-03-01T10:30:00Z' },
  { id: '2', title: 'Ticket 2', description: 'Description of ticket 2', status: 'in-progress', priority: 'high', category: 'ui', comments: [], updatedAt: '2025-03-01T12:00:00Z' },
  { id: '3', title: 'Ticket 3', description: 'Description of ticket 3', status: 'closed', priority: 'low', category: 'security', comments: [], updatedAt: '2025-02-28T09:45:00Z' },
];

const TicketList = ({ onCreateTicket }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('updatedAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredTickets = dummyTickets
    .filter(ticket => 
      (statusFilter === 'all' || ticket.status === statusFilter) &&
      (ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortField === 'updatedAt') {
        return sortDirection === 'asc' 
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else if (sortField === 'priority') {
        const priorityOrder = { critical: 3, high: 2, medium: 1, low: 0 };
        return sortDirection === 'asc'
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getPriorityColor = (priority) => {
    return TICKET_PRIORITIES[priority].color;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-auto flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <TextField
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All Status</MenuItem>
              {Object.entries(TICKET_STATUSES).map(([value, { label }]) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlusCircle />}
            onClick={onCreateTicket}
          >
            New Ticket
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleSortChange('updatedAt')}
        >
          {sortField === 'updatedAt' && sortDirection === 'asc' ? <SortAsc /> : <SortDesc />}
          Last Updated
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleSortChange('priority')}
        >
          {sortField === 'priority' && sortDirection === 'asc' ? <SortAsc /> : <SortDesc />}
          Priority
        </Button>
      </div>

      {filteredTickets.length > 0 ? (
        <div className="space-y-3">
          {filteredTickets.map(ticket => (
            <Card key={ticket.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4 ticket-card">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-3">
                  <h3 className="font-medium line-clamp-1">{ticket.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {ticket.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="badge">{TICKET_STATUSES[ticket.status].label}</span>
                    <span className="badge">{TICKET_PRIORITIES[ticket.priority].label}</span>
                    <span className="badge">{TICKET_CATEGORIES[ticket.category].label}</span>
                  </div>
                </div>
                <div className="md:col-span-2 flex flex-col justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">ID:</span> #{ticket.id.slice(0, 8)}
                  </div>
                  <div className="text-sm text-right">
                    <p className="text-muted-foreground">Updated</p>
                    <p className="font-medium">{formatDate(ticket.updatedAt)}</p>
                  </div>
                  <div className="text-sm mt-2 md:mt-0">
                    <p className="text-muted-foreground">
                      {ticket.comments.length} {ticket.comments.length === 1 ? 'comment' : 'comments'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No tickets found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filters or create a new ticket</p>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlusCircle />}
            onClick={onCreateTicket}
          >
            Create New Ticket
          </Button>
        </div>
      )}
    </div>
  );
};

export default TicketList;
