import React, { useState } from 'react';
import { Menu } from 'antd';
import './index.css'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo1.svg';
import faq from '../../assets/images/Faq.svg';
import emi from '../../assets/images/Emi.svg';
import logout from '../../assets/images/Log-Out.svg';
import chart from '../../assets/images/Chart-Edit.svg';
import union from '../../assets/images/arrow.svg';
import dashboard from '../../assets/images/Dashboard.svg';
import check1 from '../../assets/images/Status.svg';
import check2 from '../../assets/images/Settings.svg';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('');
    const navigate = useNavigate();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleClick = (e) => {
        console.log('Clicked: ', e);
        setSelectedKey(e.key);
    };

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div style={{ width: 250 }} className="menuitem">
            <Menu
                className="menu"
                defaultSelectedKeys={['0']}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                onClick={handleClick}
                selectedKeys={[selectedKey]}
            >
                <Menu.Item className="logo" icon={<img src={logo} width={25} height={25} alt="Logo"></img>}>
                    Loan Accelerator
                </Menu.Item>
                <hr />
                <Menu.Item icon={collapsed ? <img src={union} alt="Toggle" /> : <img src={logout} alt="Toggle" />} onClick={toggleCollapsed}></Menu.Item>

                <Menu.Item key="1" icon={<img src={dashboard} alt="Chart"></img>} title="Dashboard" className="options">
                    &nbsp;&nbsp; Dashboard
                </Menu.Item>

                <Menu.Item key="2" icon={<img src={chart} alt="Chart"></img>} title="Apply Loan" className="options">
                    &nbsp; &nbsp; Apply Loan
                </Menu.Item>

                <Menu.Item key="3" icon={<img src={check1} alt="status"></img>} title="View Status" className="options">
                    &nbsp; &nbsp; View Status
                </Menu.Item>

                <Menu.Item key="4" icon={<img src={emi} alt="EMI"></img>} title="EMI Calculator" className="options">
                    &nbsp; &nbsp;  EMI Calculator
                </Menu.Item>

                <Menu.Item key="5" icon={<img src={faq} alt="FAQ"></img>} title="FAQ's" className="options">
                    &nbsp; &nbsp; FAQ's
                </Menu.Item>

                <Menu.Item key="6" icon={<img src={check2} alt="settings"></img>} title="Settings" className="options">
                    &nbsp; &nbsp; Settings
                </Menu.Item>

                <Menu.Item key="7" icon={<img src={logout} alt="Logout"></img>} title="Logout" className='logout' onClick={handleLogout} >
                    &nbsp;    Logout
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default Sidebar;

