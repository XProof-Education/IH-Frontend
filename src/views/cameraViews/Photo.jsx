import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadPhotos from '../../utils/camera/loadPhoto';
import uploadImageToCloudinary from '../../utils/uploadToCloudinary';
import uploadToMathpix from '../../utils/uploadToMathpix';
import Latex from 'react-latex';

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

    // const handleValid = () => {

    // }
    useEffect(() => {
        processPhoto();
    }, []);

    return ( 
        <div className="photo-view">
            <h1>Is this your text?</h1>
            {mathpixError && <h3>There has been an error with your photo</h3>}
            {latex && latex.map((elem, idx) => {
                return (
                    <div key={idx}>
                        <Latex>{`$$${elem}$$`}</Latex>
                    </div>
                );
            })}
            {/* <button onClick={handleValid}>All OK</button>
            <button onClick={handleInvalid}>Retake photo</button> */}
        </div>
     );
}

export default Photo;