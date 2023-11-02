import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { Chart, registerables } from 'chart.js';
import red from '../../../assets/images/Ellipse 6.png';
import yellow from '../../../assets/images/Ellipse 5.png';
import { Card } from 'antd';

Chart.register(...registerables);

let chartInstance = null;

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('10000');
  const [interestRate, setInterestRate] = useState('3.5%');
  const [tenure, setTenure] = useState('3');
  const [emiAmount, setEmiAmount] = useState(0);
  const [totalRepayable, setTotalRepayable] = useState(0);
  const [chartVisible, setChartVisible] = useState(false);
  const [totalInterest, setTotalInterest] = useState(0);

  const chartRef = useRef(null);

  const loanTypeInterestRates = {
    'Personal loan': '3.5%', 
    'Consumer loan': '8%',
    'Vehicle loan': '7%',
    'House loan': '6%',
    'Medical Loan': '12%',
    'Debt consolidation Loan' : "9%",
    'Small business Loan': '10%',
    'Credit card Loan': '12%',
    'Education Loan': '7%'
    
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous Chart instance
      }

      chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Interest', 'Principal'],
          datasets: [
            {
              data: [totalInterest, loanAmount],
              backgroundColor: ['#e74c3c', '#f1c40f'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '82%',
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, [emiAmount, loanAmount, tenure]);


  useEffect(() => {
    calculateEmi();
  }, [loanAmount, interestRate, tenure]);

  const calculateEmi = () => {
    const principle = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const timeInYears = parseFloat(tenure);
    const timeInMonths = timeInYears * 12;

    const emi =
      (principle * rate * Math.pow(1 + rate, timeInMonths)) / (Math.pow(1 + rate, timeInMonths) - 1);
    const totalAmountPayable = emi * timeInMonths;
    const totalInterestPayable = totalAmountPayable - principle;


    setEmiAmount(isNaN(emi) ? 0 : emi.toFixed(2));
    setTotalRepayable(isNaN(totalAmountPayable) ? 0 : totalAmountPayable.toFixed(2));
    setTotalInterest(isNaN(totalInterestPayable) ? 0 : totalInterestPayable.toFixed(2));
    setChartVisible(true);
  };

  const handleTenureChange = (e) => {
    setTenure(e.target.value);
  };

  const handleLoanTypeChange = (e) => {
    const selectedLoanType = e.target.value;
    // Look up the interest rate based on the selected loan type
    const selectedInterestRate = loanTypeInterestRates[selectedLoanType] || '3.5%';
    setInterestRate(selectedInterestRate);
  };


  return (
    <div className='box2'>
      <Card
        title={
          <div className='headcal'>
     
            <p className='emititle' style={{ display: 'inline-block', marginLeft: '3px', padding: '20px',  fontSize:'20px', marginTop:'-10px'  }}>EMI Calculator</p>
            <img src={yellow} alt="Yellow Icon" width="10px" height="10px" style={{ marginLeft: '100px', marginTop: '25px' }} /><p className='alignment2' style={{ marginTop: '18px', marginLeft: '10px' }}>Principle</p>
            <img className='redimg' src={red} width="10px" height="10px" style={{ marginTop: '25px', marginLeft: '25px' }} /><p className='alignment1' style={{ marginTop: '18px', marginLeft: '10px' }}>Interest</p>
          </div>
        }
        style={{
          width: '100%', height: '100% '
        }} >
        <div className='align'>
          <div>
            <div className="input-group">
              <select className='select1' onChange={handleLoanTypeChange}>
                <option value="Personal loan">Personal loan</option>
                <option value="Consumer loan">Consumer loan</option>
                <option value="Vehicle loan">Vehicle loan</option>
                <option value="House loan">House loan</option>
                <option value="Medical Loan">Medical Loan</option>
                <option value="Debt consolidation Loan">Debt consolidation Loan</option>
                <option value="Small business Loan">Small business Loan</option>
                <option value="Credit card Loan">Credit card Loan</option>
                <option value="Education Loan">Education Loan</option>
              </select>
            </div>


            <div className="input-group">


              <input
                type="number"
                id="loan-amount"
                value={loanAmount}
                placeholder=' Enter Amount'
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>


            <div className='rateandtime'>
              <input
                  type="numbers"
                  id="select2"
                  value={tenure}
                  placeholder=' Tenure in years'
                  onChange={handleTenureChange}
                />

              <div className="input-group">

                <input
                  type="interest"
                  id="interest-rate"
                  value={interestRate}
                  placeholder='Interest'
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="result">
              {chartVisible && (
                <div className="emi-chart">
                  <canvas ref={chartRef} />
                  <div className="emi-chart-text">
                    <p className="emi-label">EMI</p>
                    <p className="emi-amount">₹{emiAmount} <span className="emi-label">/month</span></p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
        <div className='amountdisplay'>
          <div className='emi-label123'>
            <p className="emi-label"> EMI Amount</p>
            <p className="emi-amount">₹{emiAmount}</p>
          </div>
          <div className='trp'>
            <p className="total-repayable-label">Total Repayable</p>
            <p className="total-repayable">₹{totalRepayable}</p>
          </div>
        </div>
      </Card>

    </div>
  );
};

export default EmiCalculator;

