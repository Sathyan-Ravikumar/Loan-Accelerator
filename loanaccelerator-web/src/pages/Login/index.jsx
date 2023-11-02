import React from 'react';
import { Row, Col  } from 'antd';
import LoginRegister from '../../components/LoginRegister';
import LoginComponent from '../../components/LoginComponent';


 const Login = () =>{
 
return (
 
    <Row gutter={24} id="container">
        <Col xs={24} md={15}>
        <LoginRegister />
        </Col>
        <Col xs={24} md={9}>
        <LoginComponent />
        </Col>
</Row>
 );
}
export default  Login ;