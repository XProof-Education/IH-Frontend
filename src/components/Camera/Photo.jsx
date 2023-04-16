import React, { useEffect, useState } from 'react';
import Feedback from '../Feedback';
import Navbar from '../Header/Navbar';
import Footer from '../Footer';
import Button from '../Button';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import loadPhotos from '../../utils/camera/loadPhoto';
import uploadImageToCloudinary from '../../utils/uploadToCloudinary';
import uploadToMathpix from '../../utils/uploadToMathpix';
import Latex from 'react-latex';
import { Link } from 'react-router-dom';
import '../components.css'

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
        navigate(-1);
    }
    useEffect(() => {
        processPhoto();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="view">
            <Navbar backGround="true" color="pink" />
            <div >
            {!operation && !mathpixError && <div className='main-container loading-mathpix'>
                <h2>Reading operation</h2>
                <Loading />
            </div>}
            {mathpixError && <div className=' main-container mathpix-error'>
                <p>There was a problem reading this photo.</p>
                <Button color="pink"><Link to={'/camera'}>Try again</Link></Button>
            </div>}
            {operation && !validatedPhoto && <div className="infinite-container mathpix-result">
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
            {validatedPhoto && <Feedback operation={operation} imageUrl={imageUrl} />}
            </div>
            <Footer color="blue" size="70px" />
        </div>
    );
}

export default Photo;