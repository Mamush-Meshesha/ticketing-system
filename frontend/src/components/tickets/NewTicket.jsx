import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Typography, TextField, Button, Radio, FormControlLabel, RadioGroup, FormControl } from '@mui/material';
import { ArrowBack, Send } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { tiketRequest } from '../../stores/redux/tiket';

// Dummy auth data
const user = {
  role: 'admin', // or 'agent' or 'user'
};

const TICKET_PRIORITIES = {
  low: { label: 'Low', color: 'green' },
  medium: { label: 'Medium', color: 'orange' },
  high: { label: 'High', color: 'red' },
};

const TICKET_CATEGORIES = {
  query: { label: 'Query', color: 'blue' },
  issue: { label: 'Issue', color: 'red' },
  feedback: { label: 'Feedback', color: 'green' },
};

const NewTicketForm = ({ onCancel, onSuccess }) => {
  // const [formData, setFormData] = useState({
  //   title: '',
  //   description: '',
  //   priority: 'medium',
  //   category: 'query',
  // });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  // const [title, setTitle] = useState('');
  //   const [description, setDescription] = useState('');
  //   const [status, setStatus] = useState('open');
  //   const [category, setCategory] = useState('network');
  //   const [priority, setPriority] = useState('critical');
    
  //   const dispatch = useDispatch()
  //   const user = useSelector((state) => state.auth.user.role);
  //   const handleCreateTicket = (e) => {
  //     e.preventDefault()

  //     const data = {
  //       title,
  //       description,
  //       status,
  //       category,
  //       priority
  //     }
  //     dispatch(tiketRequest(data))

  //   };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));

  //   if (errors[name]) {
  //     setErrors((prev) => ({ ...prev, [name]: '' }));
  //   }
  // };

  // const handlePriorityChange = (e) => {
  //   setFormData((prev) => ({ ...prev, priority: e.target.value }));
  // };

  // const handleCategoryChange = (e) => {
  //   setFormData((prev) => ({ ...prev, category: e.target.value }));
  // };

  const validate = () => {
    const newErrors = {
      title: '',
      description: '',
    };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('open');
    const [category, setCategory] = useState('network');
    const [priority, setPriority] = useState('critical');
    
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user.role);
    const handleCreateTicket = (e) => {
      e.preventDefault()

      const data = {
        title,
        description,
        status,
        category,
        priority
      }
      dispatch(tiketRequest(data))

    };

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardHeader
        title="Create New Ticket"
        action={
          <Button onClick={onCancel} variant="contained" color="primary" startIcon={<ArrowBack />}>
            Back
          </Button>
        }
      />
      <CardContent>
        <form onSubmit={handleCreateTicket} noValidate>
          <div>
            <Typography variant="h6" gutterBottom>
              Title
            </Typography>
            <TextField
              fullWidth
              id="title"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Brief summary of the issue"
              error={!!errors.title}
              helperText={errors.title}
              margin="normal"
            />
          </div>

          <div>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <TextField
              fullWidth
              id="description"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Detailed description of the issue or request"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
              margin="normal"
            />
          </div>

          <div>
            <Typography variant="h6" gutterBottom>
              Priority
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup row value={priority} onChange={e => setPriority(e.target.value)}>
                {Object.entries(TICKET_PRIORITIES).map(([value, { label, color }]) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={<span style={{ color }}>{label}</span>}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <Typography variant="h6" gutterBottom>
              Category
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup row value={category} onChange={e=> setCategory(e.target.value)}>
                {Object.entries(TICKET_CATEGORIES).map(([value, { label, color }]) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={<span style={{ color }}>{label}</span>}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button onClick={onCancel} variant="outlined" color="secondary" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<Send />}
              disabled={isSubmitting}
              style={{ marginLeft: '16px' }}
            >
              {isSubmitting ? 'Creating...' : 'Create Ticket'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewTicketForm;
