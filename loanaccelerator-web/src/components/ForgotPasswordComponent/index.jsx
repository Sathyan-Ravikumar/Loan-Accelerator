import React, { useState, useRef } from "react";
import { Typography, Input, Button, message } from 'antd';
import group from '../../assets/images/LoanAcceleratorLogo.svg';
import axios from '../../axios';
import { Link, useNavigate, Link as RouterLink } from 'react-router-dom';
import emailjs from 'emailjs-com';
import ForgotPassword from "./ForgotPassword.module.css";

const { Title, Text } = Typography;

const ForgotPasswordComponent = () => {
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const formDataRef = useRef(null);
    const [otpVerified, setOtpVerified] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState([]);
    const [status, setStatus] = useState('');
    const [showOTPField, setShowOTPField] = useState(true);
    const [generatedOTP, setGeneratedOTP] = useState('');
    const inputRefs = useRef([]);

    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000);
    }
    const handleSendOTP = async () => {
        if (emailError) {
            message.error('Invalid email. Please enter a valid email address.');
            return;
        }
        try {
            // Check if email exists in the database
            const response = await axios.get(`/user/check-email/${email} `);
            console.log(response.data);
            if (response.data) {
                // Email exists, proceed to send OTP
                const newGeneratedOTP = generateOTP();
                setGeneratedOTP(newGeneratedOTP);

                const serviceID = 'Loan_Accelerator';
                const templateID = 'template_otp';
                const userID = 'Ilw2K9cIP-4SZDosa';

                const templateParams = {
                    to_email: email,
                    message: `Your OTP is: ${newGeneratedOTP}`,
                };

                emailjs.send(serviceID, templateID, templateParams, userID)
                    .then(() => {
                        setStatus('OTP sent successfully.');
                        setOTP([]);
                        if (inputRefs.current.length > 0) {
                            inputRefs.current[0].focus();
                        }
                        setTimeout(() => {
                            setGeneratedOTP('');
                        }, 60000);
                    })
                    .catch(() => {
                        setStatus('Failed to send OTP.');
                    });
                setShowOTPInput(true);
                setStatus('OTP sent successfully.');
                setOTP([]);

                if (inputRefs.current.length > 0) {
                    inputRefs.current[0].focus();
                }
                setTimeout(() => {
                    setGeneratedOTP('');
                }, 60000);
            } else {
                setStatus('Email does not exist in the database.');
                message.error('Email is not registered ');
            }
        } catch (error) {
            console.error('Error checking email:', error);
            setStatus('An error occurred while checking email.');
        }
    };

    const handleVerifyOTP = () => {

        const generatedOTPCorrect = parseInt(generatedOTP, 10);
        const userOTPCorrect = parseInt(otp.join(''), 10);


        if (userOTPCorrect === generatedOTPCorrect) {
            setStatus('OTP verified successfully.');
            setOtpVerified(true);
        } else {
            setStatus('Invalid OTP. Please try again.');
            setOtpVerified(false);
            message.error('Invalid OTP. Please try again.');

        }
    };
    const handleArrowNavigation = (index, event) => {
        if (event.key === 'ArrowLeft' && inputRefs.current[index - 1]) {

            inputRefs.current[index - 1].focus();
        } else if (event.key === 'ArrowRight' && inputRefs.current[index + 1]) {

            inputRefs.current[index + 1].focus();
        }
    };

    const handleBackspace = (index, event) => {
        if (event.key === 'Backspace' && !otp[index] && inputRefs.current[index - 1]) {

            const updatedOTP = [...otp];
            updatedOTP[index - 1] = '';
            setOTP(updatedOTP);
            inputRefs.current[index - 1].focus();
        }
    };
    const handleInputChangeOTP = (index, value) => {

        const updatedOTP = [...otp];
        updatedOTP[index] = value.replace(/\D/g, '');

        setOTP(updatedOTP);

        if (value && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };
    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(email)) {
            return 'Invalid email';
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
    };

    const handleSubmit = async () => {
        try {

            if (!otpVerified) {
                message.error('Please verify OTP first.');
                return;
            }

            const emailId = email;
            const newPassword = password;

            const response = await axios.put('/user/update-password', {
                emailId: emailId,
                password: newPassword,
            });

            console.log('Response:', response);

            if (response.status === 200) {
                message.success('Password updated successfully');
                navigate('/');
            } else {
                message.error('An error occurred while updating password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            message.error('An error occurred while updating password');
        }
    };


    return (

        <div id={ForgotPassword.text}>
            <div>
                <div id={ForgotPassword.img}>
                    <img src={group} alt=" Loan Accelerator " />
                    <h2><span id={ForgotPassword.loanAcc}>Loan</span> Accelerator</h2>
                </div>

                <Title level={3} id={ForgotPassword.ftpwd}>
                    Forgot your password?
                </Title>

                <div>
                    {!showOTPInput ? (
                        <div>
                            <label className={ForgotPassword.label1}>Email ID</label>
                            <Input
                                type="text"
                                className={ForgotPassword.forgot_email}
                                name="mail"
                                error={Boolean(emailError)}
                                placeholder="name@email.com"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />

                            <Button type="primary" className={ForgotPassword.submit_forgot} onClick={handleSendOTP}>
                                SEND OTP
                            </Button>
                        </div>
                    ) : (
                        <div className={ForgotPassword.pwd}>
                            <br />
                            {otpVerified ? (
                                <div className={ForgotPassword.pwd1}>
                                    <br />

                                    <div>
                                        <label id={ForgotPassword.newpwd}>New Password</label>
                                        <Input.Password
                                            id={ForgotPassword.pswd}
                                            name="Password"
                                            placeholder="at least 8 characters"
                                            value={password}
                                            onChange={handlePasswordChange}

                                        />
                                        <div id={ForgotPassword.otpbtn1}>
                                            <Button type="primary" onClick={handleSubmit} className={ForgotPassword.verifyotpbutton}>Submit</Button>
                                            <Link component={RouterLink} to="/">
                                                <Button type="primary" id={ForgotPassword.cancelbtn}>Cancel</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={ForgotPassword.otp_input}>
                                    <label id={ForgotPassword.enterotp}>Enter OTP</label>
                                    <div id={ForgotPassword.otpverification}>
                                        {Array.from({ length: 6 }, (_, index) => (
                                            <input
                                                key={index}
                                                type="tel"
                                                value={otp[index] || ''}
                                                onChange={(e) => handleInputChangeOTP(index, e.target.value)}
                                                onKeyDown={(e) => {
                                                    handleArrowNavigation(index, e);
                                                    handleBackspace(index, e);
                                                }}
                                                ref={(el) => (inputRefs.current[index] = el)}
                                                style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    fontSize: '24px',
                                                    margin: '8px',
                                                    textAlign: 'center',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '4px',
                                                    outline: 'none',
                                                    marginTop: '10px'
                                                }}
                                                maxLength={1}
                                                inputMode="numeric"
                                            />
                                        ))}
                                        <div id={ForgotPassword.otpbutton}>
                                            <Button onClick={handleVerifyOTP} className={ForgotPassword.verifyotpbutton}>Verify OTP</Button>
                                            <Link component={RouterLink} to="/">

                                                <Button type="primary" id={ForgotPassword.cancelbtn} >Cancel</Button>
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default ForgotPasswordComponent;

