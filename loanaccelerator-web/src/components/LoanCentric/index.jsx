 
import { Card, Col, Row } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import EducationLoan from "../../assets/images/Education Loan.svg"
import DebtConsolidationLoan from "../../assets/images/DebtConsolidationLoan.svg"
import SmallBusinessLoan from "../../assets/images/SmallBusinessLoan.svg"
import CreditCardLoan from "../../assets/images/CreditCardLoan.svg"
import VehicleLoan from "../../assets/images/VehicleLoan.svg"
import ConsumerLoan from "../../assets/images/ConsumerLoan.svg"
import PersonalLoan from "../../assets/images/PersonalLoan.svg"
import HousingLoan from "../../assets/images/HousingLoan.svg"
import { Typography } from 'antd/es';
import Icon from '@ant-design/icons/lib/components/Icon';
import { Button } from 'antd';
import './index.css';
import { useState } from 'react';
import axios from '../../axios';

const apiResponse = [
  { id: 1, title: 'Medical Loan ',name : EducationLoan, successRate: 'Success Rate 15%' },
  { id: 2, title: 'Education Loan',name :EducationLoan, successRate: 'Success Rate 20%' },
  { id: 3, title: 'Debt Consolidation Loan',name : DebtConsolidationLoan, successRate: 'Success Rate 25%' },
  { id: 4, title: 'Small Business Loan',name : SmallBusinessLoan, successRate: 'Success Rate 30%' },
  { id: 5, title: 'Credit Card Loan',name : CreditCardLoan, successRate: 'Success Rate 30%' },
  { id: 6, title: 'Vehicle Loan',name:VehicleLoan, successRate: 'Success Rate 30%' },
  { id: 7, title: 'Consumer Loan',name:ConsumerLoan, successRate: 'Success Rate 30%' },
  { id: 8, title: 'Personal Loan',name:PersonalLoan, successRate: 'Success Rate 30%' },
  { id: 9, title: 'Housing Loan',name:HousingLoan, successRate: 'Success Rate 30%' },
 

];

const YourComponent = () => {
  const [data,setdata] = useState([]);

  axios.get('/categories/loan-category').then((response)=>setdata(response.data));

  return (
    <><div>
      {data.map(item => {
        <div key={item.loanCategoryId}>Jii{item.loanCategory1}</div>;
      })}
    </div>
    <div className="cards-container" style={{ display: "flex", flexWrap: "wrap" }}>
        {apiResponse.slice(0, 9).map((card) => (
          <Col xs={24} sm={12} md={8} key={card.id}>
            <Card className="custom-card" style={{ width: "485px", marginLeft: "10px", marginTop: "50px" }}>
              <div className="card-title">
                <img src={card.name} alt="Image" className="title-image" style={{ width: "80px", height: "80px" }} />
                <Typography><span style={{ fontWeight: 500, fontSize: "24px", color: "#2C76C9" }}>{card.title}</span>
                  <br></br>
                  <span style={{ fontWeight: 400, fontSize: "18px", color: "#9095AE" }}>{card.successRate}</span></Typography>
              </div>
              <div className="card-line" style={{ marginTop: "2%" }}>
                <div className="card-content" style={{ backgroundColor: "#F0F3F8", height: "56px", paddingLeft: "5%", display: "flex" }}>
                  <Typography style={{ fontWeight: 500, fontSize: "20px", color: "#37414A", paddingTop: "2%" }}> <Button type="ghost" style={{ fontSize: "21px" }}> View Details </Button><ArrowRightOutlined /> </Typography>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </div></>
  );
};

export default YourComponent;
