import axios from '../axios';

const submitEmployment = (updatedEmp) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postResponse = await axios.post('/employment/add-customer-employment-details', updatedEmp);
      const putResponse = axios.put('/loan/update-stages/'+ postResponse.data.loanId+'?stage='+'6');
      resolve(postResponse.data);
    } catch (error) {
      reject(error);
    }
  });
};

const updateEmployment = (employementId, updatedEmp) => {
  return new Promise(async (resolve, reject) => {
    try {
      const putResponse = await axios.put('/employment/update-customer-employment-details/' + employementId, updatedEmp);
      resolve(putResponse.data);
    } catch (error) {
      reject(error);
    }
  });
};



export { submitEmployment, updateEmployment };
