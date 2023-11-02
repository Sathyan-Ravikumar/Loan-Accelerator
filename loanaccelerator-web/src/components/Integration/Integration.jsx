import React, { useState, useContext ,useEffect } from 'react';
import Logo from '../../Logo/logo';
import { Col, Row } from 'antd';
import number1blue from '../../assets/images/1blue.svg';
import number2 from '../../assets/images/2grey.svg';
import number3 from '../../assets/images/3grey.svg';
import number4 from '../../assets/images/4grey.svg';
import number5 from '../../assets/images/5grey.svg';
import number6 from '../../assets/images/6grey.svg';
import number2blue from '../../assets/images/2blue.svg'
import number3blue from '../../assets/images/3blue.svg'
import number4blue from '../../assets/images/4blue.svg'
import number5blue from '../../assets/images/5blue.svg'
import number6blue from '../../assets/images/6blue.svg'
import Greentick from '../../assets/images/GreenTick.svg';
import triangle from '../../assets/images/SideMenuTriangle.svg'
import uploaddocument from '../../assets/images/Upload.svg'
import personaldetail from '../../assets/images/Personal Loan.svg'
import employee from '../../assets/images/Employment.svg'
import loandetails from '../../assets/images/LoanDetailsandFinancial.svg'
import declaration from '../../assets/images/Declaration.svg'
import '../Stepper/Stepper.css';
import arrowImage from '../../assets/images/SideMenuArrow.svg';
import { Space } from 'antd';
import Loandetails from '../LoanDetails/Loandetails';
import Documents from '../LoanDocuments/documentspage';
import Personal from '../PersonalInformationPage/';
import Addressinfo from '../Addressinformation/Addressinfo';
import Family from '../familyandemergency/family';
import Employement from '../Employement/Employement';
import FinancialInformationForm from '../FinancialInfo/FinancialInfo';
import Declaration from '../Declaration/Declaration';
import Component3 from '../Component3/Component3';
import '../Integration/Integration.css'
import Navbar from '../Navbar/Navbar';
import arrowdas from '../../assets/images/ArrowForm.svg';
import User from '../../assets/images/UserIcon.svg';
import { ApiContext } from '../ApiContext';
import axios from '../../axios';
import moment from 'moment';

