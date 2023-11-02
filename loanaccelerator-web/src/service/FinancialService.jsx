import axios from '../axios';

const submitFinancial = (updatedFinance) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postResponse = await axios.post('/financial/add-customer-financial-information', updatedFinance);
      const putResponse = axios.put('/loan/update-stages/'+postResponse.data.loanId+'?stage='+'7');
      resolve(postResponse.data);
    } catch (error) {
      reject(error);
    }
  });
};

const updateFinancial = (FinId, updatedFinance) => {
  return new Promise(async (resolve, reject) => {
    try {
      const putResponse = await axios.put('/financial/update-customer-financial-information/' + FinId, updatedFinance);
      resolve(putResponse.data);
    } catch (error) {
      reject(error);
    }
  });
};



export { submitFinancial, updateFinancial };
