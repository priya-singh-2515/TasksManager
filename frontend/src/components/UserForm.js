import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './User.css';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/users/${id}`).then((response) => {
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setMobile(user.mobile);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, mobile };

    try {
      if (id) {
        await axios.put(`http://localhost:5000/users/${id}`, user);
        toast.success('User updated successfully!');
      } else {
        await axios.post('http://localhost:5000/users', user);
        toast.success('User added successfully!');
      }
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <Container className="mt-5">
      <h2>{id ? 'Edit User' : 'Add User'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </Form.Group>
        <Form.Group controlId="formMobile">
          <Form.Label>Mobile</Form.Label>
          <Form.Control 
            type="text" 
            value={mobile} 
            onChange={(e) => setMobile(e.target.value)} 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;
