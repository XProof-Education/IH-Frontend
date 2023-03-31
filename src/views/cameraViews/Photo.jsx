import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadPhotos from '../../utils/camera/loadPhoto';
import uploadImageToCloudinary from '../../utils/uploadToCloudinary';
import uploadToMathpix from '../../utils/uploadToMathpix';

function Photo() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [latex, setLatex] = useState(null);

    const processPhoto = async () => {
        console.log('Processing photo')
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
            
            // Call to mathpix
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        processPhoto();
        setLoading(false);
    }, [])

    return ( 
        <h1>This is the Phot View</h1>
     );
}

export default Photo;