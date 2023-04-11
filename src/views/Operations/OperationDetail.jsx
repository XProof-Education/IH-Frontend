import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import operationsService from '../../services/operationsService';
import Navbar from '../../components/Header/Navbar';
import Latex from 'react-latex';
import Button from '../../components/Button';
import Footer from '../../components/Footer';


const OperationDetail = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let timeFilterQuery = '';
  try {
    timeFilterQuery = searchParams.get('timeFilter');
  } catch {
    timeFilterQuery = null;
  }
  let operationId;
  if (props.operationId) {
    operationId = props.operationId;
  } else {
    operationId = params.operationId
  }
  const [operation, setOperation] = useState(null);
  console.log(operation)

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
      if (timeFilterQuery) {
        navigate(`/profile/progress/?timeFilter=${timeFilterQuery}`)
      } else {
        navigate('/operations-history');
      }
    }
  }

  return (
    <div>
      <Navbar color="#FF6230" content="editProfile" backGround="true" />
      <div className="container-detail">
        <div className={operation && operation.isCorrect ? "operation-detail-container" : "operation-detail-container-red"}>
          <div className="title-div">
            <h1 className="title-style-yellow">Operation detail</h1>
          </div>
          {operation &&
            <div className='equation'>
              <Latex>{`$$${operation.mathLatexSimplified}$$`}</Latex>
              {operation.isCorrect
                ? <div className='operation-feedback'>
                  <p>This operation is correct. Good job!</p>
                </div>
                : <div className='operation-feedback'>
                  <p>{operation.feedBacks[0].text}</p>
                </div>}
            </div>
          }
          <div className="button-container">
            <Button color="pink" action={handleDelete}>Delete</Button>
          </div>
          <Footer color="blue" size="70px" />
        </div>
      </div>
    </div>
  );
}
export default OperationDetail;