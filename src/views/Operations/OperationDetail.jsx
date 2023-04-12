import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import operationsService from '../../services/operationsService';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Footer';
import OperationCard from '../../components/Cards/OperationCard';


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
        <OperationCard operation={operation} handleDelete={handleDelete} />
      </div>
      <Footer color="blue" size="70px" />
    </div>
  );
}
export default OperationDetail;