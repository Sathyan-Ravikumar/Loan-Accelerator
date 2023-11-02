import React, { useContext, useState } from 'react';
import './index.css';
import arrow from '../../../assets/images/NextButtonArrow.svg';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Select, Space, DatePicker, Segmented } from 'antd';
import { ApiContext } from '../../../apicontext/ApiContext';
import jwt_decode from 'jwt-decode';
import { submitLoanDetails, updateLoanDetails} from '../../../service/LoanService' 


const Loandetails = ({ loanId, setloanId, clickcount, setclickcount, onNext, setFormData, setFormData2, formData, onNextStep }) => {



  const { loanTypeId,setLoanTypeId,loanCategoryId } = useContext(ApiContext);
  const { setNewApplicationId, setAppliedDate,receivedStage } = useContext(ApiContext);
  const [form] = Form.useForm();
  const tenureOptions = Array.from({ length: 100 }, (_, index) => ({
    value: (index + 1).toString(),
    label: `${index + 1} months`,
  }));

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setFormData(values);
        setFormData2(values);
        console.log(values);
        const updatedValues = {
          loanCategoryId: loanCategoryId,
          loanTypeId: loanTypeId,
          appliedAmount: values.amount,
          requestedTenure: values.tenure,
          appliedDate: values.applieddate,
          statusId:4,
        };

        if (clickcount === 0) {
          return submitLoanDetails(updatedValues);
        } else {
          console.log("Loan Id : " + loanId);
          return updateLoanDetails(loanId, updatedValues);
        }
      })
      .then((response) => {
        console.log('Response:', response);
        if (clickcount === 0) {
          setloanId(response.loanId);
          setNewApplicationId(response.applicationId);
          setAppliedDate(response.appliedDate);
        }
        setclickcount(clickcount + 1);
        onNext();
        onNextStep();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="maindiv">
      <Form form={form} onFinish={handleSubmit} initialValues={formData} className="forms">
        <div>
          <p className="loan_details_title">Loan Details</p>
          <p className="loan_details_secondary_text">Enter your Loan Details to proceed to the next step</p>
        </div>

        <div>
          <div className='segmented' style={{ marginTop: '40px' }}>
            <Segmented options={['New Loan', 'Top up', 'Take Over']} className='segment' onChange={(selectedOption) => {
              if (selectedOption === 'New Loan') {
                setLoanTypeId('1'); // Update the loanTypeId based on the selected option
              } else if (selectedOption === 'Top up') {
                setLoanTypeId('2');
              } else if (selectedOption === 'Take Over') {
                setLoanTypeId('3');
              }
            }} />
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <Space >
            <Form.Item name="amount" rules={[{ required: true, message: 'Please enter the applied amount' }]}>
              <Input type="number" placeholder="Applied Amount" className="input1" pattern="[0-9]*" />
            </Form.Item>
            <Form.Item name="tenure" rules={[{ required: true, message: 'Please select the tenure' }]}>
              <Select placeholder="Tenure" className="input2" options={tenureOptions} />
            </Form.Item>
          </Space>
        </div>

        <div>
          <Form.Item name="applieddate" rules={[{ required: true, message: 'Please select the applied date' }]}>
            <DatePicker placeholder="Applied Date" className="input3" />
          </Form.Item>
        </div>

        <div className="buttons" style={{ marginTop: '350px' }}>
          <Space>
            <Link to="/loan-types">
            <Button style={{marginRight:'30px',border:'none',fontSize:'18px',color: '#928C8C',fontWeight: '400',lineHeight: 'normal',letterSpacing: '0.36px'}} >BACK</Button>
            </Link>
            <Button
              className="nextbutton"
              type="primary"
              htmlType="submit"
              style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center',justifyContent:'center'
            }}
            >
              <img src={arrow} style={{ marginLeft: '18px', marginTop: '2px' }} alt="Next arrow" />

              NEXT

            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default Loandetails;




