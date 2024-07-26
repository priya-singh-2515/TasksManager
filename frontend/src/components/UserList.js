import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Table, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <Container className=" shadow  p-3 mt-5 rounded" style={{ border: '1px solid #ddd' }}>
      <div className="d-flex justify-content-between">
        <h2>User List</h2>
        <Link to="/add-user">
          <Button variant="primary" className="mb-3 adduser">Add User</Button>
        </Link>
      </div>
      <div className=" mb-3 bg-white">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <Link to={`/edit-user/${user._id}`}>
                    <Button className="me-2" style={{ backgroundColor: 'blue', color: '#fff' }}>Edit</Button>
                  </Link>
                  <Button style={{ backgroundColor: 'red', color: '#fff' }} onClick={() => handleDelete(user._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default UserList;
