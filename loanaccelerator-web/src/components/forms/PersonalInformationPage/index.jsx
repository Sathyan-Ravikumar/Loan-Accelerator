import { Form, Button, Input, DatePicker, Radio, Select, Space, Divider } from 'antd';
import React, { useContext } from 'react';
import arrow from '../../../assets/images/NextButtonArrow.svg';
import './index.css';
 import { useState, useEffect } from 'react';
import { ApiContext } from '../../../apicontext/ApiContext';

import { submitPersonalInformation, updatePersonalInformation,district } from '../../../service/PersonalService';

const Personal = ({ Personalinformationid, setpersonalinformationid, loanId, clickcountper, setClickCountper, onBackStep, onNextStep, setsuccess, onNext, onPrev, setFormData4, setFormData5, formData5, setFormData6 }) => {

  const { setNewDateOfBirth, setStage, stage,receivedStage } = useContext(ApiContext);

  console.log(stage);


  const handleSubmit = async (values) => {
    try {
      console.log(values);
      setFormData5(values);
      setFormData6(values);
      const updatedvalues = {
        ...values,
        districtofBirth: values.district,
        coutryOfBirth: values.country,
        educationQualification: values.education,
        residentialStatus: values.resident,
        residingFor: values.residing,
        isExistingCustomer: values.radiogroup,
        fathersName: values.father,
        mothersName: values.mother,
        dateOfIssurance: values.doi,
        countryOfIssurance: values.coi,
        maritalStatus: values.marital,
        loanId: loanId,
      };
      console.log("Updated values: " + updatedvalues);
  
      if (clickcountper === 0) {
        try {
          const response = await submitPersonalInformation(updatedvalues);
          setpersonalinformationid(response.personalInformationId);
          setNewDateOfBirth(response.dob);
          setStage(3);
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        try {
          await updatePersonalInformation(Personalinformationid, updatedvalues);
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
      setClickCountper(clickcountper + 1);
      onNext();
      onNextStep();
    } catch (error) {
      console.log(error);
    }
 
  };

  const handleBack = async (e) => {
    e.preventDefault();
    try {
      setsuccess('');
      onPrev();
      onBackStep();
    } catch (error) {
      console.log(error);
    }
  };

  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await district();
        const districts = response.regions.map(district => ({
          label: district.district_name,
          value: district.district_name,
        }));
        setDistrictOptions(districts);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
    fetchDistricts();
  }, []);

  const nameRegex = /^[A-Za-z\s]+$/;
  const validateFullName = (_, value) => {
    if (value && !nameRegex.test(value)) {
      return Promise.reject('Please enter Valid Name!');
    }
    return Promise.resolve();
  };
  const residingYearsRegex = /^[0-9]+$/;

  const validateTaxIdNumber = (_, value) => {
    const taxIdNumberRegex = /^[0-9]+$/;
    if (value && !taxIdNumberRegex.test(value)) {
      return Promise.reject('Enter Valid Tax ID');
    }
    return Promise.resolve();
  };

  return (
    <div>
      <div className='personal_information_text'>
        <h3>Personal Information</h3>
      </div>
      <div id='secondarytext'>
        <p>Enter your personal information as mentioned in IDs</p>
      </div>
      <Form name="personalForm" onFinish={handleSubmit} initialValues={formData5} className='formdata'>
        <div className='FirstLine'>
          <Space>
            <Form.Item
              name="fullname"
              help="Same as ID Proof"
              rules={[
                {
                  required: true,
                  message: 'Full Name is required!',
                },
                {
                  validator: validateFullName,
                },
              ]}
            >
              <Input placeholder="Full Name*" className='fullname' />
            </Form.Item>

            <Form.Item
              name="dob"
              rules={[
                {
                  required: true,
                  message: 'Date of Birth is Required',
                },
              ]}
            >
              <DatePicker className='DOB' placeholder="DOB*" suffixIcon={null} />
            </Form.Item>

            <Form.Item name="district">

              <Select
                showSearch
                placeholder="District of Birth"
                optionFilterProp="label"
                className='district'
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[
                  { value: '', label: 'District of Birth...' },
                  ...districtOptions
                ]}
              />

            </Form.Item>
          </Space>
        </div>

        <div className='SecondLine'>
          <Space>
            <Form.Item
              name="country"
              rules={[
                {
                  required: true,
                  message: 'Country of birth is Required!',
                },
              ]}
            >
              <Select
                showSearch
                className='CountryBirth'
                placeholder=" Country of Birth*" // Updated placeholder text
                optionFilterProp="label"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[

                  { value: 'india', label: 'India' }, // Your existing options
                ]}
              />
            </Form.Item>


            <Form.Item
              name="taxid"
              rules={[
                {
                  required: true,
                  message: 'Tax ID is Required!',
                },
                {
                  validator: validateTaxIdNumber,
                },
              ]}
            >
              <Input placeholder="Tax Id number (eTIN)*" className='TaxIdnumber' style={{ width: '200px' }} />
            </Form.Item>

            <Form.Item
              name="education"
              rules={[
                {
                  required: true,
                  message: 'Your Qualification is Required!',
                },
              ]}
            >
              <Select
                showSearch
                className='Qualification'
                placeholder="Educational Qualification*"
                optionFilterProp="label"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'degree', label: 'Degree Holder' },
                  { value: 'highschool', label: 'High School Education' },
                ]}
              />
            </Form.Item>
          </Space>
        </div>

        <div className='ThirdLine'>
          <Space>
            <Form.Item
              name="resident"
              rules={[
                {
                  required: true,
                  message: 'Residential Status is Required!',
                },
              ]}
            >
              <Select
                showSearch
                className='residential'
                placeholder="Residential Status*"
                optionFilterProp="label"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[
                  {
                    value: 'citizen',
                    label: 'Citizen',
                  },
                  {
                    value: 'permanent resident',
                    label: 'Permanent Resident',
                  },
                  {
                    value: 'temporary Resident',
                    label: 'Temporary Resident',
                  },
                  {
                    value: 'refugee',
                    label: 'Refugee',
                  },
                  {
                    value: 'military personnel',
                    label: 'Military Personnel',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="residing"
              rules={[
                {
                  required: true,
                  message: 'Residing years is Required!',
                },
                {
                  pattern: residingYearsRegex,
                  message: 'Enter valid Residing Years',
                },
              ]}
            >
              <Input placeholder="Residing for (In Years)*" className='residing' style={{ width: '200px' }} />
            </Form.Item>

            <Form.Item name="gender">
              <Select
                showSearch
                className='gender'
                placeholder="Gender"
                optionFilterProp="label"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
              />
            </Form.Item>
          </Space>
        </div>

        <div className='radiobtnandtext'>
          <Space>
            <div className='radiocontent'>
              <p>Are you an Existing Customer?</p>
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

        <div className='FourthLine'>
          <Space>
            <Form.Item
              name="father"
              rules={[
                {
                  required: true,
                  message: "Your Father's Name is Required!",
                },
                {
                  pattern: nameRegex,
                  message: "Enter Valid Father's Name",
                },
              ]}
            >
              <Input placeholder="Father's Name*" className='father' style={{ width: '200px' }} />
            </Form.Item>

            <Form.Item
              name="mother"
              rules={[
                {
                  required: true,
                  message: "Your Mother's Name is Required!",
                },
                {
                  pattern: nameRegex,
                  message: "Enter Valid Mother's Name",
                },
              ]}
            >
              <Input placeholder="Mother's Name*" className='mother' style={{ width: '200px' }} />
            </Form.Item>

            <Form.Item
              name="nationalid"
            >
              <Input placeholder="National ID" className='nationalid' style={{ width: '200px' }} />
            </Form.Item>
          </Space>
        </div>
        <div className='FifthLine'>
          <Space>
            <Form.Item
              name="doi"
            >
              <DatePicker className='dateofissurance' placeholder="Date of Issuance" style={{ width: '200px' }} suffixIcon={null} />
            </Form.Item>
            <Form.Item name="coi">
              <Select
                showSearch
                className='country'
                placeholder="Country of Insurance"
                optionFilterProp="label"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[
                  { value: 'india', label: 'India' },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="nationality"
              rules={[
                {
                  required: true,
                  message: 'Nationality is Required!',
                  transform: (value) => (value || '').trim(),
                },
              ]}
              initialValue="India"
            >
              <Input placeholder="Nationality*" className='nationality' style={{ width: '200px' }} defaultValue={'India'} />
            </Form.Item>
          </Space>
        </div>

        <div className='SixthLine'>
          <Space>
            <Form.Item
              name="marital"
              rules={[
                {
                  required: true,
                  message: 'Marital Status is Required!',
                },
              ]}
            >
              <Select
                showSearch
                className='marital'
                placeholder="Marital Status*"
                optionFilterProp="label"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={[
                  {
                    value: 'unmarried',
                    label: 'Unmarried',
                  },
                  {
                    value: 'married',
                    label: 'Married',
                  },
                  {
                    value: 'widowed',
                    label: 'Widowed',
                  },
                  {
                    value: 'separated',
                    label: 'Separated',
                  },
                ]}
              />
            </Form.Item>
          </Space>
        </div>

        <div className='buttons'>
          <Space>
            <Button onClick={handleBack}  
            style={{marginRight:'30px',border:'none',fontSize:'18px',color: '#928C8C',fontWeight: '400',lineHeight: 'normal',letterSpacing: '0.36px'}}>BACK</Button>
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

export default Personal;
