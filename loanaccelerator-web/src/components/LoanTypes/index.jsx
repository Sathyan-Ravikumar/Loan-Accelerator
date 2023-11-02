import React, { useState, useEffect, useContext } from 'react';
import style from '../LoanTypes/LoanTypes.module.css';
import ML from '../../assets/images/Medical Loan.svg';
import EL from '../../assets/images/Education Loan.svg';
import DCL from '../../assets/images/Debt Consolidation Loan.svg';
import SBL from '../../assets/images/Small Business Loan.svg';
import CCL from '../../assets/images/Creditcard Loan.svg';
import VL from '../../assets/images/Vehicle-Loan.svg';
import CL from '../../assets/images/Consumer Loan.svg';
import PL from '../../assets/images/PersonalLoan.svg';
import HL from '../../assets/images/Housing Loan.svg';
import note from '../../assets/images/note.svg';
import bell from '../../assets/images/bell.svg';
import Navbar from '../../layout/Navbar';
import arrow from '../../assets/images/NextButtonArrow.svg';
import Sidenav from '../../layout/Sidebar';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Radio, Space, Divider } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { ApiContext } from '../../apicontext/ApiContext';
import { Card } from 'antd';
const { Meta } = Card;



const LoanTypes = () => {

    const { loanCategoryId, setLoanCategoryId } = useContext(ApiContext);

    const [clickedCard, setClickedCard] = useState(null);

    const handleCardClick = (primaryKeyValue) => {
        setClickedCard(primaryKeyValue);
        setLoanCategoryId(primaryKeyValue);
    };
    console.log(loanCategoryId);
    const [color, setColor] = useState('blue'); // Initial color state

    const handleClick = () => {

        setColor(prevColor => (prevColor === 'blue' ? 'black' : 'blue'));
        console.log('Component clicked'); 
    };

    const [categories, setCategories] = useState([]); // State to store fetched categories

    const firstRowCategories = categories.slice(0, 5); // First 5 categories
    const secondRowCategories = categories.slice(5, 9); // Remaining 4 categories


    const Category = async () => {
        try {
            const response = await axios.get('/categories/loan-category');
            setCategories(response.data); // Assuming the data is an array of categories
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    useEffect(() => {
        Category(); // Fetch categories when the component mounts
    }, []);


    const navigate = useNavigate();

    const getImageByFilename = (filename) => {
        switch (filename) {
            case 'Medical Loan':
                return ML;
            case 'Education Loan':
                return EL;
            case 'Debt Consolidation Loan':
                return DCL;
            case 'Small Business Loan':
                return SBL;
            case 'Creditcard Loan':
                return CCL;
            case 'Vehicle Loan':
                return VL;
            case 'Consumer Loan':
                return CL;
            case 'Personal Loan':
                return PL;
            case 'Housing Loan':
                return HL;

            default:
                return '';
        }
    };

    return (

        <div>

            <div className={`${style.firstcolumn} ${style.grey}`}>


                <div>
                    <Sidenav />
                </div>

                <div className={style.column}>

                    <div>
                        <Navbar />
                    </div>
                    <div className={`${style.newcolumn} ${style.grey}`}>
                        <div className={`${style.column} ${style.div2}`}>
                            <div className={style.div21}>
                                <img src={bell} alt="sorry" ></img>
                            </div>
                            <div className={style.div22}>
                                <p >
                                    A few clicks away from
                                    applying your loan.
                                </p>
                            </div>
                            <div className={style.div23}>
                                <p>
                                    Avail quick & easy Personal Loans from the comfort
                                    of your home. Apply online & get instant approval.
                                </p>
                            </div>
                            <div className={style.div24}>
                                <img src={note} alt=""></img>
                            </div>
                        </div>



                        <div className={`${style.column} ${style.div3}`}>
                            <div className={style.div31}>
                                <h1>
                                    Select loan category
                                </h1>
                            </div >
                            <div className={style.div32}>
                                <p>
                                    Applying your loan is just a few steps away. Select any
                                    one of the loan type to continue.
                                </p>
                            </div >




                            <div className={style.row} >
                                {firstRowCategories.map((category, index) => (


                                    <Card
                                        key={index}
                                        hoverable
                                        style={{ width: 200, margin: '10px 20px 20px 10px' }}
                                        className={style.card}
                                        cover={
                                            <div className={style.imageContainer}>
                                                <img
                                                    alt={category.loanCategoryKey}
                                                    src={getImageByFilename(category.loanCategory1)}
                                                    className={style.image}
                                                />
                                            </div>
                                        }
                                        onClick={() => handleCardClick(category.loanCategoryId)}
                                    >


                                        <Meta title={category.loanCategory1} className={style.CardLoanText} />

                                    </Card>
                                ))
                                }
                            </div>
                            <br></br>
                            <div className={style.row} >
                                {secondRowCategories.map((category, index) => (


                                    <Card
                                        key={index} // Using index as the key; make sure to use a unique identifier from your data
                                        hoverable
                                        style={{ width: 200, margin: '10px 20px 20px 10px', borderColor: clickedCard === category.loanCategoryId ? '#4040a1' : '#d9d9d9' }}
                                        className={style.card}
                                        cover={
                                            <div className={style.imageContainer}>
                                                <img
                                                    alt={category.loanCategoryKey}
                                                    src={getImageByFilename(category.loanCategory1)}
                                                    className={style.image}
                                                />
                                            </div>
                                        }

                                        onClick={() => handleCardClick(category.loanCategoryId)}                                    >
                                        <Meta title={category.loanCategory1} className={style.CardLoanText}/>

                                    </Card>
                                ))
                                }
                            </div>

                            <div className={style.button1}>
                                <Button
                                    className={style.button2}
                                    type="primary"
                                    size='large'
                                    onClick={() => navigate('/integration')}
                                    style={{
                                        display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center'
                                    }}
                                >
                                    <img src={arrow} style={{ marginLeft: '18px', marginTop: '2px' }} alt="Next arrow" />

                                    NEXT

                                </Button>


                            </div>

                        </div>
                    </div>
                </div>

            </div>



        </div>

    );

};

export default LoanTypes;




// import React, { useState, useEffect, useContext } from 'react';
// import style from '../LoanTypes/LoanTypes.module.css';
// import ML from '../../assets/images/Medical Loan.svg';
// import EL from '../../assets/images/Education Loan.svg';
// import DCL from '../../assets/images/Debt Consolidation Loan.svg';
// import SBL from '../../assets/images/Small Business Loan.svg';
// import CCL from '../../assets/images/Creditcard Loan.svg';
// import VL from '../../assets/images/Vehicle-Loan.svg';
// import CL from '../../assets/images/Consumer Loan.svg';
// import PL from '../../assets/images/PersonalLoan.svg';
// import HL from '../../assets/images/Housing Loan.svg';
// import note from '../../assets/images/note.svg';
// import bell from '../../assets/images/bell.svg';
// import Navbar from '../../layout/Navbar';
// import arrow from '../../assets/images/NextButtonArrow.svg';
// import Sidenav from '../Sidenav';
// import { DownloadOutlined } from '@ant-design/icons';
// import { Button, Radio, Space, Divider } from 'antd';
// import { ArrowRightOutlined } from '@ant-design/icons';
// import { Avatar, Badge } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import axios from '../../axios';
// import { ApiContext } from '../../apicontext/ApiContext';
// import { Card } from 'antd';
// const { Meta } = Card;



// const LoanTypes = () => {

//     const { loanCategoryId, setLoanCategoryId } = useContext(ApiContext);

//     const [clickedCard, setClickedCard] = useState(null);

//     const handleCardClick = (primaryKeyValue) => {
//         setClickedCard(primaryKeyValue);
//         setLoanCategoryId(primaryKeyValue);
//     };
//     console.log(loanCategoryId);
//     const [color, setColor] = useState('blue'); // Initial color state

//     const handleClick = () => {

//         setColor(prevColor => (prevColor === 'blue' ? 'black' : 'blue'));
//         console.log('Component clicked'); // Change color to blue when clicked
//     };

//     const [categories, setCategories] = useState([]); // State to store fetched categories

//     const firstRowCategories = categories.slice(0, 5); // First 5 categories
//     const secondRowCategories = categories.slice(5, 9); // Remaining 4 categories


//     const Category = async () => {
//         try {
//             const response = await axios.get('/categories/loan-category');
//             setCategories(response.data); // Assuming the data is an array of categories
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
//     };
//     useEffect(() => {
//         Category(); // Fetch categories when the component mounts
//     }, []);


//     const navigate = useNavigate();

//     const getImageByFilename = (filename) => {
//         switch (filename) {
//             case 'Medical Loan':
//                 return ML;
//             case 'Education Loan':
//                 return EL;
//             case 'Debt Consolidation Loan':
//                 return DCL;
//             case 'Small Business Loan':
//                 return SBL;
//             case 'Creditcard Loan':
//                 return CCL;
//             case 'Vehicle Loan':
//                 return VL;
//             case 'Consumer Loan':
//                 return CL;
//             case 'Personal Loan':
//                 return PL;
//             case 'Housing Loan':
//                 return HL;

//             default:
//                 return '';
//         }
//     };

//     return (

//         <div>

//             <div className={`${style.firstcolumn} ${style.grey}`}>


//                 <div>
//                     <Sidenav />
//                 </div>

//                 <div className={style.column}>

//                     <div>
//                         <Navbar />
//                     </div>
//                     <div className={`${style.newcolumn} ${style.grey}`}>
//                         <div className={`${style.column} ${style.div2}`}>
//                             <div className={style.div21}>
//                                 <img src={bell} alt="sorry" ></img>
//                             </div>
//                             <div className={style.div22}>
//                                 <p >
//                                     A few clicks away from
//                                     applying your loan.
//                                 </p>
//                             </div>
//                             <div className={style.div23}>
//                                 <p>
//                                     Avail quick & easy Personal Loans from the comfort
//                                     of your home. Apply online & get instant approval.
//                                 </p>
//                             </div>
//                             <div className={style.div24}>
//                                 <img src={note} alt=""></img>
//                                 {/* <img src="./Polygon 2.png" alt="">
// <img src="./Polygon 3.png" alt="">
// <img src="./Rectangle 369 (1).png" alt=""> */}
//                             </div>
//                         </div>



//                         <div className={`${style.column} ${style.div3}`}>
//                             <div className={style.div31}>
//                                 <h1>
//                                     Select loan category
//                                 </h1>
//                             </div >
//                             <div className={style.div32}>
//                                 <p>
//                                     Applying your loan is just a few steps away. Select any
//                                     one of the loan type to continue.
//                                 </p>
//                             </div >




//                             <div className={style.row} >
//                                 {firstRowCategories.map((category, index) => (


//                                     <Card
//                                         key={index}
//                                         hoverable
//                                         style={{ width: 200, margin: '10px 20px 20px 10px' }}
//                                         className={style.card}
//                                         cover={
//                                             <div className={style.imageContainer}>
//                                                 <img
//                                                     alt={category.loanCategoryKey}
//                                                     src={getImageByFilename(category.loanCategory1)}
//                                                     className={style.image}
//                                                 />
//                                             </div>
//                                         }
//                                         onClick={() => handleCardClick(category.loanCategoryId)}
//                                     >


//                                         <Meta title={category.loanCategory1} />

//                                     </Card>
//                                 ))
//                                 }
//                             </div>
//                             <br></br>
//                             <div className={style.row} >
//                                 {secondRowCategories.map((category, index) => (


//                                     <Card
//                                         key={index} // Using index as the key; make sure to use a unique identifier from your data
//                                         hoverable
//                                         style={{ width: 200, margin: '10px 20px 20px 10px', borderColor: clickedCard === category.loanCategoryId ? '#4040a1' : '#d9d9d9' }}
//                                         className={style.card}
//                                         cover={
//                                             <div className={style.imageContainer}>
//                                                 <img
//                                                     alt={category.loanCategoryKey}
//                                                     src={getImageByFilename(category.loanCategory1)}
//                                                     className={style.image}
//                                                 />
//                                             </div>
//                                         }

//                                         onClick={() => handleCardClick(category.loanCategoryId)}                                    >
//                                         <Meta title={category.loanCategory1} />

//                                     </Card>
//                                 ))
//                                 }
//                             </div>

//                             <div className={style.button1}>
//                                 <Button
//                                     className={style.button2}
//                                     type="primary"
//                                     size='large'
//                                     onClick={() => navigate('/integration')}
//                                     style={{
//                                         display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center'
//                                     }}
//                                 >
//                                     <img src={arrow} style={{ marginLeft: '18px', marginTop: '2px' }} alt="Next arrow" />

//                                     NEXT

//                                 </Button>


//                             </div>

//                         </div>
//                     </div>
//                 </div>

//             </div>



//         </div>

//     );

// };

// export default LoanTypes;