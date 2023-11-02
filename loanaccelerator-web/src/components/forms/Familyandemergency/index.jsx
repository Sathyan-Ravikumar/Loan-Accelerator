import { Row, Col, Divider, Grid } from 'antd';
import { Input, Form, AutoComplete, DatePicker, Space, Radio, Select, Button } from 'antd';
import React , {useContext} from 'react';
import './index.css';
import arrow from '../../../assets/images/NextButtonArrow.svg'
import axiosapi from '../../../axios'
import { ApiContext } from '../../../apicontext/ApiContext';
import {postFamily,updatefamilyandemergency,postEmergency} from '../../../service/FamilyAndEmergencyService';

const Family = ({ loanId,clickcountFE,setclickcountFE,EmergencyId,setEmergencyId,familyid,setfamilyid,onBackStep,onNextStep,setFormData8 , onNext , onPrev ,setFormData9, formData9 ,setFormData10}) => {

  const {setStage , stage ,receivedStage} = useContext(ApiContext);
    console.log(stage);

  const handleSubmit = async (values) => {
    try {
      const updatedFamily={
        spouseName:values.spouse,
        profession:values.profession,
        nameOfOrganisation:values.organization,
        mobileNo:values.mobile1,
        officeContactNo:values.contact,
        emailId:values.emailid,
        jointAccount:values.radiogroup,
        loanId:loanId,
      }
       console.log(updatedFamily);
      const updatedEmergency={
        name:values.name,
        relation:values.relationship,
        mobileNo:values.mobile2,
        address:values.address2,
        loanId:loanId,
      }
      console.log(updatedEmergency);

      if (clickcountFE === 0) {
        const postfamily = await postFamily(updatedFamily);
        setfamilyid(postfamily.familyDetailsId);
        const postemergency = await  postEmergency(updatedEmergency);
        setEmergencyId(postemergency.emergencyContactId);
        console.error("family , emer " + postfamily.familyDetailsId, postemergency.emergencyContactId);
        setStage(5);
      } else {
        console.error("ids", familyid, EmergencyId);
        const { putResponseF, putResponse } = await updatefamilyandemergency(familyid, EmergencyId, updatedFamily, updatedEmergency);
        console.log("Updated Family:", putResponseF);
        console.log("Updated Emergency:", putResponse);
      }
      setclickcountFE(clickcountFE+1);
      onNext();
      setFormData9(values);
      setFormData10(values);
      onNextStep();
    } catch (error) {
      console.log(error);
    }
  };



  const handleBack = async (e) => {
    e.preventDefault();
    
    try {
      setFormData8('');
      onPrev();
      onBackStep();
    } catch (error) {
      console.log(error);
    }
    };


  return (

    <div style={{ backgroundColor: 'white' }}>
      <div>
        <div className='family_details'>
          <h3>Family & Emergency Details</h3>
        </div>
      </div>
      <div>
        <div className='secondarytext'>
          <p>Enter your family and emergency contact details</p>
        </div>
      </div>
      <Form onFinish={handleSubmit} initialValues={formData9}>
        <div className='FirstLine'>
          <Space>
            <Form.Item
            name="spouse"
            >
              <Input placeholder="Spouse's Name" className='Spousename' />
            </Form.Item>

            <Form.Item
            name="profession"
            >
              <Input placeholder="Profession" className='Profession' />
            </Form.Item>
            <Form.Item
            name="organization">
              <Input placeholder="Name Of Organization " className='Nameoforganization' />
            </Form.Item>

          </Space>
        </div>
        <div className='SecondLine'>
          <Space>
            <Form.Item
            name="mobile1"
            rules={[
              { required: false, message: 'Please enter mobile number' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // Allow empty value or check for valid phone number format
                  if (!value || /^(?:\d{10}|\d{3}-\d{3}-\d{4})$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Please enter a valid mobile number');
                },
              }),
            ]}
            >
            <Input placeholder="Mobile no*" className='Mobileno'  />
            </Form.Item>

            <Form.Item
            name="contact"
            rules={[
              { required: false, message: 'Please enter mobile number' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // Allow empty value or check for valid phone number format
                  if (!value || /^(?:\d{10}|\d{3}-\d{3}-\d{4})$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Please enter a valid mobile number');
                },
              }),
            ]}>
            <Input placeholder="Office Contact no.*" className='Officecontactno'  />
            </Form.Item>

            <Form.Item
            name="emailid"
            rules={[
              { required: true, message: 'Please enter email address' },
              { type: 'email', message: 'Please enter a valid email address' }
            ]}>
            <Input placeholder="Email ID*" className='Emailid'  />
            </Form.Item>
          </Space>
        </div>
        <div className='ThirdLine'>
          <Space>
            <Form.Item
            name="address1"
            rules={[
              {
                required: true,
                message: 'Office Address is Required',
              },
            ]}>
            <Input placeholder="Office Address*" className='OfficeAddress' style={{ width: '600px' }} pattern="[A-Za-z]+"  />
            </Form.Item>
          </Space>
        </div>
        <div className='Divider1'>
          <Divider />
        </div>
        <div className='radiobtnandtext'>
          <Space>
            <div className='radiocontent'>
              <p>Is spouse applying jointly?</p>
            </div>
            <div className='radiobtn'>
            <Form.Item name="radiogroup" initialValue="Yes">
                <Radio.Group >
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Radio.Group>
            </Form.Item>
            </div>
          </Space>
        </div>
        <div className='Divider2'>
          <Divider />
        </div>
        <div className='FourthLine'>
          <Space>
            <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Name is Required',
              },
            ]}>
              <Input placeholder="Name*" className='Name' style={{ width: '200px' }}  />
              </Form.Item>
            <Form.Item
            name="relationship"
            rules={[
              {
                required: true,
                message: 'Relationship with Applicant is Required',
              },
            ]}>
            <Input placeholder="Relationship with Applicant*" className='RelationshipwithApplicant' style={{ width: '200px' }}  />
            </Form.Item>
            <Form.Item
            name="mobile2"
            rules={[
              { required: false, message: 'Please enter mobile number' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // Allow empty value or check for valid phone number format
                  if (!value || /^(?:\d{10}|\d{3}-\d{3}-\d{4})$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Please enter a valid mobile number');
                },
              }),
            ]}
            >
            <Input placeholder="Mobile No.*" className='number' style={{ width: '200px' }}  />
            </Form.Item>
          </Space>
        </div>
        <div className='FifthLine'>
          <Space>
            <Form.Item
            name="address2"
            rules={[
              {
                required: true,
                message: 'Address is Required',
              },
            ]}
            >
            <Input placeholder="Address*" className='Address'  />
            </Form.Item>
          </Space>
        </div>

        <div className='buttons_family'>
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

export default Family;



