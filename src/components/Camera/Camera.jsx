import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadPhotos from '../../utils/camera/loadPhoto';
import deletePhoto from '../../utils/camera/deletePhoto';
import takePhoto from '../../utils/camera/takePhoto';

function Camera(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const cleanStorage = async () => {
        try {
            const photosInStorage = await loadPhotos();
            Promise.all(photosInStorage.map(async (elem) => await deletePhoto(elem)));
        } catch (error) {
            console.error(error);
        }
    }

    const handleTakePhoto = async () => {
        try {
            await takePhoto();
            const photosInStorage = await loadPhotos();
            if (photosInStorage.length !== 0) {
                navigate(props.forwardUrl);
            } else {
                if (props.atCloseAction) {
                    props.atCloseAction();
                }
                navigate(props.backwardUrl);
                // handleTakePhoto();
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        cleanStorage();
        setLoading(false);
        handleTakePhoto();
        // eslint-disable-next-line
    }, []);

    return ( 
        <div className="camera-view">
            {loading ? <h1>Loading</h1> : <div className='upload-camera-file'>
                <p>Looks like I have no access to the camera. Click here to upload a picture.</p>
                <button onClick={handleTakePhoto}>Upload</button>
            </div>}
        </div>
     );
}

export default Camera;