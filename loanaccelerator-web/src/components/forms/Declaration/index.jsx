import React, { useState ,useContext } from "react";
import { Input, Checkbox, Space, Button, Model } from "antd";
import { CaretRightOutlined } from '@ant-design/icons';
import DeclarePopup from "../DeclarePopup";
import { Form } from "antd";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const Declaration = ({ loanId, fullname, amount, onBackStep, onNext, onPrev, setFormData14, formData13 }) => {


    const [purpose, setPurpose] = useState();
    const [examount, setAmount] = useState();
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    console.log("Declaration : " + loanId)
    const handleBack = async (e) => {
        e.preventDefault();

        try {

            setFormData14('');
            onPrev();
            onBackStep();
        } catch (error) {
            console.log(error);
        }
    };
    const mainStyle = {
        marginTop: '40px',
    };

    const secondaryTextStyle = {
        color: '#626D8A',
        fontSize:'20px',
        fontWeight: '400',
        padding: '10px',
    };

    const primaryTextStyle = {
        color: '#042747',
         fontSize: '24px',
         fontWeight: '200',
         lineHeight: '28px',
         padding: '10px',
    };

    const mainContentStyle = {
        width: '740px',
        height: '80px',
        fontFamily: 'Roboto',
        fontSize: '17px',
        fontWeight: '400',
        lineHeight: '40px',
        textAlign: 'left',
        padding: '10px',
        marginTop: '-20px',
    };


    const backButtonStyle = {
        color: '#928C8C !important',
        backgroundColor: '#fff',
        border: 'none',
     };

    const termsTextStyle = {
        width: '800px',
        color: '#626D8A',
        padding: '10px',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '25px',
        marginTop:'20px',

    };

    const buttonsStyle = {
        marginTop: '27rem',
        marginLeft: '450px',
    };

    return (
        <div className="main" style={mainStyle}>

            <div>
                <div className='primarytext' style={primaryTextStyle}>
                    <h1>Declaration</h1>
                </div>
            </div>
            <div>
                <div className='secondarytext' style={secondaryTextStyle}>
                    <p>Please declare the total value of expenditure for the purpose of loan</p>
                </div>
            </div>
            <div>
                <p className='mainContent' style={mainContentStyle}>
                    
                    I/We <b>{fullname}</b> like to obtain a personal loan of<b> <FontAwesomeIcon icon={faIndianRupeeSign} /> {amount} </b>for the purpose of <Input className="customInput" style={{width:'120px',border:'none',borderBottom:'1.5px solid black',outline: 'none'}} value={purpose}
                        onChange={e => setPurpose(e.target.value)} required /> expected expenditure for this purpose will be approx <Input type="number" className="customInput" style={{width:'120px',border:'none',borderBottom:'1.5px solid black',outline: 'none'}} value={examount}
                        onChange={e => setAmount(e.target.value)} required /> .
                </p>
            </div>
            <div className="termstext" style={termsTextStyle}>
                <Checkbox checked={checkboxChecked} 
                    onChange={(e) => setCheckboxChecked(e.target.checked)}></Checkbox><span> I/We also understand the maxium amount of loan will be determined by the bank at its discretion if approved.
                    However the bank reserves the right to accept or reject my application at its discretion without assigning any notice whatsoever.</span>
            </div>

            <div className='buttons' style={buttonsStyle}>
                <Space>
                    <Button onClick={handleBack} style={{marginRight:'30px',border:'none',fontSize:'18px',color: '#928C8C',fontWeight: '400',lineHeight: 'normal',letterSpacing: '0.36px'}}>
                        BACK
                    </Button>
                    {<DeclarePopup loanid={loanId} Purpose={purpose} ExAmount={examount} formData13={formData13} checkboxChecked={checkboxChecked} />}
                </Space>
            </div>
        </div>
    );
}

export default Declaration;