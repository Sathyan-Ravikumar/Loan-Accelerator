import axios from '../axios';

const submitPersonalInformation = (updatedValues) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postResponse = await axios.post('/personal/add-customer-personal-information', updatedValues);
      const putResponse = axios.put('/loan/update-stages/' + postResponse.data.loanId + '?stage=3');
      resolve(postResponse.data);
    } catch (error) {
      reject(error);
    }
  });
};

const updatePersonalInformation = (personalInformationId, updatedValues) => {
  return new Promise(async (resolve, reject) => {
    try {
      const putResponse = await axios.put(`/personal/update-customer-personal-information/${personalInformationId}`, updatedValues);
      resolve(putResponse.data);
    } catch (error) {
      reject(error);
    }
  });
};

const district = () =>{
    return new Promise(async (resolve, reject) => {
        try{
           const districtApi = await axios.get('http://api.nightlights.io/districts');
           resolve(districtApi.data)
        }
        catch (error){
            reject(error);
        }
    });
}

export { submitPersonalInformation, updatePersonalInformation,district };
