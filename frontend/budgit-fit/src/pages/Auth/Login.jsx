import React, { useContext, useState } from 'react';
import './Login.css';
import { validateEmail } from '../../utils/helper';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("📧 Email entered:", email); // 👈 DEBUG LOG
    console.log("🔐 Password entered:", password); // 👈 DEBUG LOG

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log("✅ Login Success Response:", response.data); // 👈 DEBUG LOG

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);

         updateUser(user); // If you're using context
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message); // 👈 DEBUG LOG

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="login-container">
        <h3 className="login-title">Welcome Back</h3>
        <p className="login-subtitle">Please enter your details to log in</p>
        <form onSubmit={handleLogin} className="login-form">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@email.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">
            LOGIN
          </button>
          <p className="signup-link">
            Don't have an account?{' '}
            <Link className="signup-anchor" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;



