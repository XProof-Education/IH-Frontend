import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import loadPhotos from '../../utils/camera/loadPhoto';
import uploadImageToCloudinary from '../../utils/uploadToCloudinary';
import uploadToMathpix from '../../utils/uploadToMathpix';
import Latex from 'react-latex';
import '../components.css'

function SubmitPhoto(props) {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [operation, setOperation] = useState(null);
  const [validatedPhoto, setValidatedPhoto] = useState(false);
  const [mathpixError, setMathpixError] = useState(false);

  const processPhoto = async () => {
      try {
          const photosInStorage = await loadPhotos();
          if (photosInStorage.length === 0) {
              navigate(-1);
          } else {
              const imageURL = await uploadImageToCloudinary(photosInStorage[0].webviewPath);
              setImageUrl(imageURL);
              const mathpixResult = await uploadToMathpix(imageURL);
              if (mathpixResult.error) {
                  setOperation(null);
                  setMathpixError(true);
                  return;
              }
              if (mathpixResult.length === 1) {
                  const steps = mathpixResult[0].value
                      .replace('\\begin{aligned} ', '')
                      .replace('\\end{aligned}','')
                      .replace('\\begin{array}{l}', '')
                      .replace('\\begin{array}{c}', '')
                      .replace('\\begin{array}{r}', '')
                      .replace('\\end{array}', '')
                      .split('\\\\')
                      .map(step => step.replace('& ', '').trim());
                  setOperation(steps);
              } else {
                  const steps = mathpixResult.map(elem => elem.value);
                  setOperation(steps);
              }
          }
      } catch (error) {
          console.error(error);
      }
  }

  const handleValid = () => {
    setValidatedPhoto(true);
  }
  const handleInvalid = () => {
    props.handleInvalid();
  }
  useEffect(() => {
      processPhoto();
      // eslint-disable-next-line
  }, []);

  useEffect(() => {
      if (validatedPhoto) {
          props.handleSubmitExercise(operation, imageUrl);
      }
      // eslint-disable-next-line
  }, [validatedPhoto]);

  return ( 
    <div>
      {!operation && !mathpixError && <div className='loading-mathpix'>
          <h2>Reading operation</h2>
          <Loading />
      </div>}
      {mathpixError && <div className='mathpix-error'>
          <p>There was a problem reading this photo.</p>
          <Button color="pink" action={handleInvalid}>Try again</Button>
      </div>}
      {operation && !validatedPhoto && <div className={"mathpix-result height-auto no-margin"}>
          <h2>Have I properly read the exercise?</h2>
          {operation.map((elem, idx) => {
              return (
                  <div className='equation' key={idx}>
                      <Latex>{`$$${elem}$$`}</Latex>
                  </div>
              );
          })}
          <div className="buttons-container">
              <Button color="blue" action={handleValid}>All OK</Button>
              <Button color="pink" action={handleInvalid}>Retake photo</Button>
          </div>
      </div>}
    </div>
   );
}

export default SubmitPhoto;