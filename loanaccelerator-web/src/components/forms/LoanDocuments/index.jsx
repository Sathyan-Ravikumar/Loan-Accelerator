import React,{useState ,useContext,useEffect} from "react";
import { Space , message } from 'antd';
import {Form,Button  } from 'antd';
 import arrow from '../../../assets/images/NextButtonArrow.svg';
import {  Card, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import './index.css';
import AWS from 'aws-sdk';
import axios from '../../../axios';
import { ApiContext } from '../../../apicontext/ApiContext';
import {Alert} from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { Stage } from "@antv/g2plot/lib/lab";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESSKEYID,
  secretAccessKey: process.env.REACT_APP__SECRETACCESSKEY,
  region: process.env.REACT_APP_REGION
});

const s3 = new AWS.S3();
const { Text } = Typography;
const fileInputRefs = Array.from({ length: 3 }, () => React.createRef());
const Documents = ({getPrevData, loanId,onNextStep,onBackStep,setsuccess, onNext, onPrev, setFormData2 }) => {
  
  const { selectedFiles, setSelectedFiles,setstatus,status,
    setDocument1 , setDocument2 , setDocument3, Document1,Document2,Document3,setStage,stage,receivedStage} = useContext(ApiContext);
    const [showAlert, setShowAlert] = useState(false);

    const handleFileChange = (event, index) => {
      const file = event.target.files[0];
      setSelectedFiles((prevSelectedFiles) => {
        const newSelectedFiles = [...prevSelectedFiles];
        newSelectedFiles[index] = file;
        return newSelectedFiles;
      });
    };
   
    useEffect(() => {
      setStage(2);
    }, []);

    const handleButtonClick = (index) => {
      fileInputRefs[index].current.click();
    };
  
    const handleSubmit =  (e) => {
    
        try {

          if (selectedFiles.length===3){
            console.log("before calling looping")
            looping();
            onNext();
            setsuccess(1);
            onNextStep()
          }
          else{
            
             if (selectedFiles[0] == null){          
            message.warning("Upload Passport Size Photo");
            }
            if (selectedFiles[1] == null){
            message.warning("Upload Signature Photo");

            }
            if (selectedFiles[2] == null){
            message.warning("Upload ID Proof Photo");
            }
            
          }       
        } catch (error) {
          console.log(error);
        }

      };
      const handleBack = async (e) => {
        e.preventDefault();
        
        try {
         
          setFormData2('');
          onPrev();
          onBackStep();
          getPrevData();

        } catch (error) {
          console.log(error);
        }
        };
        const jfile = {         
          "loanId": loanId,
          "documentTypeId": 1,
          "documentLink": "",
        }
        
        let id=0;
        const looping = () => {
          //getPrevData();

          if (selectedFiles.length === 3 && status === 'yet to post' ){
             setstatus('posted');
             console.log("status",status)
              selectedFiles.map((event , index) => {

                const file = event;
                const fileName = file.name;
                
                const params = {
                  Bucket: 'uploadimagesfromreact', 
                  Key: fileName,
                  Body: file,
                };

                s3.upload(params, async (err, data) => {
                  if (err) {
                    console.error('Error occurred while uploading image:', err);
                  } else {
                    jfile.documentLink = data.Location;
                    id+=1;
                    jfile.documentTypeId = id;
                   
                    const postResponse = await axios.post('/loanDocuments/add-loan-documents', jfile);
              
                    if (index === 0 ){
                      setDocument1(postResponse.data.documentId)
                    }
                    else if(index === 1){
                      setDocument2(postResponse.data.documentId)
                    }
                    else{
                      setDocument3(postResponse.data.documentId)
                    } 
                  }
                });
                
                const putResponse = axios.put('/loan/update-stages/'+loanId+'?stage=3');
                console.log(putResponse);      
              })}   
                else if(status === 'posted'){
                  updateUrl();
                }};
            const updateUrl= () =>{
              console.log("update should be done")
              for (let i = 0; i < 3; i++){
                selectedFiles.map((event , index) => {

                  const file = event;
                  const fileName = file.name;
                  
                  const params = {
                    Bucket: 'uploadimagesfromreact', 
                    Key: fileName,
                    Body: file,
                  };
                  s3.upload(params, async (err, data) => {
                    if (err) {
                      console.error('Error occurred while uploading image:', err);
                    } else {
                      jfile.documentLink = data.Location;
                      id+=1;
                      jfile.documentTypeId = id;
                      
                      if (i === 0){
                        const postResponse = await axios.put('/loanDocuments/update-loan-documents/'+Document1, jfile);
                        console.log("Document1",postResponse.data);
                      }
                      else if(i===1){
                        const postResponse = await axios.put('/loanDocuments/update-loan-documents/'+Document2, jfile);
                        console.log("Document2",postResponse.data);
                      }
                      else{
                        const postResponse = await axios.put('/loanDocuments/update-loan-documents/'+Document3, jfile);
                        console.log("Document3",postResponse.data);
                      }
                      console.log("update done");
                    }
                  });
                    })
              }
            }

    return (
<div>
    <div className="whole">
    {showAlert && (
        <Alert
          message="Warning"
          description="This is a warning notice about copywriting."
          type="warning"
          showIcon
          closable
          onClose={() => setShowAlert(false)} // Close the alert when the user clicks the close button
        />
      )}
    <Form onFinish={handleSubmit}>
      <p className="col1">Upload Documents</p>
      <p className="col2">Upload the documents listed below for verification purposes</p>
      <div className="file-input-wrapper">
      <Form.Item>
        <Card className="file-input-container">
          <label htmlFor={`fileInput-${0}`}>
            <Button
              icon={<UploadOutlined />}
              onClick={() => handleButtonClick(0)}
              style={{ backgroundColor: "#2C76C9", color: "white" }}
            >
              Select File
            </Button>
          </label>
          <input
            type="file"
            id={`fileInput-${0}`}
            style={{ display: "none" }}
            ref={fileInputRefs[0]}
            onChange={(e) => handleFileChange(e, 0)}
            accept=".jpg,.jpeg,.png"
          />
          <span className="filename">
            {selectedFiles[0] ? (
              <Text>
                <b>{selectedFiles[0].name}</b>
              </Text>
            ) : (
              <Text>
                <b>No File Selected</b>
              </Text>
            )}
          </span>
        </Card>
        </Form.Item>
      </div>
      <br />
      <Typography className="below_text">*Upload passport size photo (jpg/png)</Typography>
      <div className="file-input-wrapper">
      <Form.Item>
        <Card className="file-input-container">
          <label htmlFor={`fileInput-${1}`}>
            <Button
              icon={<UploadOutlined />}
              onClick={() => handleButtonClick(1)}
              style={{ backgroundColor: "#2C76C9", color: "white" }}
            >
              Select File
            </Button>
          </label>
          <input
            type="file"
            id={`fileInput-${1}`}
            style={{ display: "none" }}
            ref={fileInputRefs[1]}
            onChange={(e) => handleFileChange(e, 1)}
            accept=".jpg,.jpeg,.png"
          />
          <span className="filename">
            {selectedFiles[1] ? (
              <Text>
                <b>{selectedFiles[1].name}</b>
              </Text>
            ) : (
              <Text>
                <b>No File Selected</b>
              </Text>
            )}
          </span>
        </Card>
        </Form.Item>
      </div>
      <br />
      <Typography className="below_text">*Upload Sign(jpg/png)</Typography>
      <div className="file-input-wrapper">
      <Form.Item>
        <Card className="file-input-container">
          <label htmlFor={`fileInput-${2}`}>
            <Button
              icon={<UploadOutlined />}
              onClick={() => handleButtonClick(2)}
              style={{ backgroundColor: "#2C76C9", color: "white" }}
            >
              Select File
            </Button>
          </label>
          <input
            type="file"
            id={`fileInput-${2}`}
            style={{ display: "none" }}
            ref={fileInputRefs[2]}
            onChange={(e) => handleFileChange(e, 2)}
            accept=".jpg,.jpeg,.png"
          />
          <span className="filename">
            {selectedFiles[2] ? (
              <Text>
                <b>{selectedFiles[2].name}</b>
              </Text>
            ) : (
              <><Text>
                          <b>No File Selected</b>
                        </Text></>

            )}
          </span>
        </Card>
        </Form.Item>
      </div>
      <br />
      <Typography className="below_text">*ID proof(jpg/png)</Typography>
      
      <div className='buttons'>
          <Space>
          <Button onClick={handleBack} style={{marginRight:'30px',border:'none',fontSize:'18px',color: '#928C8C',fontWeight: '400',lineHeight: 'normal',letterSpacing: '0.36px'}} >BACK</Button>
             <Button
              className="nextbutton"
              type="primary"
              htmlType="submit"
              style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center',justifyContent:'center'
            }}
            >
              <img src={arrow} style={{ marginLeft: '18px', marginTop: '2px' }} alt="Next arrow" />

              NEXT

            </Button>
          </Space>
        </div>
      </Form>
    </div>
    </div>
               
  );
};
         
export default Documents;