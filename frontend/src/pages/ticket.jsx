import React from 'react';
import TicketDashboard from '../components/dashboard/tiketDashboard';
import { useSelector } from 'react-redux';

const TicketsPage = () => {
  const isSidebarCollapsed = useSelector((state) => state.sidebar.isSidebarCollapsed);


  return (

      <div className={`container mx-auto ${isSidebarCollapsed ? "ml-[80px]" : "ml-[280px]"}`}>
      <TicketDashboard />
      </div>

  );
};

export default TicketsPage;