function Integration() {

  const { loanid , setloanid ,setNewAmount, setNewTenure, setNewFullName, setNewDob,
     setNewTaxId, setNewPermanent, setNewMobile1, setNewTelephone, setNewSpouse, setNewMobile3, 
     setNewRelationship, setNewContact, setNewMobile2, 
    setNewCompName, setNewPhone, setNewDesignation, setNewIncome, setNewExpenses 
    , setNewDateOfBirth,setReceivedStage,receivedStage} = useContext(ApiContext);

    
  const formRef = React.createRef();

  const [isHiddenVisible, setHiddenVisible] = useState(false);
  const [steps, setSteps] = useState(1);
  const [loanDetailsImage, setLoanDetailsImage] = useState(loandetails);
  const [uploadDocumentsImage, setUploadDocumentsImage] = useState(number2);
  const [Employeeimg, setemployeeimg] = useState(number4);
  const [Pesonalimg, setpersonalimg] = useState(number3);
  const [Financialimg, setFinancialimg] = useState(number5);
  const [Declarationimg, setDeclarationimg] = useState(number6);
  const [uploadDocumentsTextColor, setUploadDocumentsTextColor] = useState('#676D74');
  const [PersonalTextColor, setPersonalTextColor] = useState('#676D74');
  const [EmploymentTextColor, setEmploymentTextColor] = useState('#676D74');
  const [FinancialTextColor, setFinancialTextColor] = useState('#676D74');
  const [DeclarationTextColor, setDeclarationTextColor] = useState('#676D74');
  const [col1ImageContent, setCol1ImageContent] = useState(loanDetailsImage);

  const toggleHidden = () => {
    setHiddenVisible(!isHiddenVisible);
  };

  const arrowImageStyles = {
    width: '20px',
    height: '20px',
    padding: '10px',
  };



  const handleNextFirstStep = () => {
    if (steps === 1) {
      setSteps((prevStep) => prevStep + 1);
      setCol1ImageContent(uploaddocument);
      setUploadDocumentsTextColor('#2C76C9');
    }
  };

  const handleNextSecondStep = () => {
    if (steps === 2) {
      setSteps(3);
      setHiddenVisible(true);
      setCol1ImageContent(personaldetail);
      setUploadDocumentsImage(Greentick);
      setUploadDocumentsTextColor('#BBBBBB');
      setPersonalTextColor('#2C76C9');
    }
  };

  const handleNextThirdStep = () => {
    if (steps === 3) {
      setSteps(4);
      setPersonalTextColor('blue');
    }
  }

  const handleNextFourthStep = () => {
    setSteps((prevStep) => prevStep + 1);
    setPersonalTextColor('#2C76C9');
  }

  const handleNextFifthStep = () => {
    setSteps((prevStep) => prevStep + 1);
    setCol1ImageContent(employee);
    setHiddenVisible(false);
    setpersonalimg(Greentick);
    setPersonalTextColor('#BBBBBB');
    setEmploymentTextColor('#2C76C9');
  }

  const handleNextSixthStep = () => {
    setSteps((prevStep) => prevStep + 1);
    setCol1ImageContent(loandetails);
    setemployeeimg(Greentick);
    setEmploymentTextColor('#BBBBBB');
    setFinancialTextColor('#2C76C9');
  }

  const handleNextSeventhStep = () => {
    setSteps((prevStep) => prevStep + 1);
    setCol1ImageContent(declaration);
    setFinancialimg(Greentick);
    setDeclarationTextColor('#2C76C9');
    setFinancialTextColor('#BBBBBB');
    setNewAmount(formDataOne.amount);
    setNewTenure(formDataOne.tenure);
    setNewFullName(formDataThree.fullname);
    setNewDob(formDataThree.dob);
    setNewTaxId(formDataThree.taxid);
    setNewPermanent(formDataFour.permanent);
    setNewMobile1(formDataFour.mobile1);
    setNewTelephone(formDataFour.telephone);
    setNewSpouse(formDataFive.spouse);
    setNewMobile3(formDataFive.mobile1);
    setNewRelationship(formDataFive.relationship);
    setNewContact(formDataFive.contact);
    setNewMobile2(formDataFive.mobile2);
    setNewCompName(formDataSix.name);
    setNewPhone(formDataSix.phone);
    setNewDesignation(formDataSix.designation);
    setNewIncome(formDataSeven.salary);
    setNewExpenses(formDataSeven.rent);
  }





  const handleBackSecondStep = () => {

    if (steps === 2) {
      setSteps(1);
      setLoanDetailsImage(number1blue);
      setCol1ImageContent(loandetails);
      setHiddenVisible(false);
      setUploadDocumentsTextColor('#676D74');
      setUploadDocumentsImage(number2);
  // setFormDataSecondOne(value);

// if(receivedStage == 3)
// {
  
// }
// if(receivedStage == 4)
// {
  
// }
// if(receivedStage == 5)
// {
  
// }
// if(receivedStage == 6)
// {
  
// }
// if(receivedStage == 7)
// {
  
// }
    }
  };

  const handleBackThirdStep = () => {
    setSteps((prevStep) => prevStep - 1);
    setHiddenVisible(false);
    setCol1ImageContent(uploaddocument);
    setUploadDocumentsTextColor('#2C76C9');
    setPersonalTextColor('#676D74');
    setpersonalimg(number3);
  };

  const handleBackFourthStep = () => {
    setSteps((prevStep) => prevStep - 1);
  }

  const handleBackFifthStep = () => {
    setSteps((prevStep) => prevStep - 1);
  }

  const handleBackSixthStep = () => {
    setSteps((prevStep) => prevStep - 1);
    setHiddenVisible(true);
    setEmploymentTextColor('#676D74');
    setCol1ImageContent(personaldetail);
    setPersonalTextColor('#2C76C9');
    setemployeeimg(number4);
  }

  const handleBackSeventhStep = () => {
    setSteps((prevStep) => prevStep - 1);
    setEmploymentTextColor('#2C76C9');
    setHiddenVisible(false);
    setCol1ImageContent(employee);
    setFinancialTextColor('#676D74');
    setFinancialimg(number5)
  }

  const handleBackEighthStep = () => {
    setSteps((prevStep) => prevStep - 1);
    setFinancialTextColor('#2C76C9');
    setHiddenVisible(false);
    setCol1ImageContent(loandetails);
    setDeclarationTextColor('#676D74');
  }

  const getPrevData =  () => {
    console.log("ReceivedStage",receivedStage);
    console.log("LoanId",loanid);
    if (receivedStage!== null){
      const PrevData = axios.get('/loan/loan-by-loanId/'+loanid);
      console.log("Previous Data",PrevData.data);
      const formattedDate = moment(PrevData.data.appliedDate).format('YYYY-MM-DD');

      const values = {
        amount:PrevData.data.appliedAmount,
        tenure:PrevData.data.requestedTenure,
        applieddate: moment(formattedDate),
        // applieddate: formattedDate,
      }
      setFormDataOne(values);
      setFormDataSecondOne(values);
      formRef.current.setFieldsValue(values); 
      console.log(formRef);

    }
  }


  const [step, setStep] = useState(1);

  useEffect(() => {
    
    // if (receivedStage !== null) {
    //   console.log(receivedStage);
    //   console.log("useEffect");
    //   setStep(receivedStage);
    // }
    // console.log(loanid);

// if(receivedStage == 2)
// {
//   console.log("in axios2");
//   const value = axios.get('loan/loan-by-loanId/'+loanid); 
//   console.log(value);
//   setFormDataOne(value);
//   setFormDataSecondOne(value);
// }
// if(receivedStage == 3)
// {
  
// }
// if(receivedStage == 4)
// {
  
// }
// if(receivedStage == 5)
// {
  
// }
// if(receivedStage == 6)
// {
  
// }
// if(receivedStage == 7)
// {
  
// }
  }, []);

  const [success, setsuccess] = useState('');

  const [formDataOne, setFormDataOne] = useState({
    amount: null,
    tenure: null,
    applieddate: null
  });

  const [formDataSecondOne, setFormDataSecondOne] = useState({
    amount: null,
    tenure: null,
    applieddate: null
  });
  
  const [formDataTwo, setFormDataTwo] = useState({
    employement: null,
    occupation: null,
    finance: null
  });
  
  const [formDataSeondTwo, setFormDataSecondTwo] = useState({
    employement: null,
    occupation: null,
    finance: null
  });
  
  const [formDataThree, setFormDataThree] = useState({
    fullname: null,
    dob: null,
    district: null,
    country: null,
    taxid: null,
    education: null,
    resident: null,
    residing: null,
    gender: null,
    existing: null,
    father: null,
    mother: null,
    nationalid: null,
    doi: null,
    coi: null,
    nationality: null,
    marital: null
  });
  
  const [formDataSecondThree, setFormDataSecondThree] = useState({
    fullname: null,
    dob: null,
    district: null,
    country: null,
    taxid: null,
    education: null,
    resident: null,
    residing: null,
    gender: null,
    existing: null,
    father: null,
    mother: null,
    nationalid: null,
    doi: null,
    coi: null,
    nationality: null,
    marital: null
  });
  
  const [formDataFour, setFormDataFour] = useState({
    present: null,
    permanent: null,
    district: null,
    country: null,
    emailid: null,
    mobile1: null,
    mobile2: null,
    telephone: null
  });
  
  const [formDataSecondFour, setFormDataSecondFour] = useState({
    present: null,
    permanent: null,
    district: null,
    country: null,
    emailid: null,
    mobile1: null,
    mobile2: null,
    telephone: null
  });
  
  const [formDataFive, setFormDataFive] = useState({
    spouse: null,
    profession: null,
    organization: null,
    mobile1: null,
    contact: null,
    emailid: null,
    address1: null,
    joint: null,
    name: null,
    relationship: null,
    mobile2: null,
    address2: null
  });
  
  const [formDataSecondFive, setFormDataSecondFive] = useState({
    spouse: null,
    profession: null,
    organization: null,
    mobile1: null,
    contact: null,
    emailid: null,
    address1: null,
    joint: null,
    name: null,
    relationship: null,
    mobile2: null,
    address2: null
  });
  
  const [formDataSix, setFormDataSix] = useState({
    name: null,
    designation: null,
    status: null,
    experience: null,
    phone: null,
    emailid: null,
    address: null
  });
  
  const [formDataSecondSix, setFormDataSecondSix] = useState({
    name: null,
    designation: null,
    status: null,
    experience: null,
    phone: null,
    emailid: null,
    address: null
  });
  
  const [formDataSeven, setFormDataSeven] = useState({
    salary: null,
    rent: null,
    other1: null,
    rentandutility: null,
    food: null,
    education: null,
    repayment: null,
    other2: null,
    interest: null,
    cars: null
  });
  
  const [formDataSecondSeven, setFormDataSecondSeven] = useState({
    salary: null,
    rent: null,
    other1: null,
    rentandutility: null,
    food: null,
    education: null,
    repayment: null,
    other2: null,
    interest: null,
    cars: null
  });

  // const arrForData = [setFormDataOne,setFormDataSecondOne,setFormDataThree,setFormDataSecondThree,
  //                     setFormDataFour,setFormDataSecondFour,setFormDataFive,setFormDataSecondFive,
  //                     setFormDataSix,setFormDataSecondSix,setFormDataSeven,setFormDataSecondSeven];

  // const getFormOneData = async () => {
  //   const apiResponse =await axios.get('loan/loan-by-loanId/'+loanid);
  // }
                      
  // for (let i =0 ; i< receivedStage - 1 ; i++){
    
  // }
  
  const [clickCount, setClickCount] = useState(0);
  const [clickCountPer, setclickCountPer] = useState(0);
  const [PersonalInformationid, setPersonalInformationid] = useState();
  const [clickCountAddress, setclickCountAddress] = useState(0);
  const [Addressinfoid, setAddressinfoid] = useState();
  const [Familyid, setFamilyid] = useState();
  const [emergencyid, setemergencyid] = useState();
  const [clickcountFE, setclickcountFE] = useState(0);
  const [Empid, setEmpid] = useState();
  const [clickcountemp, setclickcountemp] = useState(0);
  const [Finid, setFinid] = useState();
  const [clickcountfin, setclickcountfin] = useState(0);
  

  const RenderFormComponent = () => {
    const handleNext = () => {
      setStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
      setStep((prevStep) => prevStep - 1);
    };

    switch (step) {
      case 1:
        return <Loandetails loanId={loanid} setloanId={setloanid} clickcount={clickCount} setclickcount={setClickCount} onNextStep={handleNextFirstStep} onNext={handleNext} setFormData={setFormDataOne} formData={formDataOne} setFormData2={setFormDataSecondOne} />;
      case 2:
        // console.log("in axios2");
        // const value = axios.get('/loan/loan-by-loanId/'+loanid); 
        // console.log(value);
        // setFormDataOne(value);
        return <Documents getPrevData ={getPrevData} loanId={loanid} onNextStep={handleNextSecondStep} onBackStep={handleBackSecondStep} setsuccess={setsuccess} onNext={handleNext} onPrev={handleBack} setFormData2={setFormDataSecondOne} />;
      case 3:
        return <Personal Personalinformationid={PersonalInformationid} setpersonalinformationid={setPersonalInformationid} loanId={loanid} clickcountper={clickCountPer} setClickCountper={setclickCountPer} onBackStep={handleBackThirdStep} onNextStep={handleNextThirdStep} setsuccess={setsuccess} onNext={handleNext} onPrev={handleBack} setFormData4={setFormDataSecondTwo} setFormData5={setFormDataThree} formData5={formDataThree} setFormData6={setFormDataSecondThree} />;
      case 4:
        return <Addressinfo loanId={loanid} AddressinfoId={Addressinfoid} setAddressinfoId={setAddressinfoid} clickCountaddress={clickCountAddress} setclickCountaddress={setclickCountAddress} onBackStep={handleBackFourthStep} onNextStep={handleNextFourthStep} onNext={handleNext} onPrev={handleBack} setFormData6={setFormDataSecondThree} setFormData7={setFormDataFour} formData7={formDataFour} setFormData8={setFormDataSecondFour} />;
      case 5:
        return <Family loanId={loanid} clickcountFE={clickcountFE} setclickcountFE={setclickcountFE} EmergencyId={emergencyid} setEmergencyId={setemergencyid} familyid={Familyid} setfamilyid={setFamilyid} onBackStep={handleBackFifthStep} onNextStep={handleNextFifthStep} onNext={handleNext} onPrev={handleBack} setFormData8={setFormDataSecondFour} setFormData9={setFormDataFive} formData9={formDataFive} setFormData10={setFormDataSecondFive} />;
      case 6:
        return <Employement loanId={loanid} employementId={Empid} setemployementId={setEmpid} clickcountemp={clickcountemp} setClickCountemp={setclickcountemp} onBackStep={handleBackSixthStep} onNextStep={handleNextSixthStep} onNext={handleNext} onPrev={handleBack} setFormData10={setFormDataSecondFive} setFormData11={setFormDataSix} formData11={formDataSix} setFormData12={setFormDataSecondSix} />;
      case 7:
        return <FinancialInformationForm loanId={loanid} FinId={Finid} setFinId={setFinid} clickCountFin={clickcountfin} setClickCountFin={setclickcountfin} onBackStep={handleBackSeventhStep} onNextStep={handleNextSeventhStep} onNext={handleNext} onPrev={handleBack} setFormData12={setFormDataSecondSix} setFormData13={setFormDataSeven} formData13={formDataSeven} setFormData14={setFormDataSecondSeven} />;
      case 8:
        return <Declaration loanId={loanid} fullname={formDataThree.fullname} amount={formDataOne.amount} onBackStep={handleBackEighthStep} onNext={handleNext} onPrev={handleBack} setFormData14={setFormDataSecondSeven} formData13={formDataSeven} />;
      default:
        return null;
    }
  }

  

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 0 }}>
          <Logo />
        </div>
        <div style={{ flex: 12 }}>
          <Navbar />
        </div>
      </div>
      <div className='Integratebody' style={{ backgroundColor: '#F6F8FC', minHeight: '100vh', padding: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            <p style={{
              color: '#676D74',
              backgroundImage: `url(${User})`,
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat',
              paddingLeft: '25px',
              marginTop: '10px',
              marginLeft: '10px',
              marginBottom: '20px',
              fontSize: '18px',
              fontWeight: '500px',
            }}>Personal Loan</p>
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{
              color: '#2C76C9',
              backgroundImage: `url(${arrowdas})`,
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat',
              marginTop: '10px',
              marginBottom: '20px',
              fontSize: '18px',
              fontWeight: '500px',
              paddingLeft: '25px'
            }}>Go back to DashBoard</p>
          </div>
        </div>
 
        <div>
          <Row gutter={[24, 24]} style={{ width: '100%', height: '895px' }}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', height: '', marginLeft: "20px" }}>
              <div>

                {/* <Stepper /> */}

                <div className="loanDetailsContainer" style={{ marginTop: '20px' }}>
                  <Space>
                    <img
                      src={steps === 1 ? number1blue : Greentick}
                      alt="1"
                      className="blueNumberIcon"
                    />
                    <p className="loanDetailsText" style={{ color: steps === 1 ? '#2C76C9' : ' #BBBBBB', marginTop: '15px', fontWeight: '500', font: '100', fontSize: '20px' }}>
                      Loan Details
                    </p>
                    {steps === 1 && <img src={arrowImage} alt="Arrow" />}
                  </Space>
                </div>

                <div style={{ marginTop: '5%' }}>
                  <Space>
                    <img
                      src={steps === 2 ? number2blue : uploadDocumentsImage}
                      alt="2"
                    />
                    <p style={{ color: uploadDocumentsTextColor, marginTop: '15px', fontSize: '20px' }}>Upload Documents</p>
                    {steps === 2 && <img src={arrowImage} alt="Arrow" />}
                  </Space>
                </div>
                
                <div style={{ marginTop: '5%' }}>
                  <Space onClick={toggleHidden}>
                    <img
                      src={steps >= 3 && steps <= 5 ? number3blue : Pesonalimg}
                      alt="3"
                    />
                    <p style={{ color: PersonalTextColor, fontSize: '20px', marginTop: '15px' }}>Personal Details</p>
                  </Space>
                </div>

                {isHiddenVisible && (
                  <div id="Hidden" >
                    <p className="hide1" style={{ color: steps === 3 ? '#979797' : '#37414A', marginTop: '5%', fontSize: '20px', marginLeft: '55px' }}>
                      Personal Information
                      {steps === 3 && <img src={arrowImage} alt="Arrow" />}
                    </p>
                    <p className="hide2" style={{ color: steps === 4 ? '#979797' : '#37414A', marginTop: '5%', fontSize: '20px', marginLeft: '55px' }}>
                      Address Information
                      {steps === 4 && <img src={arrowImage} alt="Arrow" />}
                    </p>
                    <p className="hide3" style={{ color: steps === 5 ? '#979797' : '#37414A', marginTop: '5%', fontSize: '20px', marginLeft: '55px' }} >
                      Family & Emergency Details
                      {steps === 5 && <img src={arrowImage} alt="Arrow" />}
                    </p>
                  </div>
                )}

                <div style={{ marginTop: '5%' }}>
                  <Space>
                    <img src={steps === 6 ? number4blue : Employeeimg}></img>
                    <p style={{ color: EmploymentTextColor, fontSize: '20px', marginTop: '15px' }}>Employment Details</p>
                    {steps === 6 && <img src={arrowImage} alt="Arrow" />}
                  </Space>
                </div>

                <div style={{ marginTop: '5%' }}>
                  <Space>
                    <img src={steps === 7 ? number5blue : Financialimg}></img>
                    <p style={{ color: FinancialTextColor, fontSize: '20px', marginTop: '15px' }}>Financial Information</p>
                    {steps === 7 && <img src={arrowImage} alt="Arrow" />}
                  </Space>
                </div>

                <div style={{ marginTop: '5%' }}>
                  <Space>
                    <img src={steps === 8 ? number6blue : Declarationimg}></img>
                    <p style={{ color: DeclarationTextColor, fontSize: '20px', marginTop: '15px' }}>Declaration</p>
                    {steps === 8 && <img src={arrowImage} alt="Arrow" />}
                  </Space>
                </div>

                <div className="col1images"  >
                  <div className='col1bottomImagetriangle'>
                    <img src={triangle} />
                  </div>
                  <div className="col1bottomImage" style={{ marginTop: '0%' }}>
                    <img src={col1ImageContent} />
                  </div>
                </div>

              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={11} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginLeft: "25px" }}> {RenderFormComponent()}</Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginLeft: "25px" }}><Component3 success={success} setStep={setStep} amount={formDataSecondOne.amount} tenure={formDataSecondOne.tenure} occupation={formDataSeondTwo.occupation} employement={formDataSeondTwo.employement} finance={formDataSeondTwo.finance} fullname={formDataSecondThree.fullname} dob={formDataSecondThree.dob} taxid={formDataSecondThree.taxid} permanent={formDataSecondFour.permanent} mobile1={formDataSecondFour.mobile1} telephone={formDataSecondFour.telephone} spouse={formDataSecondFive.spouse} mobile3={formDataSecondFive.mobile1} contact={formDataSecondFive.contact} relationship={formDataSecondFive.relationship} mobile2={formDataSecondFive.mobile2} compname={formDataSecondSix.name} designation={formDataSecondSix.designation} phone={formDataSecondSix.phone} income={formDataSecondSeven.salary} expenses={( parseInt(formDataSecondSeven.rent)|| 0 ) +(parseInt(formDataSecondSeven.education)|| 0) +( parseInt(formDataSecondSeven.other1) || 0 ) + ( parseInt(formDataSecondSeven.other2)|| 0 ) + (parseInt(formDataSecondSeven.repayment) || 0 )+ (parseInt(formDataSecondSeven.food) || 0) +( parseInt(formDataSecondSeven.rentandutility) || 0 )} /> </Col>
          </Row>
        </div>

      </div >
    </>
  );
}

export default Integration;