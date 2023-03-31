import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadPhotos from '../../utils/camera/loadPhoto';
import uploadImageToCloudinary from '../../utils/uploadToCloudinary';
import uploadToMathpix from '../../utils/uploadToMathpix';
import Latex from 'react-latex';

function Photo() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [latex, setLatex] = useState(null);
    console.log('Rendering photo')

    const processPhoto = async () => {
        try {
            const photosInStorage = await loadPhotos();
            if (photosInStorage.length === 0) {
                navigate('/camera');
            } else {
                // const imageURL = await uploadImageToCloudinary(photosInStorage[0].webviewPath);
                // const mathpixResult = await uploadToMathpix(imageURL);
                const mathpixResult = [
                    {
                        type: "latex",
                        value: "\\begin{aligned} 3 x+2 & =5 x \\\\ 5 x & =5 \\\\ x & =-1\\end{aligned}",
                    },
                ];
                setLatex(mathpixResult);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        processPhoto();
        
    }, []);

    useEffect(() => {
        setLoading(false);
    },[latex])

    return ( 
        <div className="photo-view">
            <h1>Is this your text?</h1>
            <Latex>{`$$\\begin{aligned} 3 x+2 & =5 x \\\\ 5 x & =5 \\\\ x & =-1\\end{aligned}$$`}</Latex>
            {/* {loading && <h3>Hang tight while I scan the exercise</h3>}
            {!loading && latex && <div>
                <Latex> {`$$${latex[0].value}$$`} </Latex>
            </div>} */}
        </div>
     );
}

export default Photo;