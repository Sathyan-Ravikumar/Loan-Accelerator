import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Divider, Drawer, Slider, message } from 'antd';
import './index.css';
import { Steps } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import CircularImage from '../../assets/images/profileimage.jpeg';
import aadharid from '../../assets/images/aadharid.jpeg';
import signature from '../../assets/images/signature.jpeg';
import LoanApplied from '../../assets/images/LoanApplied.svg';
import Review from '../../assets/images/Review.svg';
import DocumentverificationI from '../../assets/images/DocumentverificationI.svg';
import DocumentverificationII from '../../assets/images/DocumentVerificationII.svg';
import Decision from '../../assets/images/Decision.svg';
import Kyceligibility from '../../assets/images/Kyceligibility.svg';
import Loandefault from '../../assets/images/Loandefault.svg';
import Overallloan from '../../assets/images/Overallloan.svg';
import axios from '../../axios';
import { ApiContext } from '../../apicontext/ApiContext';
import { Link as RouterLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Warning from '../../assets/images/Union.svg';
import tickmark from '../../assets/images/tickmark.svg';
import xmark from '../../assets/images/xmark.svg';
import Sidenavbar from '../../layout/Sidenavbar-Manager';
import Navbar from '../../layout/Navbar';
import Stroke from '../../assets/images/Stroke.svg';
import { right } from '@antv/g2plot/lib/plots/sankey/sankey';
const Approval = () => {
    const today = new Date();
    const formattedTodayString = today.toISOString();

    const [pendingUsers, setPendingUsers] = useState([]);
    const [amount, setAmount] = useState();
    const [years, setYears] = useState(1);
    const [interest, setInterest] = useState(1);
    const [images, setImages] = useState([]);
    const [showKycScore, setShowKycScore] = useState(false);
    const [showLoanScore, setShowLoanScore] = useState(false);
    const [showOverallScore, setShowOverallScore] = useState(false);

    const [showMessageContainer, setShowMessageContainer] = useState(true);
    const [showCriteriaContainer, setShowCriteriaContainer] = useState(false);
    const [showReviseButton, setShowReviseButton] = useState(true);

    const { selectedApplicationNumber } = useContext(ApiContext);

    console.log("Application number", selectedApplicationNumber);



    useEffect(() => {
        getData();
        getImages();
    }, []);

    const updateData = {
        ApprovedTenure: years,
        ApprovedDate: formattedTodayString,
        ApprovedAmount: amount,
        Interest: interest,
        StatusId: 2,
    }
         const getImages = async () => {


        try {


            const res = await axios.get('/loanDocuments/loan-documents-by-id/' + selectedApplicationNumber, {
                responseType: 'json',
            });
            const output = res.data.map(item => {
                return {
                    link: item.documentLink,
                }
            })
            setImages(output);
        }
        catch (error) {
            console.log(error);
        }
    }
    console.log(images);

    const getData = async () => {

        try {
            const res = await axios.get('/customer/CustomerDetails/' + selectedApplicationNumber, {
                responseType: 'json',
            });

            const changedData = res.data.map(item => {
                setAmount(item.requestedLoanAmount);
                setYears(item.requestedTenure);
                const birthDate = new Date(item.dob);
                const currentDate = new Date();
                let Age = currentDate.getFullYear() - birthDate.getFullYear();
                if (
                    currentDate.getMonth() < birthDate.getMonth() ||
                    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
                ) {
                    Age--;
                }
                return {
                    userId: item.customerId,
                    customerId: item.customerId,
                    customerName: item.fullname,
                    loanId: selectedApplicationNumber,
                    occupation: item.occupation,
                    annualIncome: item.annualIncome,
                    age: Age,
                    showPhoto: true,
                }
            })
            setPendingUsers(changedData);
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleSeeProof = (userId) => {
        setPendingUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.userId === userId ? { ...user, showPhoto: !user.showPhoto } : user
            )
        );
    };

    const handleExpandCard = (userId) => {
        setPendingUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.userId === userId ? { ...user, expanded: !user.expanded } : user
            )
        );
    };


    const Step = Steps.Step;

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const formatAmount = (value) => `₹${value}`;

    const handleAmountChange = (value) => {
        setAmount(value);
    };

    const formatYears = (value) => `${value}years`;

    const handleYearsChange = (value) => {
        setYears(value);
    }

    const handleInterestChange = (value) => {
        setInterest(value);
    }

    const formatInterest = (value) => `${value}%`

    const updateLoan = async (statusId) => {
        try {
            updateData.StatusId = statusId;
            const putResponse = await axios.put('/loan/loan-approval/' + selectedApplicationNumber, updateData)
            if (statusId === 2) {
                message.success("Updated successfully")
            }
            else {
                message.error("Rejected successfully")
            }

        }
        
        catch (error) {
            message.error("Error in Updating")
            console.log(error)
        }
        console.log("Data",updateData);
    }
    const handleUpdate = () => {
        setShowMessageContainer(false);
        setShowCriteriaContainer(true);
        setShowReviseButton(false);
        setOpen(false);
    };

    return (
        <div className="main-container">
            <Sidenavbar />


            <div className="approval-container">

                <Navbar />
                <h5>Customer details for loan approval</h5>

                <Divider />
                {pendingUsers.map((user) => (
                    <div key={user.userId}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <div style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '10px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <img
                                    src={CircularImage}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                    alt="Profile"
                                />
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p style={{ marginRight: '5px', marginBottom: '0' }}>{user.customerName}</p>
                                        <DownOutlined
                                            style={{ fontSize: '16px', cursor: 'pointer' }}
                                            onClick={() => handleExpandCard(user.userId)}
                                        />
                                    </div>
                                    <p style={{ marginBottom: '5px' }}>Customer ID: {user.customerId}</p>
                                </div>
                            </div>
                        </div>

                        {user.expanded && (
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <Card
                                    title={
                                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <img
                                                src={CircularImage}
                                                style={{ width: '40px', height: '40px', borderRadius: '50%', marginBottom: '5px' }}
                                            />
                                            <p style={{ margin: '0' }}>{`Customer ID: ${user.customerId}`}</p>
                                            <Button className="see-proof-button" onClick={() => handleSeeProof(user.userId)}>
                                                {user.showPhoto ? 'Hide Signature & ID Proof' : 'See Signature & ID Proof'}
                                            </Button>
                                        </div>
                                    }
                                    style={{ width: '500px', height: 'auto', margin: '10px' }}
                                    headStyle={{ backgroundColor: '#1890ff', color: 'white' }}
                                >
                                    {user.showPhoto ? (
                                        <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '70%' }}>
                                            {images.map((image, index) => (
                                                <div key={index} style={{ textAlign: 'center', margin: '0 10px' }}>

                                                    <img
                                                        src={image.link}
                                                        style={{ width: '250px', borderRadius: '8px', display: 'block', margin: '0 auto' }}

                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div>
                                            <p>Customer Name: {user.customerName}</p>
                                            <p>Loan ID: {user.loanId}</p>
                                            <p>Occupation: {user.occupation}</p>
                                            <p>Annual Income: {user.annualIncome}</p>
                                            <p>Age: {user.age}</p>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        )}
                    </div>
                ))}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                <div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {showMessageContainer ? (
                            <div className="message-container">
                                <p className="eligibility">
                                    <img src={Warning} style={{ width: '30px', height: '30px', borderRadius: '5px', backgroundColor: '#F87D7C', padding: '5px' }} />
                                    &nbsp;Actual loan amount cannot be proceeded due to low eligibility score
                                </p>
                            </div>
                        ) : (
                            <div className="criteria-container">
                              
                                  <p className="eligibility-criteria">
                                    <img src={Stroke} style={{ width: '30px', height: '30px', borderRadius: '5px', background: 'rgba(13, 219, 185, 1)', padding: '5px' }} />
                                    &nbsp;Actual loan amount cannot be proceeded due to low eligibility score
                                </p>
                            </div>
                        )}
                        <div>
                            {showReviseButton && (
                                <Button className="revise-button" type="primary" onClick={showDrawer}>
                                    Revise the Eligibility Amount
                                </Button>
                            )}
                        </div>
                    </div>

                    <br></br>

                   
                    <Drawer

                        placement="right"
                        closable={false}
                        onClose={onClose}
                        open={open}

                    >
                        <div style={{ fontSize: '26px', fontWeight: '400', display: 'center', paddingTop: '30px', paddingLeft: '70px' }}>Application Amount</div>

                        <div style={{
                            width: '100px',
                            height: '40px',
                            background: 'lightgray',
                            borderRadius: '10px',
                            padding: '5px',
                            marginLeft: '140px',
                            marginTop: '30px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            fontWeight: '2rem',

                        }}>

                            <div style={{ alignItems: 'center', fontSize: '25px', fontWeight: '400' }}>{amount}</div>

                        </div>


                        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
                            <p style={{ marginBottom: '5px' }}>Loan Amount</p>
                            <Slider
                                min={0}
                                max={1000000}
                                step={100000}
                                value={amount}
                                tipFormatter={formatAmount}
                                onChange={handleAmountChange}
                                style={{ width: '100%', height: '30px' }}
                            />
                            <div className="range-display" style={{ marginTop: '-25px', display: 'flex' }}>
                                <div style={{ fontWeight: '600' }}>0</div>
                                <div style={{ marginLeft: '280px', fontWeight: '600' }}>1,000,000</div>
                            </div>
                        </div>


                        <div style={{ marginBottom: '20px' }}>
                            <p style={{ marginBottom: '5px' }}>Loan Tenure</p>
                            <Slider
                                min={1}
                                max={20}
                                step={1}
                                value={years}
                                tipFormatter={formatYears}
                                onChange={handleYearsChange}
                                style={{ width: '100%', height: '30px' }}
                            />
                            <div className="range-display" style={{ marginTop: '-25px', display: 'flex' }}>
                                <div style={{ fontWeight: '600' }}>1 </div>
                                <div style={{ marginLeft: '320px', fontWeight: '600' }}>20 </div>
                            </div>
                        </div>

                        <div>
                            <p style={{ marginBottom: '5px' }}>Interest Rate</p>
                            <Slider
                                min={0}
                                max={20}
                                step={0.1}
                                value={interest}
                                tipFormatter={formatInterest}
                                onChange={handleInterestChange}
                                style={{ width: '100%', height: '30px' }}
                            />
                            <div className="range-display" style={{ marginTop: '-25px', display: 'flex' }}>
                                <div style={{ fontWeight: '600' }}>0%</div>
                                <div style={{ marginLeft: '300px', fontWeight: '600' }}>20%</div>
                            </div>
                        </div>

                        <button className="update-button" onClick={handleUpdate} style={{ marginTop: '10px' }}>UPDATE</button>


                    </Drawer>

                    <div className="reject-container">
                        <Button className="reject-button" onClick={() => updateLoan(3)}><Link component={RouterLink} to="/applied-loan" style={{textDecoration:'none',color:'white',cursor:'pointer'}}><img src={xmark} style={{ width: '20px', height: '20px', borderRadius: '5px', backgroundColor: '#f44336', padding: '5px' }} />Reject</Link></Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button className="approve-button" onClick={() => updateLoan(2)}><Link component={RouterLink} to="/applied-loan" style={{textDecoration:'none',color:'white',cursor:'pointer'}}><img src={tickmark} style={{ width: '20px', height: '20px', borderRadius: '5px', backgroundColor: '#4caf50', padding: '5px' }} />Approve</Link></Button>
                    </div>
                </div>
                <Card className="stepper">
                    <Steps current={4}>
                        <Step title="Loan Applied" icon={<img src={LoanApplied} alt="Loan Applied" />} description={<div>Completed <ClockCircleOutlined style={{ margin: '0 5px' }} /> May 15, 2020</div>} />
                        <Step title="Review" icon={<img src={Review} alt="Loan Applied" />} description={<div>Completed <ClockCircleOutlined style={{ margin: '0 5px' }} /> May 15, 2020</div>} />
                        <Step title="Document verification I" icon={<img src={DocumentverificationI} alt="Loan Applied" />} description={<div>Completed <ClockCircleOutlined style={{ margin: '0 5px' }} /> May 15, 2020</div>} />
                        <Step title="Document verification II" icon={<img src={DocumentverificationII} alt="Loan Applied" />} description={<div>Completed <ClockCircleOutlined style={{ margin: '0 5px' }} /> May 15, 2020</div>} />
                        <Step title="Decision-On Hold" icon={<img src={Decision} alt="Loan Applied" />} description={<div>Completed <ClockCircleOutlined style={{ margin: '0 5px' }} /> May 15, 2020</div>} />
                    </Steps>
                </Card>
                <br></br>
                <div className="card-row">
                    <Card className="approval-card kyc-card">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <img src={Kyceligibility} alt="KYC Eligibility Image" style={{ width: '50px', marginBottom: '10px' }} />
                            <h5 style={{ color: '#2C76C9', margin: '0' }}>KYC Eligibility Score:</h5>&nbsp;&nbsp;&nbsp;&nbsp;

                            {showKycScore ? (
                                <p className="kyc">55%</p>
                            ) : (
                                <button className="check-button" onClick={() => setShowKycScore(true)} style={{ color: 'rgba(9, 95, 246, 1)' }}> Check Eligibility</button>
                            )}
                        </div>
                    </Card>

                    <Card className="approval-card loan-card">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <img src={Loandefault} alt="Loan Default Score Image" style={{ width: '50px', marginBottom: '10px' }} />
                            <h5 style={{ color: '#2C76C9', margin: '0' }}>Loan Default Score</h5>&nbsp;&nbsp;&nbsp;&nbsp;
                            {showLoanScore ? (
                                <p className="loandefault">24%</p>
                            ) : (
                                <button className="check-probability-button" onClick={() => setShowLoanScore(true)} style={{ color: 'rgba(9, 95, 246, 1)' }}> Check Probability</button>
                            )}
                        </div>
                    </Card>

                    <Card className="approval-card overall-card">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <img src={Overallloan} alt="Overall Loan Eligibility Score Image" style={{ width: '50px', marginBottom: '10px' }} />
                            <h5 style={{ color: '#2C76C9', margin: '0' }}>Overall Loan Eligibility Score</h5>&nbsp;&nbsp;&nbsp;&nbsp;
                            {showOverallScore ? (
                                <p className="overallloan">15%</p>
                            ) : (
                                <button className="check-probability-button" onClick={() => setShowOverallScore(true)} style={{ color: 'rgba(9, 95, 246, 1)' }}> Check Score</button>
                            )}
                        </div>
                    </Card>


                </div>
            </div>
        </div>

    );
};

export default Approval;