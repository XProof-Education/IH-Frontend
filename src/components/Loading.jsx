import yellow from '../assets/images/loading-transparent.gif';
import './components.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <img className="loading" src={yellow} alt="loading" />
    </div>
  )
}

export default Loading;