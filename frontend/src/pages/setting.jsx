import React, { useState } from 'react';
import {Container, Card, CardContent, CardHeader, Typography, Avatar, Badge, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TableContainer,Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';
import { AlertCircle,Edit, Delete } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdminRequest, updateUserRequest } from '../stores/redux/users';


const SettingPage = () => {
 
  const user = useSelector((state) => state.auth.user)

  const [edit, setEdit] = useState(false);
  const isSidebarCollapsed = useSelector((state) => state.sidebar.isSidebarCollapsed);
  const [email, setEmail] = useState(user?.email || "")
  const [name, setName] = useState(user?.name || "")

   const dispatch = useDispatch()

  const handleOpenEditDialog = () => {
    setEmail(user?.email)
    setName(user?.name)
    setEdit(true)
  }

  const handleUpdatedAdmin = (e) => {
    e.preventDefault()

    dispatch(updateAdminRequest({ _id: user._id, adminData: { name, email } }))
    setEdit(false)

  }

  if (user.role !== 'admin') {
    return (
      <Container style={{ textAlign: 'center', paddingTop: '50px' }}>
        <AlertCircle size={64} color="red" />
        <Typography variant="h5" gutterBottom>Access Denied</Typography>
        <Typography variant="body2">You don't have permission to view this page.</Typography>
      </Container>
    );
  }

 

  return (
    <div className="container mx-auto mt-20 ">
    <Container maxWidth="xl" className=''>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Edit profile
      </Typography>
      <div>
      <Card>
        <CardHeader title={name} subheader={email} avatar={<Avatar>{name.charAt(0)}</Avatar>} />
        <CardContent>
          <Typography variant="body1">Role: {user.role}</Typography>
          <Button onClick={handleOpenEditDialog} color="primary">Edit</Button>
        </CardContent>
      </Card>

      <Dialog open={edit} onClose={() => setEdit(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={name} onChange={(e) => setName(e.target.value )} />
          <TextField label="Email" fullWidth margin="dense" value={email} onChange={(e) => setEmail( e.target.value )} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEdit(false)} color="secondary">Cancel</Button>
          <Button onClick={handleUpdatedAdmin} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
    </Container>
    </div>
  );
};

export default SettingPage;
