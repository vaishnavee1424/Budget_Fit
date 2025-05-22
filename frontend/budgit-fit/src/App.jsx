import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/UserContext';
import {Toaster} from 'react-hot-toast';
import './index.css'; // Make sure this import exists

const App = () => {
  return (
    <UserProvider>
      <div className="app-container">
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Home />} />
            <Route path='/income' element={<Income />} />
            <Route path='/expense' element={<Expense />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Router>
        <Toaster 
          position="top-center"
          toastOptions={{
            className: "toast",
            style: {
              fontSize: '14px',
              padding: '12px 16px',
              borderRadius: '8px',
              maxWidth: '100%',
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};