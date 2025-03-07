import React from 'react';
import TicketDashboard from '../components/dashboard/tiketDashboard';
import { useSelector } from 'react-redux';

const TicketsPage = () => {
  const isSidebarCollapsed = useSelector((state) => state.sidebar.isSidebarCollapsed);


  return (

      <div className="container mt-20 mx-auto ">
      <TicketDashboard />
      </div>

  );
};

export default TicketsPage;
