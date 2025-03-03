import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardHeader, Typography, Avatar, Badge } from '@mui/material';
import { AlertCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {userRequest} from "../stores/redux/users"

const UsersPage = () => {
  const user = { role: 'admin' };
  const {users =[], error, isLoading} = useSelector((state) => state.users.users);
  const isSidebarCollapsed = useSelector((state) => state.sidebar.isSidebarCollapsed);

  console.log(users)
  if (user.role !== 'admin') {
    return (
      <Container style={{ textAlign: 'center', paddingTop: '50px' }}>
        <AlertCircle size={64} color="red" />
        <Typography variant="h5" gutterBottom>Access Denied</Typography>
        <Typography variant="body2">You don't have permission to view this page.</Typography>
      </Container>
    );
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userRequest());
  },[dispatch])

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'primary';
      case 'agent': return 'success';
      case 'customer': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className={`container mx-auto ${isSidebarCollapsed ? "ml-[80px]" : "ml-[280px]"}`}>
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>Users</Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Manage user accounts and permissions.
      </Typography>

      <Card>
        <CardHeader title="All Users" subheader="A list of all users in the system." />
        <CardContent>
          {users.map((user) => (
            <div key={user._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Avatar>{user.name.charAt(0)}</Avatar>
                <div>
                  <Typography variant="body1">{user.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                </div>
              </div>
              <Badge color={getRoleBadgeColor(user.role)} variant="standard">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </Container>
    </div>
  );
};

export default UsersPage;
