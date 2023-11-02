import { Input, Form, Space, Button } from 'antd';
import React , {useContext} from 'react';
import './index.css';
import axiosapi from '../../../axios'
import arrow from '../../../assets/images/NextButtonArrow.svg';
import { ApiContext } from '../../../apicontext/ApiContext';
import { submitAddress, updateAddress } from '../../../service/AddressService'


const Addressinfo = ({ loanId, AddressinfoId, setAddressinfoId, clickCountaddress, setclickCountaddress, onBackStep, onNextStep, onNext, onPrev, setFormData6, setFormData7, setFormData8, formData7 }) => {
  
  const {setStage,stage,receivedStage} = useContext(ApiContext);
  console.log(stage);
  
  const [form] = Form.useForm();
 const handleSubmit = async (values) => {
  try {
    setFormData7(values);
    setFormData8(values);
    console.log(values);
    const updatedValue = {
      ...values,
      presentAddress: values.present,
      permanentAddress: values.permanent,
      telephoneNo: values.telephone,
      loanId: loanId,
    };
    console.error("Address : " + updatedValue);
    if (clickCountaddress === 0) {
      submitAddress(updatedValue)
        .then((postResponse) => {
          console.log('Address ID:', postResponse.addressInformationId);
          setAddressinfoId(postResponse.addressInformationId);
          setStage(4);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.error(AddressinfoId);
      updateAddress(AddressinfoId, updatedValue)
        .then(() => {
          console.log("Updated Address")
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    setclickCountaddress(clickCountaddress + 1);
          onNext();
          onNextStep();
  } catch (error) {
    console.error('Error:', error);
  }
};

  
  const handleBack = async (e) => {
    e.preventDefault();
    try {
      setFormData6('');
      onPrev();
      
      onBackStep();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div>
        <div className='address_information_text'>
          <h3>Address Information</h3>
        </div>
      </div>
      <div>
        <div className='secondary_text'>
          <p>Enter your address information as mentioned in IDs</p>
        </div>
      </div>
      <Form onFinish={handleSubmit} initialValues={formData7} className='formdata'>
        <div className='FirstLine'>
          <Space>
            <Form.Item
              name="present"
              rules={[
                {
                  required: true,
                  message: 'Present address is Required',
                }
              ]}
            >
              <Input placeholder="Present Address*(Residential)" className='Presentaddress' />
            </Form.Item>
          </Space>
        </div>
        <div className='SecondLine'>
          <Space>
            <Form.Item
              name="permanent"
              rules={[
                {
                  required: true,
                  message: 'Permanent address is Required',
                }
              ]}>
              <Input placeholder="Permanent Address*" className='Permanentaddress' />
            </Form.Item>
          </Space>
        </div>
        <div className='ThirdLine'>
          <Space>
            <Form.Item
              name="district" rules={[
                {
                  required: true,
                  message: 'District is Required',
                }
              ]} >
              <Input placeholder="District" className='District' />
            </Form.Item>
            <Form.Item
              name="country"  rules={[
                {
                  required: true,
                  message: 'Country is Required',
                }
              ]}>
              <Input placeholder="Country" className='Country' />
            </Form.Item>
            <Form.Item
              name="emailid"
              rules={[
                { required: true, message: 'Please enter email address' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}>
              <Input placeholder="Email ID*" className='EmailID' />
            </Form.Item>
          </Space>
        </div>

        <div className='FourthLine'>
          <Space>
            <Form.Item
              name="mobile1"
              rules={[
                { required: false, message: 'Please enter mobile number' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || /^(?:\d{10}|\d{3}-\d{3}-\d{4})$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Please enter a valid mobile number');
                  },
                }),
              ]} >
              <Input placeholder="Mobile 1*" className='Mobile1' required />
            </Form.Item>
            <Form.Item
              name="mobile2" rules={[
                { required: false, message: 'Please enter  mobile number' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || /^(?:\d{10}|\d{3}-\d{3}-\d{4})$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Please enter a valid mobile number');
                  },
                }),
              ]}>
              <Input placeholder="Mobile 2" className='Mobile2' required />
            </Form.Item>
            <Form.Item
              name="telephone" 
              rules={[
                {
                  required: true,
                  message: 'telephone number is Required',
                }
              ]}>
              <Input placeholder="Telephone no." className='Telephoneno' required />
            </Form.Item>
          </Space>
        </div>

        <div id='buttons'>
          <Space>
            <Button onClick={handleBack}  style={{marginRight:'30px',border:'none',fontSize:'18px',color: '#928C8C',fontWeight: '400',lineHeight: 'normal',letterSpacing: '0.36px'}} >BACK</Button>
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

export default Addressinfo;
