import React from 'react';
import Sidebar from '../../layout/Sidebar'
import EmiCalculator from '../../components/dashboard/EmiCalculator';
import LoanReco from '../../components/dashboard/LoanRecommendation';
import EligibilityScore from '../../components/dashboard/EligibilityScore';
import ApplicationStatus from '../../components/dashboard/ApplicationStatus';
import ApplicationProfile from '../../components/dashboard/ApplicationProfile';
import './index.css'
import Navbar from '../../layout/Navbar';
import jwt_decode from 'jwt-decode';

const Customerdashboard = () => {
  const getToken = localStorage.getItem('token');
  const decodedToken = jwt_decode(getToken);

  return (
    <div className='dshboard'>
      <div className='maindashboard123'>

        <div><Sidebar /></div>

        <div className='dashhome234'>
          <div className='search1234bar'> <Navbar /></div>
          <div id='namecontent'>
            <p className='nameshown'> Hi {decodedToken.FullName} </p>
            <p className='statusshown'>Have you applied for any loan yet!</p>
          </div>

          <div className='boxes'>
            <LoanReco />
            <EmiCalculator />
            <EligibilityScore />
          </div>

          <div className='row2'>
            <div id='application'><ApplicationStatus /></div>
            <div className='appprofileres'><ApplicationProfile /></div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Customerdashboard