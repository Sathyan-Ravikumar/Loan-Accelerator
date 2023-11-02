import React from 'react';
import Image from '../../assets/images/LogoN.svg';




const bellIconStyle = {
    backgroundColor: "transparent",
    color: "#1890ff",
    fontSize: "24px",
    fontWeight: "bold",
    border: "none",
    outline: "none",
};

const Logo = () => {
    return (
        <div>
            
                    <div >

                        <div style={{ backgroundColor: "#2C76C9", width: 90, height: 61, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img src={Image} style={{  width:' 25px',height:' 26px' }}></img>
                        </div>
                    </div>
                    
              

        </div>

    )


}

export default Logo;