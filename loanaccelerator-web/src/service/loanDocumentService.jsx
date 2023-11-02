import axios from '../axios';

async function submitDocumentd(jfile) {
  return new Promise(async (resolve, reject) => {
    try {
      const postResponse = await axios.post('/loanDocuments/add-loan-documents', jfile);
      console.log('POST Response:', postResponse.data);
      resolve(postResponse.data);
    } catch (error) {
      console.error('Error posting loan details:', error);
      reject(error);
    }
  });
}

async function updateDocuments(Document, jfile) {
  return new Promise(async (resolve, reject) => {
    try {
      const putResponse = await axios.put('/loanDocuments/update-loan-documents/' + Document, jfile);
      console.log('PUT Response:', putResponse.data);
      resolve(putResponse.data);
    } catch (error) {
      console.error('Error updating loan details:', error);
      reject(error);
    }
  });
}


const updateStage = (loanId) =>{
    return new Promise(async (resolve) => {
      const updatestage = await axios.put('/loan/update-stages/'+loanId+'?stage='+'2');
      resolve(updatestage.data);
    });
}

export { submitDocumentd, updateDocuments,updateStage };
