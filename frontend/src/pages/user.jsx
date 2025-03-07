import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AlertCircle, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserRequest, updateUserRequest, userRequest } from "../stores/redux/users";
import { Delete } from "@mui/icons-material";

const UsersPage = () => {
  const { users = [], error, isLoading } = useSelector((state) => state.users.users);
  const isSidebarCollapsed = useSelector((state) => state.sidebar.isSidebarCollapsed);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState("");
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState(users?.email || "");
  const [name, setName] = useState(users?.name || "");
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Open edit dialog
  const handleOpenEditDialog = (userId) => {
    const user = users.find((u) => u._id === userId);
    if (user) {
      setProfile({ name: user.name, email: user.email });
      setName(user.name);
      setEmail(user.email);
      setSelectedUser(user);
      setEdit(true);
    }
  };

  // Update user
  const handleUpdatedUser = (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    const updatedData = { _id: selectedUser._id, name, email };
    dispatch(updateUserRequest(updatedData));
    setEdit(false);
  };

  // Open delete confirmation dialog
  const handleOpenDeleteDialog = (userId) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUserRequest(userToDelete));
      setDeleteDialogOpen(false);
    }
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  useEffect(() => {
    dispatch(userRequest());
  }, [dispatch]);

  return (
    <div className="container mx-auto ">
         <Container maxWidth="xl" className="mt-6 px-4 md:px-8">
        <Typography variant="h6" className="text-center md:text-left">
          Manage User Accounts
        </Typography>

        <Card className="mt-4">
          <CardHeader title="All Users" subheader="List of all users in the system." />
          <CardContent>
            <div className="flex flex-col gap-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-300 gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>{user.name.charAt(0)}</Avatar>
                    <div>
                      <Typography variant="body1" className="text-center md:text-left">
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="text-center md:text-left">
                        {user.email}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Edit />}
                      onClick={() => handleOpenEditDialog(user._id)}
                      className="!text-xs px-4 py-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleOpenDeleteDialog(user._id)}
                      className="!text-xs px-4 py-2"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={edit} onClose={() => setEdit(false)} fullWidth maxWidth="xs">
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <Typography variant="body1" className="mb-2">
              Update user details:
            </Typography>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEdit(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdatedUser} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} fullWidth maxWidth="xs">
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this user?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error">
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

    </div>
  );
};

export default UsersPage;
