import React, { useState } from 'react';
import './index.css';
import logout from '../../assets/images/Log-Out.svg';
import logo from '../../assets/images/logo.svg';
import back from '../../assets/images/back.png';
import forward from '../../assets/images/forward.png';
import { useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  ContainerOutlined,
  CodeSandboxOutlined,
  UserOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
 









const Sidenavbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleImageClick = (imageIndex) => {
    // Handle your image click logic here
    console.log('Image clicked:', imageIndex);
  };
  const navigate = useNavigate();  
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    navigate('/');
  };
const items = [
  
  getItem('Dashboard', '1', <AppstoreOutlined />),
  getItem('Loan Origination', '2', <ContainerOutlined />),
  getItem('Loan Products', 'sub1', <CodeSandboxOutlined />, [
    getItem(' Loan Analytics', '3'),
    getItem(' Loan Centric View', '4'),
    getItem(' Superset Dashboard', '5'),
  ]),
  getItem('Customer Scapte', '6', <UserOutlined />),
  getItem('Applied Loans', '7', <CheckOutlined />),
  getItem('','8'),
  getItem('','9'),
  getItem('','10'),
  getItem('','11'),
  getItem('','12'),
  getItem('','13'),
  getItem('','14'),
  getItem('','15'),
  
  
  getItem('Logout', '16', <img src={logout}  onClick={handleLogout}/>, null, 'item', {
    style: {
       
      bottom: 16,
      left: 16}
  })

];
  return (
    <div  className={`maincontent ${collapsed ? 'collapsed' : ''}`}>
      <div
        style={{
          width: 256,
        }}
      >

         <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={logo}
        alt="Logo"
         
        style={{
          width: '23.83px',
          marginRight: '8px',
          height: '25px',
          marginLeft:'10px'
 
        }}
      /> 
     <div className='text'> {!collapsed && ( <span style={{ color: 'white' }}> LOAN ACCELERATOR</span>)} </div>
    </div>
        <div className='divi'><hr/></div>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
            backgroundColor: '#2C76C9',
             
            
          }}
        >
          {collapsed ? (
            <img
              src={forward}
              alt="Forward"
              onClick={() => handleImageClick(1)}
              style={{ cursor: 'pointer', width: 16, height: 16, top: 80.32, left: 48, backgroundColor: '#2C76C9' }}
            />
          ) : (
            <img
              src={back}
              alt="Back"
              onClick={() => handleImageClick(2)}
              style={{ cursor: 'pointer', width: 16, height: 16, top: 80.32, left: 48, backgroundColor: '#2C76C9' }}
            />
          )}
        </Button>

        <Menu   
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
           
          style={{
            backgroundColor: '#2C76C9', 
            color: 'white',
            marginLeft: '-12px',
            marginRigth:'200px',
             
            
          }}
        />
        
         
  
      </div></div>
  );
};

export default Sidenavbar;

