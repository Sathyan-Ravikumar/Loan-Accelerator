import axios from '../axios';

async function submitLoanDetails(updatedValues) {
  return new Promise(async (resolve, reject) => {
    try {
      console.error('POST Response:',updatedValues);
      const postResponse = await axios.post('/loan/add-customer-loan', updatedValues);
     
      resolve(postResponse.data);
    } catch (error) {
      console.error('Error posting loan details:', error);
      reject(error);
    }
  });
}

async function updateLoanDetails(loanId, updatedValues) {
  return new Promise(async (resolve, reject) => {
    try {
      const putResponse = await axios.put('/loan/update-customer-loan/' + loanId, updatedValues);
      console.log('PUT Response:', putResponse.data);
      resolve(putResponse.data);
    } catch (error) {
      console.error('Error updating loan details:', error);
      reject(error);
    }
  });
}

export { submitLoanDetails, updateLoanDetails };
