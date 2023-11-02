import axios from '../../../axios';
import React, { useEffect, useState,useContext } from 'react';
import { Table, Card } from 'antd';
import './index.css';
import moment from 'moment/moment';
import jwt_decode from 'jwt-decode';
import { ApiContext } from '../../../apicontext/ApiContext';
import { Link as RouterLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const ApplicationStatus = () => {
  const getToken = localStorage.getItem('token');
  const decodedToken = jwt_decode(getToken);

  function addMonthsToDate(date, monthsToAdd) {
    if (date === '-') {
        return date;
    } else {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + monthsToAdd);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formatDate = newDate.toLocaleDateString('en-IN', options);
        const formattedDate = formatDate.replace(/\//g, '-'); // Replace slashes with hyphens
        console.log('date : ' + formattedDate);
        return formattedDate;
    }
}
  const [applicationData, setApplicationData] = useState([]);
  const{setReceivedStage,receivedStage,setloanid } = useContext(ApiContext);
  const getApplicationStatus = async () => {
    try {
      const res = await axios.get('/loans/ApplicationStatus');
      const formattedData = res.data.map(item => {
        const formattedAppliedDate = item.appliedDate
          ? moment(item.appliedDate).format('DD-MM-YYYY')
          : '-';
        const formattedApprovedDate = item.approvedDate
          ? moment(item.approvedDate).format('DD-MM-YYYY')
          : '-';
        const formattedInterest = item.interest != null ? item.interest : '-';
        console.log(formattedAppliedDate);
        console.log(item.stage);
        
      
        return {
          loanType: item.loanCategory,
          applicationID: item.applicationId,
          loanAmount: item.appliedAmount,
          interest: formattedInterest,
          startDate: formattedAppliedDate,
          endDate: addMonthsToDate(formattedApprovedDate, item.requestedTenure) ,
          loanTenure: item.requestedTenure,
          status: item.status,
          
          
        };
      });
      setApplicationData(formattedData);
      console.log(formattedData)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getApplicationStatus();
  }, []);

  const columns = [
    {
      title: 'Loan Type',
      dataIndex: 'loanType',
      key: 'loanType',
    },
    {
      title: 'Application ID',
      dataIndex: 'applicationID',
      key: 'applicationID',
    },
    {
      title: 'Loan Amount',
      dataIndex: 'loanAmount',
      key: 'loanAmount',
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Loan Tenure',
      dataIndex: 'loanTenure',
      key: 'loanTenure',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        let backgroundColor;
        let textColor;
        let borderRadius = '22px';

        if (record.status === 'Accept') {
          backgroundColor = '#6DD7C5';
        } else if (record.status === 'Reject') {
          backgroundColor = '#F87D7C';
        }
        else {
          backgroundColor = '#FFE171';
          textColor = 'black';
        }

        if (record.status === 'Draft') {
          return (
            <Link component = {RouterLink} to="/integration">
            <button
              style={{
                backgroundColor,
                color: textColor,
                width: "80px",
                padding: '5px',
                borderRadius,
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                setReceivedStage(record.stage);
                setloanid(record.loanid)
                console.log(`Button clicked for application ID ${record.applicationID}`,"Stage",receivedStage);
              }}
            >
              {text}
            </button>
            </Link>
          );
        } else {
          const cellStyle = {
            backgroundColor,
            color: textColor,
            padding: '5px',
            borderRadius,
          };
          return <div style={cellStyle}>{text}</div>;
        }
      },
    },
  ];

  return (
    <div className='box4'>
      <Card
        title='Application status'
        style={{
          width: '100%',
          height: '100%',
        }}
      >      <Table dataSource={applicationData} columns={columns} pagination={{ pageSize: 3 }} />
      </Card>
    </div>
  );
};

export default ApplicationStatus;


