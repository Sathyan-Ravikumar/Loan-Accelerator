import React from 'react';
import { Row, Col, Typography, Input, Button, message } from 'antd';
import LoginRegister from '../../components/LoginRegister';
import RegisterComponent from '../../components/RegisterComponent';


const Register = () =>{
return (
 
    <Row gutter={24} id="container">
        <Col xs={24} md={15}>
        <LoginRegister />
        </Col>
        <Col xs={24} md={9}>
        <RegisterComponent />
        </Col>
</Row>
 );
}
export default Register ;