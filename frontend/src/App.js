import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditUser from './pages/EditUser';
import UserForm from './components/UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-user" element={<UserForm />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
