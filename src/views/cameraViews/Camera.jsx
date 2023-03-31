import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadPhotos from '../../utils/camera/loadPhoto';
import deletePhoto from '../../utils/camera/deletePhoto';
import takePhoto from '../../utils/camera/takePhoto';

function Camera() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    // const [photos, setPhotos] = useState([]);

    const cleanStorage = async () => {
        try {
            const photosInStorage = await loadPhotos();
            Promise.all(photosInStorage.map(async (elem) => await deletePhoto(elem)));
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleTakePhoto = async () => {
        try {
            await takePhoto();
            const photosInStorage = await loadPhotos();
            if (photosInStorage.length !== 0) {
                // Call to mathpix
                navigate('/camera/result');
            } else {
                handleTakePhoto();
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        cleanStorage();
        handleTakePhoto();
        // eslint-disable-next-line
    }, []);

    return ( 
        <div className="camera-view">
            {loading ? <h1>Loading</h1> : <div className='upload-camera-file'>
                <p>Looks like I have no access to the camera. CLick here to upload a picture.</p>
                <button onClick={handleTakePhoto}>Upload</button>
            </div>}
        </div>
     );
}

export default Camera;