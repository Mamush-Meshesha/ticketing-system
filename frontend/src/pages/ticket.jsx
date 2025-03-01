import React, { useState } from 'react';
import { Typography, Button, Container } from '@mui/material';
import NewTicketForm from '../components/tickets/NewTicket';
import TicketList from '../components/tickets/TicketList';

const TicketsPage = () => {
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const user = {
    role: 'admin', // or 'agent' or 'user'
  };
  const handleCreateTicket = () => {
    setIsCreatingTicket(true);
  };

  const handleCancelCreate = () => {
    setIsCreatingTicket(false);
  };

  const handleSuccessCreate = () => {
    setIsCreatingTicket(false);
  };

  return (

      <Container>
        {isCreatingTicket ? (
          <NewTicketForm onCancel={handleCancelCreate} onSuccess={handleSuccessCreate} />
        ) : (
          <div>
            <Typography variant="h4" gutterBottom>Tickets</Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {user?.role === 'admin' 
                ? 'Manage and monitor all tickets'
                : user?.role === 'agent'
                ? 'View and handle your assigned tickets'
                : 'Track and manage your submitted tickets'}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCreateTicket} sx={{ mt: 2 }}>
              Create Ticket
            </Button>
            <TicketList onCreateTicket={handleCreateTicket} />
          </div>
        )}
      </Container>

  );
};

export default TicketsPage;
