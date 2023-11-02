import React, { useState, useContext } from 'react';
import { Button, Modal, notification } from 'antd';
import './index.css';
import loan_logo from '../../../assets/images/pdflogo.png';
import check_circle from '../../../assets/images/Circle-Check.svg';
import axios from '../../../axios'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Component3 from '../../Component3';
import { ApiContext } from '../../../apicontext/ApiContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import { updatedeclaration } from '../../../service/DeclarationService'
import { useNavigate } from 'react-router-dom';

const DeclarePopup = ({ loanid, Purpose, ExAmount, tenure, formData13, checkboxChecked }) => {
    const getToken = localStorage.getItem('token');
    const decodedToken = jwt_decode(getToken);

    const { loanTypeId, loanCategoryId, NewAmount, NewTenure, NewFullName, NewDob, NewTaxId, NewPermanent, stage, setStage,
        NewMobile1, NewTelephone, NewSpouse, NewMobile3, NewRelationship, NewContact, NewMobile2, NewCompName,
        NewPhone, NewDesignation, NewIncome, NewExpenses, setNewIncome, setNewExpenses, NewApplicationId, NewDateOfBirth, NewAppliedDate } = useContext(ApiContext);

    console.log(stage);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const isValidExAmount = /^\d+$/.test(ExAmount);
    const isValidPurpose = /^[a-zA-Z\s]+$/.test(Purpose);

    const showModal = async () => {
        if (!ExAmount || !Purpose) {
            notification.error({
                message: "Error",
                description: "Please enter values for Purpose and Amount.",
                placement: "top"
            });
            return;
        } else if (!isValidPurpose && !isValidExAmount) {
            notification.error({
                message: "Error",
                description: "Purpose should contain only text characters.",
                placement: "top"
            });
            return;
        } else if (!isValidPurpose) {
            notification.error({
                message: "Error",
                description: "Purpose should contain only text characters.",
                placement: "top"
            });
            return;
        } else if (!checkboxChecked) {
            notification.error({
                message: "Error",
                description: "Please Agree to the Terms and Conditions",
                placement: "top"
            });
            return;
        }
        else {
            console.log(Purpose, ExAmount);
            const values = {
                loanId: loanid,
                userId: decodedToken.nameid,
                loanCategoryId: loanCategoryId,
                loanTypeId: loanTypeId,
                appliedAmount: NewAmount,
                requestedTenure: NewTenure,
                appliedDate: NewAppliedDate,
                purpose: Purpose,
                applicationId: NewApplicationId,
                statusId: 1,
                expenditureAmount: ExAmount,
            };
            console.error(values);
            const putResponse = await updatedeclaration(loanid, values);
             console.log('PUT Response:', putResponse.data);
            setOpen(true);
            setNewIncome(formData13.salary);
            setStage(8);
            setNewExpenses(
                parseInt(formData13.rent) +
                parseInt(formData13.rentandutility) +
                parseInt(formData13.education) +
                parseInt(formData13.food) +
                parseInt(formData13.other1) +
                parseInt(formData13.other2) +
                parseInt(formData13.repayment)

            );
        }
    };
    const navigate = useNavigate();
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 2000);
        navigate('/customer-dashboard');
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const modalBodyStyle = {
        textAlign: 'center',
        padding: '5px 10px',
    };

    const headingStyle = {
        fontSize: '24px',
        color: '#2C76C9',
        marginTop: '20px',
    };

    const paragraphStyle = {
        marginLeft: '115px',
        fontSize: '20px',
        color: '#555',
        width: '600px',
        marginTop: '30px',
    };

    const imageStyle = {
        width: '70px',
        height: 'auto',
        marginTop: '40px',
    };


    const generatePDF = () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFontSize(12);


        const lineHeight = 10;
        const marginLeft = 5;
        const marginTop = 20;
        const contentWidth = 190;
        const imageWidth = 10;

        const component3Content = [
            `Application Id: ${NewApplicationId}`,
            `Amount: ${NewAmount}`,
            `Tenure: ${NewTenure}`,
            `DOB: ${NewDateOfBirth}`,
            `Full Name: ${NewFullName}`,
            `Tax Id: ${NewTaxId}`,
            `Permanent Address: ${NewPermanent}`,
            `Mobile 1: ${NewMobile1}`,
            `Telephone: ${NewTelephone}`,
            `Spouse: ${NewSpouse}`,
            `Mobile 3: ${NewMobile3}`,
            `Relationship: ${NewRelationship}`,
            `Contact: ${NewContact}`,
            `Mobile 2: ${NewMobile2}`,
            `Company Name: ${NewCompName}`,
            `Phone: ${NewPhone}`,
            `Designation: ${NewDesignation}`,
            `Income: ${NewIncome}`,
            `Expenses: ${NewExpenses}`,
        ];


        // Use the imported image
        const imageUrl = loan_logo; // Replace with the imported image
        pdf.addImage(imageUrl, 'png', 60, 5, imageWidth, 0);
        pdf.setFontSize(30);
        pdf.text('Loan Accelerator', 75, 15);
        pdf.setFontSize(25);
        pdf.text('Application Form', 75, 35);
        pdf.setFontSize(18);
        const tableData = component3Content.map(line => {
            const [label, value] = line.split(': ');
            return [label, value];
        });

        pdf.autoTable({
            startY: 60,
            body: tableData,
            theme: 'striped',
            styles: {
                cellPadding: 5,
                fontSize: 14,
                textColor: [0, 0, 0],
                fontStyle: 'normal',
                valign: 'middle',
                halign: 'left',
            },
            headStyles: {
                fontStyle: 'bold',
                halign: 'right',
                fillColor: [200, 200, 200],
            },
            columnStyles: {
                0: { cellWidth: contentWidth / 2 },
                1: { cellWidth: contentWidth / 2 },
            },
        });

        // Get the data URI
        const pdfDataUri = pdf.output('datauristring');
        pdf.setFontSize(12);

        pdf.save('application.pdf');
    };



    return (
        <div>
            <Button type="primary" htmlType="submit" onClick={showModal}>
                Submit
            </Button>
            <Modal
                className="custom-modal"
                visible={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={() => {
                            generatePDF(); // Pass amount and tenure here
                            handleOk();
                        }}
                    >
                        Download Application
                    </Button>,
                    <Button
                        key="link"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Go to Dashboard
                    </Button>,
                ]}
                width={900}
                bodyStyle={{
                    height: '300px',
                }}
            >
                <div style={modalBodyStyle}>
                    <img src={check_circle} style={imageStyle} alt="Image" />
                    <h1 style={headingStyle}>Loan Application Submitted Successfully</h1>
                    <p style={paragraphStyle}>
                        Provider will be able to review the application, make updates, sign and submit the application.
                    </p>
                </div>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default DeclarePopup;
