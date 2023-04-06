import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import operationsService from '../../services/operationsService';
import Navbar from '../../components/Header/Navbar';
import Latex from 'react-latex';
import Button from '../../components/Button';


const OperationDetail = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  let operationId;
  if (props.operationId) {
    operationId = props.operationId;
  } else {
    operationId = params.operationId
  }
  const [operation, setOperation] = useState(null);

  const getOneOperation = async () => {
    try {
      const response = await operationsService.getOneOperation(operationId);
      setOperation(response.mathOperation);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getOneOperation();
    //eslint-disable-next-line
  }, []);

  const handleDelete = async () => {
    try {
      await operationsService.deleteOperation(operationId);
    } catch (error) {
      console.error(error);
    } finally {
      navigate('/operations-history');
    }
  }

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true"/>
      <h1>Operation detail</h1>
      {operation && 
       <div className='equation'> 
          <Latex>{`$$${operation.mathLatexSimplified}$$`}</Latex>
          {operation.isCorrect ? <p>This operation is correct. Good job!</p> : <p>{operation.feedBacks[0].text}</p>}
        </div>
      }
      <Button color="red" action={handleDelete}>Delete</Button>
    </div>
  )
  
}
export default OperationDetail;