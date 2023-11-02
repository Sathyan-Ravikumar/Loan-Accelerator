import axios from '../axios';

const updatedeclaration = (loanid,values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postResponse = await axios.put('/loan/update-customer-loan/' + loanid, values);
      const putResponse = axios.put('/loan/update-stages/'+loanid+'?stage=8');
      resolve(postResponse.data);
    } catch (error) {
      reject(error);
    }
  });
};




export {updatedeclaration };
