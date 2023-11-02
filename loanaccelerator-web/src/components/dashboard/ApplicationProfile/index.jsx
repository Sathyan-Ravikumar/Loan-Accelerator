import React, { useEffect, useRef } from 'react';
import './index.css'
import { Card } from 'antd';
import { Chart } from 'chart.js'; // Import Chart.js

const ApplicationProfile = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    // Define data for the first chart
    const data1 = {
      labels: ["x", "y"],
      datasets: [
        {
          data: [30, 70],
          backgroundColor: ["#FBB851", "#EDF1F5"],
          hoverBackgroundColor: ["#FBB851", "#EDF1F5"],
        },
      ],
    };

    // Define data for the second chart
    const data2 = {
      labels: ["X", "Y"],
      datasets: [
        {
          data: [60, 40],
          backgroundColor: ["#F37E20", "#EDF1F5"],
          hoverBackgroundColor: ["#F37E20", "#EDF1F5"],
          labels: ["Label X", "Label Y"],
        },
      ],
    };

    // Destroy any existing charts on the canvas elements
    if (chartRef1.current) {
      const ctx1 = chartRef1.current.getContext("2d");
      if (ctx1.chart) {
        ctx1.chart.destroy();
      }
    }

    if (chartRef2.current) {
      const ctx2 = chartRef2.current.getContext("2d");
      if (ctx2.chart) {
        ctx2.chart.destroy();
      }
    }

    // Create the first chart
    const ctx1 = chartRef1.current.getContext("2d");
    ctx1.chart = new Chart(ctx1, {
      type: 'doughnut',
      data: data1,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    // Create the second chart
    const ctx2 = chartRef2.current.getContext("2d");
    ctx2.chart = new Chart(ctx2, {
      type: 'doughnut',
      data: data2,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, []);

  return (
    <div className='box5'>
      <Card
        title="My Application Profile"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <p className='loanrstatus'> Loan Repayment Status</p>


        {/* Include canvas elements for the charts */}
        <div className='appcharts'>
          <div className="chart1">
            <h5 className='chartpercentage'>25%</h5>
            <canvas ref={chartRef1}  />
           

            <p className='apploanname'>Car loan</p>
            <p className='apploanamount'>₹25,540</p>
            <p className='balancetenure'>4 years are remaining <br></br>to pay 100% loan</p>

          </div>
          <div className="chart2">
          <h5 className='chartpercentage'>60%</h5>
            <canvas ref={chartRef2} />
            <p className='apploanname'>Personal loan</p>
            <p className='apploanamount'>₹9,540</p>
            <p className='balancetenure'>2 years are remaining <br></br>to pay 100% loan</p>
          </div>

        </div>
        <div className='completereportlink'>
          <a href=''>Click here to view the complete Report</a>
        </div>

      </Card>
    </div>
  );
};

export default ApplicationProfile;
