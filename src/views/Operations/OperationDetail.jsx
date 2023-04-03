import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import operationsService from '../../services/operationsService';
import Navbar from '../../components/Header/Navbar';
// import Button from '../../components/Button';
// import Feedback from '../../components/Feedback';
// import Latex from 'react-latex';
//import handleOperation from '../../utils/handleOperation';


const OperationDetail = () => {
  const { operationId } = useParams();
  const [operation, setOperation] = useState({});

  const getOneOperation = async () => {
    try {
      const response = await operationsService.getOneOperation(operationId);
      setOperation(response.mathOperation);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(operation)
  useEffect(() => {
    getOneOperation();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setOperation(operation);
  }, [operation]);

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true"/>
      <h1>Operation detail</h1>
      <p>{operation.mathLatexSimplified}</p>
      {/* {console.log(operation.feedBacks)} */}
       {/* {operation.feedBacks.map(fb => {
        return (
          <div>
          <p>{fb.text}</p>
            <p>{fb.confidence}</p>
            </div>
       )
     })}  */}
  
      
    
    </div>
  )
  
}
export default OperationDetail;