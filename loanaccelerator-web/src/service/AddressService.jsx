import axios from '../axios';

const submitAddress = (updatedValues) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postResponse = await axios.post('/address/add-customer-address', updatedValues);
      await axios.put('/loan/update-stages/' + postResponse.data.loanId + '?stage=4');
      resolve(postResponse.data);
    } catch (error) {
      console.error('Error:', error);
      reject(error);
    }
  });
};

const updateAddress = async (addressId, updatedValues) => {
    try {
      const putResponse = await axios.put('/address/update-customer-address-by-id/' + addressId, updatedValues);
      return putResponse.data; 
    } catch (error) {
      throw error; 
    }
  };
  

export { submitAddress, updateAddress };
