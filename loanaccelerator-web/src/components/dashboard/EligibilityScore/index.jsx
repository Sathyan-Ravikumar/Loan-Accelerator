import React, { useContext } from 'react';
import './index.css';
import { Gauge } from '@ant-design/plots';
import { Card } from 'antd';
import { ApiContext } from '../../../apicontext/ApiContext';
 import jwt_decode from 'jwt-decode';

const EligibilityScore = () => {

  const getToken = localStorage.getItem('token');
  const decodedToken = jwt_decode(getToken);

  const { eligibilityScore,setEligibilityScore } = useContext(ApiContext);
  setEligibilityScore(decodedToken.EligibilityScore);
   

  const eScore = eligibilityScore 
  const eligibilityPercentage = eScore / 1000;



  const config = {
    percent: eligibilityPercentage,
    type: 'meter',
    innerRadius: 0.75,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ['#F4664A', '#FAAD14', '#30BF78'],
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      title: {
       offsetY: 15,
       style: {
         fontSize: '25px',
         color: '#042747',
       },
       formatter: () => eScore,
     },

     
   },
  };

  const getCreditScoreColor = () => {
    if (eligibilityPercentage > 0.6) {
      return 'excellent-color';
    } else if (eligibilityPercentage < 0.7) {
      return 'good-color';
    }
    return '';
  };

  const getCreditScoreLabel = () => {
    if (eligibilityPercentage > 0.6) {
      return 'Excellent';
    } else if (eligibilityPercentage < 0.7) {
      return 'Good';
    }
    return '';
  };

  return (
    <div className="box3">
      <Card title="Eligibility Score"
        extra={<a href="#">Generate Report</a>}
        style={{
          width: '100%', height: '100%'
        }}
      >
        <div className="gauge">
          <Gauge {...config} />
        </div>
        <br/><br/>
        <div>
          <p className="csp1">
            Your Credit Score is&nbsp;<span className={`csp ${getCreditScoreColor()}`}> {getCreditScoreLabel()}.!!</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default EligibilityScore;


