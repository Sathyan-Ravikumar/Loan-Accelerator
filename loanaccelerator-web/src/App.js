import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Declaration from './components/forms/Declaration';
import DeclarePopup from './components/forms/DeclarePopup';
import LoanDocument from './components/forms/LoanDocuments';
import PersonalInformation from './components/forms/PersonalInformationPage';
import Sidenav from './components/Sidenav';
import LoanTypes from './components/LoanTypes';
import FinancialInformation from './components/forms/FinancialInfo';
import Addressinformation from './components/forms/Addressinformation';
import Family from './components/forms/Familyandemergency';
import Customerdashboard from './pages/CustomerDashboard';
import Navbar from './layout/Navbar';
import LoanCentric from './components/LoanCentric'
import Integration from './pages/Integration';
import Register from './pages/RegisterPage/Register';
import Login from './pages/Login';
import Appliedloan from './components/appliedloan-manager';
import Approval from './components/Approval-manager';
import Employement from './components/forms/Employement';
import ForgotPassword from './pages/ForgotPassword';
import CustomerDashboardProtected from './routing/CustomerDashboardProtected';
import IntegrationProtected from './routing/IntegrationProtected'; 
import DeclarationProtected from './routing/DeclarationProtected';
import LoanTypesProtected from './routing/LoanTypesProtected';
import AddressInformationProtected from './routing/AddressInformationProtected';
import AppliedLoanManagerProtected from './routing/AppliedLoanManagerProtected';
import ApprovalManagerProtected from './routing/ApprovalManagerProtected';
import DeclarePopupProtected from './routing/DeclarePopupProtected';
import EmploymentProtected from './routing/EmploymentProtected';
import FamilyandEmergencyProtected from './routing/FamilyandemergencyProtected';
import FinacialInformationProtected from './routing/FinancialInformationProtected';
import LoanCentricProtected from './routing/LoanCentricProtected';
import LoanDocumentProtected from './routing/LoanDocumentProtected';
import NavbarProtected from './routing/NavbarProtected';
import PersonalInformationProtected from './routing/PersonalInformationProtected';
import SidenavProtected from './routing/SidenavProtected';
function App() {
  
 
  var token;
  return (
    <BrowserRouter>

       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path='/customer-dashboard' element=
          {
            <CustomerDashboardProtected token={token}>
              <Customerdashboard />
            </CustomerDashboardProtected>
          } />
        <Route path='/integration' element=
          {
            <IntegrationProtected token={token}>
              <Integration />
            </IntegrationProtected>
          } />
        <Route path='/declare' element=
          {
            <DeclarationProtected token={token}>
              <Declaration />
            </DeclarationProtected>
          } />
        <Route path='/declare-popup' element=
          {
            <DeclarePopupProtected token={token}>
              <DeclarePopup />
            </DeclarePopupProtected>
          } />
        <Route path='/loan-types' element=
          {
            <LoanTypesProtected token={token}>
              <LoanTypes />
            </LoanTypesProtected>
          } />
        <Route path='/address-information' element=
          {
            <AddressInformationProtected token={token}>
              <Addressinformation />
            </AddressInformationProtected>
          } />
        <Route path='/applied-loan' element=
          {
            <AppliedLoanManagerProtected token={token}>
              <Appliedloan />
            </AppliedLoanManagerProtected>
          } />
        <Route path='/approval' element=
          {
            <ApprovalManagerProtected token={token}>
              <Approval />
            </ApprovalManagerProtected>
          } />
        <Route path='/employment' element=
          {
            <EmploymentProtected token={token}>
              <Employement />
            </EmploymentProtected>
          } />
        <Route path='/family-emergency' element=
          {
            <FamilyandEmergencyProtected token={token}>
              <Family />
            </FamilyandEmergencyProtected>
          } />
        <Route path='/loan-centric' element=
          {
            <LoanCentricProtected token={token}>
              <LoanCentric />
            </LoanCentricProtected>
          } />
        <Route path='/financial-information' element=
          {
            <FinacialInformationProtected token={token}>
              <FinancialInformation />
            </FinacialInformationProtected>
          } />
        <Route path='/Loan-document' element=
          {
            <LoanDocumentProtected token={token}>
              <LoanDocument />
            </LoanDocumentProtected>
          } />
        <Route path='/navbar' element=
          {
            <NavbarProtected token={token}>
              <Navbar />
            </NavbarProtected>
          } />
        <Route path='/personal-information' element=
          {
            <PersonalInformationProtected token={token}>
              <PersonalInformation />
            </PersonalInformationProtected>
          } />
        <Route path='/side-navbar ' element=
          {
            <SidenavProtected token={token}>
              <Sidenav />
            </SidenavProtected>
          } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;





