import React, { useState } from 'react';
import { Container, Card, CardContent, CardHeader, Typography, Avatar, Badge } from '@mui/material';
import { AlertCircle } from 'lucide-react';

const demoUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', avatarUrl: '' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'agent', avatarUrl: '' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'customer', avatarUrl: '' }
];

const UsersPage = () => {
  const [users] = useState(demoUsers);
  const user = { role: 'admin' }; // Dummy user data

  if (user.role !== 'admin') {
    return (
      <Container style={{ textAlign: 'center', paddingTop: '50px' }}>
        <AlertCircle size={64} color="red" />
        <Typography variant="h5" gutterBottom>Access Denied</Typography>
        <Typography variant="body2">You don't have permission to view this page.</Typography>
      </Container>
    );
  }

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'primary';
      case 'agent': return 'success';
      case 'customer': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>Users</Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Manage user accounts and permissions.
      </Typography>

      <Card>
        <CardHeader title="All Users" subheader="A list of all users in the system." />
        <CardContent>
          {users.map((user) => (
            <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
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
  );
};

export default UsersPage;
