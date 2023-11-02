import React, { useState } from 'react';
import { Row, Col, Typography, Input, Button, Card, message } from 'antd';
import customer from '../../assets/images/Customer.svg';
import manages from '../../assets/images/Manager.svg';
import group from '../../assets/images/LoanAcceleratorLogo.svg';
import axios from '../../axios';
import jwt_decode from 'jwt-decode';
import { Link as RouterLink, Link, useNavigate } from 'react-router-dom';
import RegisterCss from './RegisterComponent.module.css';
const { Title, Text } = Typography;

const Register = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateName = (name) => {
    if (name.trim() === '') {
      return 'Name is required';
    }
    if (/\d/.test(name)) {
      return 'Name should not contain numbers';
    }
    return '';
  };

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
      return 'Invalid password';
    }
    return '';
  };

  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    setNameError(validateName(nameValue));
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
    if (selectedRole === '' || nameError || emailError || passwordError) {
      return;
    }

    try {
      const response = await axios.post('/user/register', {
        role: selectedRole,
        emailId: email,
        password: password,
        fullName: name,
        isActive: 'true',
      });
      message.success('Registered successfully!')
      const encodedToken = response.data.token;
      localStorage.setItem('token', encodedToken);
      const decodedToken = jwt_decode(encodedToken);
      const userRole = decodedToken['role'];
      if (userRole === 'manager' || userRole === 'Manager') {
        message.success("Registered as Manager Successfully")
        console.log('Navigating to adminDashboard');
        navigate('/applied-loan');
      } else if (userRole === 'customer' || userRole === 'Customer') {
        navigate('/customer-dashboard');
        message.success("Registered Successfully");
      }

    } catch (error) {
      if (error.response) {
        message.error('Registration failed. Please try again.');
      } else {
        message.error('An error occurred. Please check your network connection.');
      }
    }
  };


  return (

    <div id={RegisterCss.text}>
      <div>
        <div id={RegisterCss.image}>
          <img src={group} alt=" Loan Accelerator " />
          <h2><span id={RegisterCss.loanAcc}>Loan</span> Accelerator</h2>
        </div>
        <Title level={3} id={RegisterCss.sign}>
          Sign Up
        </Title>
        <Title level={5} id={RegisterCss.pls}>
          Please select your role
        </Title>
        <br />
        <br />
        <div id={RegisterCss.sg}>
          <Row justify="center" gutter={16}>
            <Col>
              <Card
                style={{ width: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '140px' }}
                className={`${RegisterCss.log} ${selectedRole === 'Customer' ? RegisterCss.selected : ''}`}
                hoverable
                onClick={() => handleRoleSelect('Customer')}
              >
                <img src={customer} alt="" />
                <br />
                <br />
                <Text id='text1' className={selectedRole === 'Customer' ? 'selectedText' : ''}>Customer</Text>
              </Card>
            </Col>
            <Col>
              <Card
                style={{ width: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '140px' }}
                className={`${RegisterCss.log1} ${selectedRole === 'Manager' ? RegisterCss.selected : ''}`}
                hoverable
                onClick={() => handleRoleSelect('Manager')}
              >
                <img src={manages} alt="" />
                <br />
                <br />
                <Text id='text1' className={selectedRole === 'Manager' ? 'selectedText' : ''}>Manager</Text>
              </Card>
            </Col>
          </Row>
        </div>
        <label id={RegisterCss.label1}>Full Name</label>
        <Input
          type="text"
          id={RegisterCss.email}
          name="name"
          value={name}
          onChange={handleNameChange}
          error={Boolean(nameError)}
          placeholder="Full Name"
        />
        {nameError && <div className={RegisterCss.errormessage}>{nameError}</div>}

        <label id={RegisterCss.label_email}>Email ID</label>
        <Input
          type="text"
          className={RegisterCss.email_input}
          name="mail"
          value={email}
          onChange={handleEmailChange}
          error={Boolean(emailError)}
          placeholder="name@email.com"
        />
        {emailError && <div className={RegisterCss.errormessage}>{emailError}</div>}

        <label className={RegisterCss.label_password}>Password</label>
        <Input.Password
          className={RegisterCss.password_input}
          name="Password"
          value={password}
          onChange={handlePasswordChange}
          error={Boolean(passwordError)}
          placeholder="at least 8 characters"
        />
        {passwordError && <div className={RegisterCss.errormessage}>{passwordError}</div>}

        <Button type="primary" className={RegisterCss.submit_register} onClick={handleSubmit}>
          SIGN UP
        </Button>
        <Typography id={RegisterCss.existinguser}>

          Existing User?  <Link component={RouterLink} to="/">Login Here </Link>
        </Typography>
      </div>
    </div>

  );
};

export default Register;
