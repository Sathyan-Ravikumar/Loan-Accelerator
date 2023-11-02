import React, { useState, useContext } from 'react';
import { Typography, Input, Button, message } from 'antd';
import group from '../../assets/images/LoanAcceleratorLogo.svg';
import axios from '../../axios';
import { Link, useNavigate, Link as RouterLink } from 'react-router-dom';
import LoginComponentCss from './Login.module.css';
import jwt_decode from 'jwt-decode';
import { ApiContext } from '../../apicontext/ApiContext';
const { Title, Text } = Typography;

const Login = () => {

  const { token, setToken } = useContext(ApiContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email';
    }
    return '';
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.';
    }
    return '';
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailError(validateEmail(emailValue));
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setPasswordError(validatePassword(passwordValue));
  };
  const handleSubmit = async () => {

    if (emailError) {
      message.error('Invalid Email');
      return;
    }
    if (passwordError) {
      message.error('Password must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, one digit,and one special character.');
      return;
    }
    try {
      const response = await axios.post('/user/login', {
        emailId: email,
        password: password,
      });
      const encodedToken = response.data.token;
      localStorage.setItem('token', encodedToken);
      const decodedToken = jwt_decode(encodedToken);
      const userRole = decodedToken['role'];
      setToken(decodedToken);
      if (userRole === 'manager' || userRole === 'Manager') {
        message.success("Logged in as Manager Successfully")
        console.log('Navigating to adminDashboard');
        navigate('/applied-loan');
      } else if (userRole === 'customer' || userRole === 'Customer') {
        navigate('/customer-dashboard');
        message.success("Logged in as Customer Successfully")
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
    } 
  };

  return (

    <div id={LoginComponentCss.text}>
      <div>
        <div id={LoginComponentCss.img}>
          <img src={group} alt=" Loan Accelerator " />
          <h2><span id={LoginComponentCss.loanAcc}>Loan</span> Accelerator</h2>
        </div>

        <Title level={3} id={LoginComponentCss.sign}>
          Sign In
        </Title>

        <label className={LoginComponentCss.label1}>Email ID</label>
        <Input
          type="text"
          className={LoginComponentCss.email}
          name="mail"
          value={email}
          onChange={handleEmailChange}
          error={Boolean(emailError)}
          placeholder="name@email.com"
        />

        <label className={LoginComponentCss.label2}>Password</label>
        <Input.Password
          className={LoginComponentCss.password}
          name="Password"
          value={password}
          onChange={handlePasswordChange}
          error={Boolean(passwordError)}
          placeholder="at least 8 characters"
        />

        <Link component={RouterLink} to="/forgotpassword">
          <Text className={LoginComponentCss.forgot_password}>Forgot your password?</Text>
        </Link>

        <Button type="primary" className={LoginComponentCss.submit} onClick={handleSubmit}>
          SIGN IN
        </Button>

        <Typography id={LoginComponentCss.newuser}>
          New User? Create a  <Link component={RouterLink} to="/register">New Account </Link>
        </Typography>

      </div>
    </div>
  );
};

export default Login;