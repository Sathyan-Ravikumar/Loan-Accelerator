import axios from '../axios';

const postFamily = (updatedFamily) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postfamily = await axios.post('/family/add-customer-family-details', updatedFamily);
      resolve(postfamily.data);
    } catch (error) {
      console.error('Error:', error);
      reject(error);
    }
  });
};

const postEmergency = (updatedEmergency) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postemergency = await axios.post('/emergency/add-customer-emergency-contact', updatedEmergency);
      const putstage = await axios.put('/loan/update-stages/' + postemergency.data.loanId + '?stage=5');
      resolve(postemergency.data);
    } catch (error) {
      console.error('Error:', error);
      reject(error);
    }
  });
};

const updatefamilyandemergency = (familyid, EmergencyId, updatedFamily, updatedEmergency) => {
  return new Promise(async (resolve, reject) => {
    try {
      const putResponseF = await axios.put('/family/update-customer-family-details/' + familyid, updatedFamily);
      const putResponse = await axios.put('/emergency/update-customer-emergency-contact/' + EmergencyId, updatedEmergency);
      resolve({ putResponseF, putResponse });
    } catch (error) {
      console.error('Error:', error);
      reject(error);
    }
  });
};

export { postFamily, updatefamilyandemergency, postEmergency };
