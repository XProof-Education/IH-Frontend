import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadPhotos from '../../utils/camera/loadPhoto';
import deletePhoto from '../../utils/camera/deletePhoto';
import takePhoto from '../../utils/camera/takePhoto';
import Loading from '../Loading';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Button';

const Camera = (props) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
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
                if (props.forwardUrl) {
                    navigate(props.forwardUrl);
                }
                if (props.atTakePhoto) {
                    props.atTakePhoto();
                }
            } else {
                if (props.atCloseAction) {
                    props.atCloseAction();
                }
                navigate(props.backwardUrl);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        cleanStorage();
        setLoading(false);
        if (isLoggedIn) {
            handleTakePhoto();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    return ( 
        <div className="camera-view">
            {loading ? <Loading /> : <div className='upload-camera-file'>
                <p>Looks like I have no access to the camera. Click here to upload a picture.</p>
                <Button color='blue' action={handleTakePhoto}>Upload</Button>
            </div>}
        </div>
     );
}

export default Camera;