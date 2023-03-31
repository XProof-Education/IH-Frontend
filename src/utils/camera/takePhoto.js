import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import savePhoto from './savePhoto';

// Takes photo and saves it to local storage
export default async function takePhoto() {
    const PHOTO_STORAGE = 'photos';
    try {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            allowEditing: true,
            webUseInput: false,
            width: 420,
            height: 1080,
            quality: 100,
        });

        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePhoto(photo, fileName);
        // const newPhoto = [savedFileImage, ...photos];
        Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify([savedFileImage]) });
        // setPhotos(newPhotos);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Camera closed by aborting');
        } else {
            console.log('Camera closed empty');
        }
    }  
};