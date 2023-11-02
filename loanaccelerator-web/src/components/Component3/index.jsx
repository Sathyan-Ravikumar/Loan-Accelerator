import React, { useState, useContext } from 'react';
import { Form, Input, Button, Radio, Space, Divider } from 'antd';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { ApiContext } from '../../apicontext/ApiContext';
import moment from 'moment/moment';
const Component3 = ({ success, setStep, amount, tenure ,  fullname, dob, taxid, permanent, mobile1, telephone, spouse, mobile3, relationship, contact, mobile2, compname, phone, designation, income, expenses }) => {

  const {  NewDateOfBirth} = useContext(ApiContext);

  const date = new Date(NewDateOfBirth);
  const parsedDate = moment(date);
  const DateofBirth = parsedDate.format("DD-MM-YYYY")


  const EditLoanDetails = async (e) => {
    e.preventDefault();



    try {

      setStep(1);

    } catch (error) {
      console.log(error);
    }
  };


  const EditDocuments = async (e) => {
    e.preventDefault();

    try {

      setStep(2);

    } catch (error) {
      console.log(error);
    }
  };


  const EditPersonal = async (e) => {
    e.preventDefault();
    try {
      setStep(3);

    } catch (error) {
      console.log(error);
    }
  };

  const EditAddress = async (e) => {
    e.preventDefault();

    try {

      setStep(4);

    } catch (error) {
      console.log(error);
    }
  };

  const EditFamily = async (e) => {
    e.preventDefault();

    try {

      setStep(5);

    } catch (error) {
      console.log(error);
    }
  };


  const EditEmployement = async (e) => {
    e.preventDefault();

    try {
      setStep(6);

    } catch (error) {
      console.log(error);
    }
  };

  const EditFinancial = async (e) => {
    e.preventDefault();

    try {

      setStep(7);

    } catch (error) {
      console.log(error);
    }
  };

  const hrStyle = {
    border: '.35 px solid #EDF1F5',
    width: '100%',
  };



  return (


    <div className='cool2'>
      <div>
        <h5>Summary</h5>
      </div>
      <hr style={hrStyle} />
      <div className="row1">
        <div className='cool3'>
          {amount && <p >Loan Amount </p>}
          <h6>  {amount && <FontAwesomeIcon icon={faIndianRupeeSign} />} {amount}</h6>
        </div>
        <div className='cool3'>
          {tenure && <p>Tenure </p>}
          <h6 className='row1'>{tenure} {tenure && <pre><h6 style={{fontFamily:'Roboto'}}> months </h6></pre>}</h6>
        </div>

        <div>
          {
            amount && <p className='edit' onClick={EditLoanDetails}>
              <FontAwesomeIcon icon={faPenToSquare} /> Edit
            </p>

          }
        </div>
      </div>
      {amount && <hr style={hrStyle} />}

      <div className="row2">
        <div className='cool3 '>
          {success && <pre><p>Document uploaded</p></pre>}
          {success && <h6>Successful</h6>}
        </div>


        {success && <p className='edit2' onClick={EditDocuments}>
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </p>
        }
      </div>
      {success && <hr style={hrStyle} />}

      <div className='row3'>
        <div className='cool3 '>
          {fullname && <p>Full Name </p>}
          <h6>{fullname}</h6>
        </div>

        <div className='cool3 '>
        {fullname && <p>D.O.B </p>}
          {fullname && <h6>{DateofBirth}</h6>}
        </div>

        <div className='cool3'>
          {taxid && <p>Tax Id </p>}
          <h6>{taxid}</h6>
        </div>
        <div>
          {fullname && <p className='edit3' onClick={EditPersonal}>
            <FontAwesomeIcon icon={faPenToSquare} /> Edit
          </p>
          }
        </div>
      </div>
      {taxid && <hr style={hrStyle} />}

      <div className='row41'>
        <div className='row4'>
          <div className='cool3 row42'>
            {permanent && <p>Address Information </p>}
            <h6>{permanent}</h6>
          </div>
          <div>
            {permanent && <p className='edit4' onClick={EditAddress}>
              <FontAwesomeIcon icon={faPenToSquare} /> Edit
            </p>
            }

          </div>
        </div>
        <div className='row4'>
          <div className='cool3'>
            {mobile1 && <p>Mobile No </p>}
            <h6>{mobile1}</h6>
          </div>
          <div className='cool3'>
            {telephone && <p>Tel No </p>}
            <h6>{telephone}</h6>
          </div>
        </div>
      </div>
      {permanent && <hr style={hrStyle} />}

      <div className='row5'>
        <div className='cool3 coo'>
          {spouse && <p>Spouse name </p>}
          <h6>{spouse}</h6>
        </div>
        <div className='cool3'>
          {mobile3 && <p>Mobile No </p>}
          <h6>{mobile3}</h6>
        </div>
        {spouse && <p className='edit5' onClick={EditAddress}>
          <FontAwesomeIcon icon={faPenToSquare} /> Edit
        </p>
        }

      </div>
      {spouse && <hr style={hrStyle} />}
      <div className='row41'>
        <div className='row4'>
          <div className='cool3'>
            {contact && <p>Emergency Contact </p>}
            <h6>{contact}</h6>
          </div>
          <div className='cool3'>
            {relationship && <p>Relationship </p>}
            <h6>{relationship}</h6>
          </div>
          <div>
            {spouse && <p className='edit6' onClick={EditAddress}>
              <FontAwesomeIcon icon={faPenToSquare} /> Edit
            </p>
            }
          </div>
        </div>
        <div>
          <div className='cool3'>
            {mobile2 && <p>Mobile No </p>}
            <h6>{mobile2}</h6>
          </div>
        </div>

      </div>
      {spouse && <hr style={hrStyle} />}

      <div className='row41'>
        <div className='row4'>
          <div className='cool3 coo'>
            {compname && <p>Company Name </p>}
            <h6>{compname}</h6>
          </div>
          <div>
            {compname && <p className='edit7' onClick={EditEmployement}>
              <FontAwesomeIcon icon={faPenToSquare} /> Edit
            </p>
            }
          </div>
        </div>

        <div className='row4'>
          <div className='cool3'>
            {designation && <p>Designation </p>}
            <h6>{designation}</h6>
          </div>
          <div className='cool3'>
            {phone && <p>Mobile No </p>}
            <h6>{phone}</h6>
          </div>
        </div>

      </div>
      {compname && <hr style={hrStyle} />}

      <div className='row8'>
        <div className='cool3'>
          {income && <p>Income </p>}
          <h6>{income}</h6>
        </div>
        <br></br>
        <div>
          {/* Your other JSX code */}
          {expenses !== 0 ? (
            <div className='cool3'>
              <p>Expenses </p>
              <h6>{expenses}</h6>
            </div>
          ) : null}
          {/* Your other JSX code */}
        </div>

        <div>
          {income && <p className='edit8' onClick={EditFinancial}>
            <FontAwesomeIcon icon={faPenToSquare} /> Edit
          </p>
          }
        </div>
      </div>
      {income && <hr style={hrStyle} />}



    </div >



  );
};

export default Component3;