import React from 'react'
import './index.css'
import { Card, Space } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
 
const LoanReco = () => {
    return (

        <div class="box1">
            <Card title="What Loans are you looking for?"
                style={{
                    width: '100%', height: '100%'
                }}
            >
                <p class="para">
                    What’s more, if you are eligible for a pre-approved offer, you can get instant  <br></br>
                    loan sanction with no documentation. Added benefits include, attractive interest <br />
                    rate, low EMI and simplified loan application and disbursement process.
                </p>
                <div>
                    <p class="para2">
                        <a href="#">click here</a> to check your loan eligibility status
                    </p>
                </div>
                <br />
                <div>
                    <button className='applynowbutton' > <Link component={RouterLink} to="/loan-types" style={{textDecoration:'none',color:'white'}}>APPLY NOW</Link></button>
                </div>
            </Card>
        </div>

    )
}

export default LoanReco