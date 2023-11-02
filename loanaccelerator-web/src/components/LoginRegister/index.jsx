import React  from 'react';
import logo from '../../assets/images/logo.svg';
import image from '../../assets/images/Customer Dashboard 1.svg';
import LoginRegisterCss from "./index.module.css"
const LoginRegister = () => {
    return (
<body>
<div id={LoginRegisterCss.background}>
            <span id={LoginRegisterCss.ray}></span>
            <span id={LoginRegisterCss.ray1}></span>
            <div>
                <img src={logo} alt="Logo" id={LoginRegisterCss.logo} />
                <p id={LoginRegisterCss.welcome}>
                    Welcome to <span id={LoginRegisterCss.lon}>Loan Accelerator</span>
                </p>
                <p id={LoginRegisterCss.words}>Login to access your account</p>
            </div>
            <img src={image} alt="Image" id={LoginRegisterCss.image} />
        </div>
</body>
       
    );
};
export default LoginRegister;