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
    const [latex, setLatex] = useState(null);
    const [validatedPhoto, setValidatedPhoto] = useState(false);
    const [mathpixError, setMathpixError] = useState(false);

    const processPhoto = async () => {
        try {
            const photosInStorage = await loadPhotos();
            if (photosInStorage.length === 0) {
                navigate('/camera');
            } else {
                // const imageURL = await uploadImageToCloudinary(photosInStorage[0].webviewPath);
                const imageURL = 'www.something...';
                setImageUrl(imageURL);
                // const mathpixResult = await uploadToMathpix(imageURL);
                const mathpixResult = [
                    {
                        type: "latex",
                        value: "\\begin{aligned} 3 x+2 & =5 x \\\\ 5 x & =5 \\\\ x & =-1\\end{aligned}",
                    },
                ];
                if (mathpixResult.error) {
                    setMathpixError(true);
                    return;
                }
                if (mathpixResult.length === 1) {
                    const steps = mathpixResult[0].value
                        .replace('\\begin{aligned} ', '')
                        .replace('\\end{aligned}','')
                        .replace('\\begin{array}{l}', '')
                        .replace('\\end{array}', '')
                        .split('\\\\')
                        .map(step => step.replace('& ', '').trim());
                    setLatex(steps);
                } else {
                    const steps = mathpixResult.map(elem => elem.value);
                    setLatex(steps);
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
    }, []);

    return ( 
        <div className="photo-view">
            {mathpixError && <div className='mathpix-error'>
                <p>There was a problem reading this photo.</p>
                <button><Link to={'/camera'}>Try again</Link></button>
            </div>}
            {latex && !validatedPhoto && <div className="mathpix-result">
                <h2>Have I properly read the exercise?</h2>
                {latex.map((elem, idx) => {
                    return (
                        <div className='equation' key={idx}>
                            <Latex>{`$$${elem}$$`}</Latex>
                        </div>
                    );
                })}
                <button onClick={handleValid}>All OK</button>
                <button onClick={handleInvalid}>Retake photo</button>
            </div>}
            {validatedPhoto && <Feedback steps={latex} imageUrl={imageUrl}/>}
        </div>
     );
}

export default Photo;