const getStatusColor = (status) => {
  switch (status) {
    case "open":
      return "bg-green-200 text-green-800"; 
    case "in-progress":
      return "bg-blue-200 text-blue-800"; 
    case "closed":
      return "bg-gray-300 text-gray-800"; 
    default:
      return "bg-gray-100 text-gray-600"; 
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-200 text-red-800"; 
    case "low":
      return "bg-green-200 text-green-800"; 
    case "critical":
      return "bg-orange-200 text-orange-800"; 
    default:
      return "bg-gray-100 text-gray-600"; 
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case "network":
      return "bg-indigo-200 text-indigo-800";
    case "authentication":
      return "bg-yellow-200 text-yellow-800"; 
    case "feedback":
      return "bg-pink-200 text-pink-800"; 
    case "issue":
      return "bg-teal-200 text-teal-800"; 
    default:
      return "bg-gray-100 text-gray-600"; 
  }
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

const STATUS_CATEGORIES = {
  open: { label: 'Open', color: 'red' },
  progress: { label: 'In-progress', color: 'blue' },
  closed: { label: 'Closed', color: 'green' },
};


export { getStatusColor, getCategoryColor, getPriorityColor,TICKET_PRIORITIES,TICKET_CATEGORIES,STATUS_CATEGORIES };
