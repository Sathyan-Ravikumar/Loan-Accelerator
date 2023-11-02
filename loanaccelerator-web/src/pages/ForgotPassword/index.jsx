import React from 'react';
import { Row, Col  } from 'antd';
import LoginRegister from '../../components/LoginRegister';
import ForgotPasswordComponent from '../../components/ForgotPasswordComponent';


const ForgotPassword = () =>{
return (
 
    <Row gutter={24} id="container">
        <Col xs={24} md={15}>
        {/* <LoginRegister /> */}
        <LoginRegister />
        </Col>
        <Col xs={24} md={9}>
        <ForgotPasswordComponent />
        </Col>
</Row>
 );
}
export default ForgotPassword ;