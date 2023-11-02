import React, { useState , useContext } from 'react';
import { Form, Input, Button, Radio, Space, Divider } from 'antd';
import './index.css';
import arrow from '../../../assets/images/NextButtonArrow.svg';
import axios from '../../../axios';
import { ApiContext } from '../../../apicontext/ApiContext';
import { submitFinancial, updateFinancial } from '../../../service/FinancialService'
const FinancialInformationForm = ({
  loanId,
  FinId,
  setFinId,
  clickCountFin,
  setClickCountFin,
  onBackStep,
  onNextStep,
  setFormData12,
  onNext,
  onPrev,
  setFormData13,
  formData13,
  setFormData14,
}) => {
  const {stage,setStage , receivedStage} = useContext(ApiContext);
  console.log(stage);
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const updatedFinance = {
        ...values,
        incomeSalary: values.salary,
        incomeRent: values.rent,
        otherIncome: values.other1,
        foodAndClothing: values.food,
        loanRepayment: values.repayment,
        cfwob: values.radiogroupCredit,
        interstRate: values.odf,
        carCount: values.cars,
        dwob: values.radiogroupDirectiorship,
        loanId: loanId,
      }
      if (clickCountFin === 0) {
        const postResponse = await submitFinancial(updatedFinance);
        console.log('POST Response:', postResponse.data);
        setFinId(postResponse.financialInformationId);
        console.log('Posted successfully');
        setStage(7);
      
      }
      else {
        const putResponse = await updateFinancial(FinId,updatedFinance);
        console.log('PUT Response:', putResponse.data);
      }
      setClickCountFin(clickCountFin + 1);
      setFormData13(values);
      setFormData14(values);
      onNext();
      onNextStep();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = async (e) => {
    e.preventDefault();
    try {
      setFormData12('');
      onPrev();
      onBackStep();
    } catch (error) {
      console.log(error);
    }
  };

  const validateMessages = {
    required: '${label} is required!',
  };

  return (
    <div style={{ backgroundColor: 'white' }} className='financial_information'>
      <div>
        <div className='firsttext'>
          <h2>Financial Information</h2>
        </div>
      </div>

      <div>
        <div className='secondtext'>
          <p>Enter your financial information</p>
        </div>
      </div>

      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={formData13}
        layout='vertical'
        validateMessages={validateMessages}
      >
        <h5>Primary Monthly Income</h5>
        <div className='pmi'>
          <Space>
            <Form.Item
              name='salary'
              rules={[
                { required: true, message: 'Salary is required' },
                {
                  pattern: /^[0-9]+$/,
                  message: 'Salary must be a valid integer',
                },
              ]}
            >
              <Input placeholder='Salary' className='salary' />
            </Form.Item>

            <Form.Item
              name='rent'
              rules={[
                { required: true, message: 'Rent is required' },
                {
                  validator: (_, value) => {
                    if (!value || /^[0-9]+$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Rent must be a valid integer');
                  },
                },
              ]}
            >
              <Input placeholder='Rent' className='rent' />
            </Form.Item>

            <Form.Item
              name='other1'
              rules={[
                { required: true, message: 'Other value is required' },
                {
                  validator: (_, value) => {
                    if (!value || /^[0-9]+$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Other value must be a valid integer');
                  },
                },
              ]}
            >
              <Input placeholder='Other' className='other' />
            </Form.Item>

          </Space>
        </div>
        <h5>Monthly Expenses</h5><div className='linefirst'>
          <Space> <Form.Item
            name='rentandutility'
            rules={[
              { required: true, message: 'Rent & Utility value is required' },
              {
                validator: (_, value) => {
                  if (!value || /^[0-9]+$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Rent & Utility value must be a valid integer');
                },
              },
            ]}
          >
            <Input placeholder='Rent & Utility' className='ru' />
          </Form.Item>

            <Form.Item
              name='food'
              rules={[
                { required: true, message: 'Food & Clothing value is required' },
                {
                  validator: (_, value) => {
                    if (!value || /^[0-9]+$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Food & Clothing value must be a valid integer');
                  },
                },
              ]}
            >
              <Input placeholder='Food & Clothing' className='fc' />
            </Form.Item><Form.Item
              name='education'
              rules={[
                { required: true, message: 'Education value is required' },
                {
                  validator: (_, value) => {
                    if (!value || /^[0-9]+$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Education value must be a valid integer');
                  },
                },
              ]}
            >
              <Input placeholder='Education' className='education' />
            </Form.Item>
          </Space> </div>
        <div className='linesecond'>
          <Space>
            <Form.Item
              name='repayment'
              rules={[
                { required: true, message: 'Loan Repayment value is required' },
                {
                  validator: (_, value) => {
                    if (!value || /^[0-9]+$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Loan Repayment value must be a valid integer');
                  },
                },
              ]}
            >
              <Input placeholder='Loan Repayment' className='lr' />
            </Form.Item>

            <Form.Item
              name='other2'
              rules={[
                { required: true, message: 'Other value is required' },
                {
                  validator: (_, value) => {
                    if (!value || /^[0-9]+$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Other value must be a valid integer');
                  },
                },
              ]}
            >
              <Input placeholder='Other' className='another' />
            </Form.Item>
          </Space>
        </div><div className='divider1'>
          <Divider />
        </div><br></br>
        <div className='radioc'>
          <Space>
            <div className='radiocon' >
              <p>Credit facility with other banks*</p>
            </div>
            <div className='radiob'>

              <Form.Item name="radiogroupCredit" initialValue="Yes">
                <Radio.Group >
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Radio.Group>
              </Form.Item>

            </div>
          </Space>
        </div><br></br>
        <div>
          <Space>
            <Form.Item name="odf "><Input placeholder=" Int.rate of OD facility(If any) " className='odf' /></Form.Item>
            <Form.Item
              name='cars'
              rules={[
                { required: true, message: 'No. of cars value is required' },
                {
                  validator: (_, value) => {
                    if (!value || /^[0-9]+$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('No. of cars value must be a valid integer');
                  },
                },
              ]}
            >
              <Input placeholder='No. of cars' className='cars' />
            </Form.Item>

          </Space>
        </div>
        <div className='divider2'><divider /></div><br></br>
        <div className='radioc'>
          <Space>
            <div className='radiocon '>
              <p>Directiorship with other banks</p>
            </div>
            <div className='radiob'>

              <Form.Item name="radiogroupDirectiorship" initialValue="Yes">
                <Radio.Group >
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Radio.Group>
              </Form.Item>

            </div>
          </Space>
        </div>

        <div className='buttons'>
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

export default FinancialInformationForm;







