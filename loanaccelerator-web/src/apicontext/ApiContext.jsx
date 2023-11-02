import React, { createContext, useState,  } from 'react';

const ApiContext = createContext();
const ApiContextProvider = ({ children }) => {
  const [NewAmount, setNewAmount] = useState('');
  const [NewTenure, setNewTenure] = useState('');
  const [NewFullName, setNewFullName] = useState('');
  const [NewDob, setNewDob] = useState('');
  const [NewTaxId, setNewTaxId] = useState('');
  const [NewPermanent, setNewPermanent] = useState('');
  const [NewMobile1, setNewMobile1] = useState('');
  const [NewTelephone, setNewTelephone] = useState('');
  const [NewSpouse, setNewSpouse] = useState('');
  const [NewMobile3, setNewMobile3] = useState('');
  const [NewRelationship, setNewRelationship] = useState('');
  const [NewContact, setNewContact] = useState('');
  const [NewMobile2, setNewMobile2] = useState('');
  const [NewCompName, setNewCompName] = useState('');
  const [NewPhone, setNewPhone] = useState('');
  const [NewDesignation, setNewDesignation] = useState('');
  const [NewIncome, setNewIncome] = useState('');
  const [NewExpenses, setNewExpenses] = useState('');
  const [NewApplicationId, setNewApplicationId] = useState('');
  const [NewDateOfBirth, setNewDateOfBirth] = useState('');
  const [NewAppliedDate, setAppliedDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [status, setstatus] = useState('yet to post');
  const [PostedDocuments, setPostedDocuments] = useState([]);
  const [Document1, setDocument1] = useState(null);
  const [Document2, setDocument2] = useState(null);
  const [Document3, setDocument3] = useState(null);
  const [eligibilityScore, setEligibilityScore] = useState();
  const [token, setToken] = useState();
  const [selectedApplicationNumber, setSelectedApplicationNumber] = useState();
  const [loanTypeId, setLoanTypeId] = useState('1');
  const [loanCategoryId,setLoanCategoryId]= useState();
  const [stage, setStage] = useState(0);
  const [loanservice,setloanservice]= useState();
  const [receivedStage , setReceivedStage] = useState(null);
  const [loanid, setloanid] = useState(0);
  const [formref, setformref] = useState('');
  return (
    <ApiContext.Provider value={{
     formref, loanid , NewAmount, NewTenure, NewFullName, NewDob, NewTaxId, NewPermanent,
      NewMobile1, NewTelephone, NewSpouse, NewMobile3, NewRelationship, loanTypeId,NewContact, NewMobile2, NewCompName,
      NewPhone, NewDesignation, NewIncome, NewExpenses, NewApplicationId, NewDateOfBirth, NewAppliedDate, selectedFiles, status,eligibilityScore,
      token, PostedDocuments,Document1, Document2, Document3,loanCategoryId,selectedApplicationNumber,stage,loanservice,receivedStage,setformref ,setloanid,
      setNewAmount, setNewTenure, setNewFullName, setNewDob, setNewTaxId, setNewPermanent,setLoanCategoryId,
      setNewMobile1, setNewTelephone, setNewSpouse, setNewMobile3, setNewRelationship, setNewContact, setNewMobile2, setNewCompName,
      setNewPhone, setNewDesignation, setNewIncome, setNewExpenses, setNewDateOfBirth, setLoanTypeId,setNewApplicationId, setAppliedDate, setSelectedFiles, setstatus,
      setPostedDocuments, setDocument1, setDocument2, setDocument3,setEligibilityScore,setToken,setSelectedApplicationNumber,setStage,setloanservice,setStage,setReceivedStage
    }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiContextProvider };