import React,{useContext} from "react";
import { Input, Space } from 'antd';
import { Form, Select, Switch, Button } from 'antd';
import './index.css';
import arrow from '../../../assets/images/NextButtonArrow.svg';
import axios from '../../../axios';
import { ApiContext } from "../../../apicontext/ApiContext";

import {submitEmployment, updateEmployment} from '../../../service/EmploymentService'

const Employement = ({ loanId, employementId, setemployementId, clickcountemp, setClickCountemp, onBackStep, onNextStep, setFormData10, onNext, onPrev, setFormData11, formData11, setFormData12 }) => {

  const {stage,setStage,receivedStage} = useContext(ApiContext);
  console.log(stage);
  console.log(loanId);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const employmentType = values.employmentType ? "Business" : "Salaried";
      const updatedEmp = {
        employmentType: employmentType,
        companyName: values.name,
        designation: values.designation,
        employeeStatus: values.status,
        experience: values.experience,
        officeNo: values.phone,
        emailId: values.emailid,
        officeAddress: values.address,
        loanId: loanId,
      }
      console.log(updatedEmp);
      if (clickcountemp === 0) {
        const postResponse = await submitEmployment(updatedEmp);
         console.log('POST Response:', postResponse);
        setemployementId(postResponse.employmentId);
        console.log('Posted successfully');
        setStage(6);
      }
      else {
        const putResponse = await updateEmployment(employementId,updatedEmp); 
         console.log('PUT Response:', putResponse.data);
      }
      setClickCountemp(clickcountemp + 1);
      setFormData11(values);
      setFormData12(values);
      onNext();
      onNextStep();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setFormData10('');
    onPrev();
    onBackStep();
  };

  return (
    <div className="maindiv">
      <div>
        <h1 className="Primary_Text">Employment Details</h1>
      </div>
      <div>
        <p className="Secondary_Text">Enter your past and current employment details</p>
      </div>
      <Form form={form} className="forms" onFinish={handleSubmit} initialValues={formData11}>
        <div>
          <Space>
            <p>Salaried</p>
            <Form.Item name="employmentType">
              <Switch className="custom-switch" />
            </Form.Item>
            <p>Business</p>
          </Space>
        </div>
        <div className="input">
          <Space>
            <Form.Item name="name" rules={[{ required: true, message: 'Please enter company name' }]}>
              <Input placeholder="Name of the company*" className="company" />
            </Form.Item>
            <Form.Item name="designation" rules={[{ required: true, message: 'Please enter designation' }]}>
              <Input placeholder="Designation*" className="Designation" />
            </Form.Item>
            <Form.Item name="status" rules={[{ required: true, message: 'Please select employee status' }]}>
              <Select
                showSearch
                className="status"
                placeholder="Employee status"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  {
                    value: 'employee',
                    label: 'Employee',
                  },
                  {
                    value: 'business',
                    label: 'Business',
                  },
                  {
                    value: 'self-employed',
                    label: 'Self-employed',
                  },
                ]}
              />
            </Form.Item>
          </Space>
        </div>
        <div>
          <Space>
            <Form.Item name="experience" rules={[
              { required: true, message: 'Please enter service experience' },
              {
                pattern: /^[0-9]+$/,
                message: 'Please enter a valid number for service experience'
              }
            ]}>
              <Input placeholder="Service Experience (Years)*" className="service" />
            </Form.Item>
            <Form.Item name="phone" rules={[
              { required: false, message: 'Please enter office phone' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // Allow empty value or check for valid phone number format
                  if (!value || /^(?:\d{10}|\d{3}-\d{3}-\d{4})$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Please enter a valid phone number');
                },
              }),
            ]}>
              <Input placeholder="Office Phone" className="office" />
            </Form.Item>
            <Form.Item name="emailid" rules={[
              { required: true, message: 'Please enter email address' },
              { type: 'email', message: 'Please enter a valid email address' }
            ]}>
              <Input placeholder="Email Id" className="mail" />
            </Form.Item>
          </Space>
        </div>
        <div>
          <Form.Item name="address" rules={[{ required: true, message: 'Please enter office address' }]}>
            <Input placeholder="Office Address*" className="officeaddress" />
          </Form.Item>
        </div>
        <div className='buttons_employment'>
          <Space>
            <Button onClick={handleBack}  style={{marginRight:'30px',border:'none',fontSize:'18px',color: '#928C8C',fontWeight: '400',lineHeight: 'normal',letterSpacing: '0.36px'}}>BACK</Button>
            <Button
              className='nextbutton'
              type="primary"
              htmlType="submit"
              style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center',justifyContent:'center' }}
            >
              <img src={arrow} style={{ marginLeft: '18px', marginTop: '2px' }} alt="Next" />
              NEXT
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default Employement;