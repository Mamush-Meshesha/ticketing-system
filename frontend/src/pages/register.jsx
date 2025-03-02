import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, Select, MenuItem, Typography, Container, Paper } from "@mui/material";
import { User, Lock } from "lucide-react";
import { useDispatch } from "react-redux";
import { registerReuest } from "../stores/redux/auth";
import { useNavigate } from "react-router-dom";

const Register = ({ type }) => {
  const [formData, setFormData] = useState({ email: "", password: "", name: "", role: "customer" });
  // const [isRegister, setIsRegister] = useState(type === "register");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerReuest(formData));
    navigate("/login");
  };

  return (
 <>
    <Container maxWidth="md" sx={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={6} sx={{ padding: 4, textAlign: "center", borderRadius: 3, backdropFilter: "blur(10px)" }}>
          <Typography variant="h4" gutterBottom>
           Register
          </Typography>
          <form onSubmit={handleSubmit}>
           
              <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleChange} required />
       
            <TextField fullWidth margin="normal" label="Email" name="email" value={formData.email} onChange={handleChange} required />
            <TextField fullWidth margin="normal" type="password" label="Password" name="password" value={formData.password} onChange={handleChange} required />
            
              <Select fullWidth name="role" value={formData.role} onChange={handleChange} sx={{ marginTop: 2 }}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="agent">Agent</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
              </Select>
        
            <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginTop: 2 }}>
              Register
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 2, cursor: "pointer" }}>
            Already have an account? Login
          </Typography>
        </Paper>
      </motion.div>
      
    </Container>
    <svg
        viewBox="0 0 1440 320"
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: -1 }}
      >
        <path
          fill="#6200ea"
          fillOpacity="1"
          d="M0,256L60,234.7C120,213,240,171,360,138.7C480,107,600,85,720,117.3C840,149,960,235,1080,240C1200,245,1320,171,1380,138.7L1440,107V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
        ></path>
      </svg>
 </>
  );
};

export default Register;