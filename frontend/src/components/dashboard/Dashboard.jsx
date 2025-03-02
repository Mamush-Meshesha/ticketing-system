import React from 'react';
import { Card, CardContent, CardHeader, Container, Typography } from '@mui/material';
import { Ticket, CheckCircle, AlertTriangle, Clock, PersonStanding } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Dummy user data
  const user = { name: 'John Doe' };

  // Dummy tickets data
  const userTickets = [
    { id: 1, title: 'Login Issue', description: 'Cannot log in with valid credentials.', status: 'open', updatedAt: '2024-03-01T10:00:00Z' },
    { id: 2, title: 'Page Crash', description: 'Dashboard crashes on load.', status: 'in-progress', updatedAt: '2024-03-02T12:30:00Z' },
    { id: 3, title: 'Feature Request', description: 'Add dark mode support.', status: 'resolved', updatedAt: '2024-03-03T14:45:00Z' },
    { id: 4, title: 'Payment Issue', description: 'Payment gateway error on checkout.', status: 'closed', updatedAt: '2024-03-04T16:20:00Z' }
  ];

  // Calculate ticket statistics
  const ticketsByStatus = userTickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {});

  const totalTickets = userTickets.length;
  const recentTickets = [...userTickets].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5);

  const statusCards = [
    { title: 'Open', value: ticketsByStatus.open || 0, icon: <Ticket color="blue" /> },
    { title: 'In Progress', value: ticketsByStatus['in-progress'] || 0, icon: <Clock color="orange" /> },
    { title: 'Resolved', value: ticketsByStatus.resolved || 0, icon: <CheckCircle color="green" /> },
    { title: 'Closed', value: ticketsByStatus.closed || 0, icon: <PersonStanding color="gray" /> }
  ];

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Container maxWidth="xl" >
      <Typography className='pb-7' variant="body1">Welcome back, {user.name}. Here's an overview of your tickets.</Typography>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {statusCards.map(card => (
          <Card key={card.title}>
            <CardHeader title={<>{card.icon} {card.title}</>} />
            <CardContent>
              <Typography variant="h5">{card.value}</Typography>
              <Typography variant="body2">{((card.value / (totalTickets || 1)) * 100).toFixed(0)}% of total</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className='mt-6'>
        <CardHeader title="Recent Activity" />
        <CardContent>
          {recentTickets.length > 0 ? (
            <div>
              {recentTickets.map(ticket => (
                <Link key={ticket.id} to={`/tickets/${ticket.id}`} style={{ textDecoration: 'none', display: 'block', padding: '8px' }}>
                  <Typography variant="subtitle1">{ticket.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{ticket.description}</Typography>
                  <Typography variant="body2" color="textSecondary">{formatDate(ticket.updatedAt)}</Typography>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <AlertTriangle size={32} color="gray" />
              <Typography variant="body2">No recent activity found</Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
