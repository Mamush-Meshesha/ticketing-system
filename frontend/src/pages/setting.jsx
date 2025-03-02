import React, { useState } from 'react';
import {Container, Card, CardContent, CardHeader, Typography, Avatar, Badge, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TableContainer,Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';
import { AlertCircle,Edit, Delete } from 'lucide-react';

const demoUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', avatarUrl: '', permissions: { read: true, write: true, delete: true } },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'agent', avatarUrl: '', permissions: { read: true, write: true, delete: false } },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'customer', avatarUrl: '', permissions: { read: true, write: false, delete: false } }
];

const SettingPage = () => {
  const [users, setUsers] = useState(demoUsers);
  const [editUser, setEditUser] = useState(null);
  const [open, setOpen] = useState(false);
  const user = { role: 'admin' };
  const [profile, setProfile] = useState(demoUsers[0]);
  const [edit, setEdit] = useState(false);

  if (user.role !== 'admin') {
    return (
      <Container style={{ textAlign: 'center', paddingTop: '50px' }}>
        <AlertCircle size={64} color="red" />
        <Typography variant="h5" gutterBottom>Access Denied</Typography>
        <Typography variant="body2">You don't have permission to view this page.</Typography>
      </Container>
    );
  }

  const handlePermissionChange = (id, permission) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, permissions: { ...user.permissions, [permission]: !user.permissions[permission] } } : user
    ));
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>Users & Permissions</Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Manage user accounts and permissions.
      </Typography>

      <Card>
        <CardHeader title="All Users" subheader="A list of all users in the system." />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Read</TableCell>
                  <TableCell>Write</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Checkbox checked={user.permissions.read} onChange={() => handlePermissionChange(user.id, 'read')} />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={user.permissions.write} onChange={() => handlePermissionChange(user.id, 'write')} />
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={user.permissions.delete} onChange={() => handlePermissionChange(user.id, 'delete')} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <div>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <Card>
        <CardHeader title={profile.name} subheader={profile.email} avatar={<Avatar>{profile.name.charAt(0)}</Avatar>} />
        <CardContent>
          <Typography variant="body1">Role: {profile.role}</Typography>
          <Button onClick={() => setEdit(true)} color="primary">Edit</Button>
        </CardContent>
      </Card>

      <Dialog open={edit} onClose={() => setEdit(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <TextField label="Email" fullWidth margin="dense" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEdit(false)} color="secondary">Cancel</Button>
          <Button onClick={() => setEdit(false)} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
    </Container>
  );
};

export default SettingPage;
