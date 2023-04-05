import React, { useEffect, useState } from 'react';
import Feedback from '../../components/Feedback';
import { useNavigate } from 'react-router-dom';
import loadPhotos from '../../utils/camera/loadPhoto';
import uploadImageToCloudinary from '../../utils/uploadToCloudinary';
import uploadToMathpix from '../../utils/uploadToMathpix';
import Latex from 'react-latex';
import { Link } from 'react-router-dom';

function Photo() {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    const [operation, setOperation] = useState(null);
    const [validatedPhoto, setValidatedPhoto] = useState(false);
    const [mathpixError, setMathpixError] = useState(false);

    const processPhoto = async () => {
        try {
            const photosInStorage = await loadPhotos();
            if (photosInStorage.length === 0) {
                navigate('/camera');
            } else {
                const imageURL = await uploadImageToCloudinary(photosInStorage[0].webviewPath);
                // const imageURL = 'www.something...';
                setImageUrl(imageURL);
                const mathpixResult = await uploadToMathpix(imageURL);
                // const mathpixResult = [
                //     {
                //     "type": "latex",
                //     "value": "\\begin{array}{l}\\frac{4 x}{5}+\\frac{2}{3}=x+2 \\\\ \\frac{4 x+2}{15}=\\frac{x+2}{15} \\\\ 4 x+2=x+2 \\\\ 3 x=0 \\\\ x=0\\end{array}"
                //     },
                // ];
                if (mathpixResult.error) {
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
        navigate('/camera');
    }
    useEffect(() => {
        processPhoto();
        // eslint-disable-next-line
    }, []);

    return ( 
        <div className="photo-view">
            {!operation && <div className='loading-mathpix'>
                <h2>Reading operation</h2>
            </div>}
            {mathpixError && <div className='mathpix-error'>
                <p>There was a problem reading this photo.</p>
                <button><Link to={'/camera'}>Try again</Link></button>
            </div>}
            {operation && !validatedPhoto && <div className="mathpix-result">
                <h2>Have I properly read the exercise?</h2>
                {operation.map((elem, idx) => {
                    return (
                        <div className='equation' key={idx}>
                            <Latex>{`$$${elem}$$`}</Latex>
                        </div>
                    );
                })}
                <button onClick={handleValid}>All OK</button>
                <button onClick={handleInvalid}>Retake photo</button>
            </div>}
            {validatedPhoto && <Feedback operation={operation} imageUrl={imageUrl}/>}
        </div>
     );
}

export default Photo;