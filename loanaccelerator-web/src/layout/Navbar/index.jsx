import React,{useEffect} from 'react';
import './index.css';
import { Input,Tooltip,Avatar } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import notification from "../../assets/images/NotificationBell.svg";
import query from "../../assets/images/query.svg"
import jwt_decode from 'jwt-decode';

const bellIconStyle = {
    backgroundColor: "transparent",
    color: "#1890ff",
    fontSize: "24px",
    fontWeight: "bold",
    border: "none",
    outline: "none",
};


const Navbar = () => {
    const getToken = localStorage.getItem('token');
    const decodedToken = jwt_decode(getToken);
    const multilineText = `
    Name : ${decodedToken.FullName}
    Email : ${decodedToken.email}
    CustomerID : ${decodedToken.CustomerId}
  `;
  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);
    return (
        <div>
            <div className="row6383871353" >
                <div className="fullnavbar">
                    <div className="nav216383871353" >
                        <Input className='searchbarinnav' prefix={<SearchOutlined style={{ fontSize: '18px', marginLeft: '5px', marginRight: '5px', color: '#626D8A' }} />} placeholder="Search" />
                    </div>
                    <div className="needtoflex">
                        <div className="nav226383871353" >
                             <img src={query} />
                        </div>
                        <div className="nav226383871353">
                           
                            <img src={notification} />
                        </div>
                        <Tooltip title={<pre style={{fontFamily:'Roboto',color:'black',fontSize:'16px',borderRadius:'10px',padding:'5px'}}>{multilineText}</pre>} color = '#f4f8fc'>
                        <div className="nav226383871353"><Avatar icon={<UserOutlined />} />             
                        </div>
                        </Tooltip>
                    </div>
                </div>
            </div>

        </div>

    )


}

export default Navbar;
