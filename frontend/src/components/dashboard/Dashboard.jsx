import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, Container, Typography } from '@mui/material';
import { Ticket, CheckCircle, AlertTriangle, Clock, PersonStanding } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTicketRequest } from '../../stores/redux/tiket';

const Dashboard = () => {

  const { tickets = [], isLoading, error } = useSelector((state) => state.tiket.tikets);
    const {user =[], error:useError, isLoading: userLoading} = useSelector((state) => state.users.users);
    const isSidebarCollapsed = useSelector(
      (state) => state.sidebar.isSidebarCollapsed
    );
    const isMobileMenuOpen = useSelector(
      (state) => state.sidebar.isMobileMenuOpen
    );
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTicketRequest());
  }, [dispatch])

  // Calculate ticket statistics
  const ticketsByStatus = tickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {});

  const totalTickets = tickets.length;
  const recentTickets = [...tickets].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5);

  const statusCards = [
    { title: 'Open', value: ticketsByStatus.open || 0, icon: <Ticket color="blue" /> },
    { title: 'In Progress', value: ticketsByStatus['in-progress'] || 0, icon: <Clock color="orange" /> },
    { title: 'Closed', value: ticketsByStatus.closed || 0, icon: <PersonStanding color="gray" /> }
  ];

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return ( 
    <Container maxWidth="xl" className='mt-20' >
      <Typography className='pb-7' variant="body1">Welcome back, {user.name}. Here's an overview of your tickets.</Typography>

      {/* Stats Cards */}
      <div className='grid  gap-4 lg:grid-cols-3  md:grid-cols-2 grid-cols-1'>
        {statusCards.map(card => (
          <Card key={card.title} className='w-fitl'>
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
                <Link key={ticket._id} to={`/tickets/${ticket.id}`} style={{ textDecoration: 'none', display: 'block', padding: '8px' }}>
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
