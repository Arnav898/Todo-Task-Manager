import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState({
    title: '',
    description: ''
  });
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    fetchTasks();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!task.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (task.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    } else if (task.title.trim().length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    
    if (task.description && task.description.trim().length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data.data);
    } catch (error) {
      setMessage({
        text: 'Error fetching tasks. Please try again.',
        type: 'error'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
   
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      setMessage({
        text: 'Task created successfully!',
        type: 'success'
      });
      setTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      setMessage({
        text: error.response?.data?.error || 'Error creating task',
        type: 'error'
      });
    }
  };

  return (
    <div className="App">
      <h1>Todo Task Manager</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        <button type="submit">Add Task</button>
      </form>
      {message.text && (
        <p className={`message ${message.type}`}>{message.text}</p>
      )}

      <div className="tasks-list">
        <h2>Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span className={`status ${task.status}`}>{task.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App; 