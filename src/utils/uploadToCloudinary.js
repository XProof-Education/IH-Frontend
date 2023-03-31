import cloudinaryService from '../services/cloudinaryService';

const uploadImageToCloudinary = async (webviewPath) => {
    try {
        // Fetch the image blob from webviewPath
        const response = await fetch(webviewPath);
        const blob = await response.blob();

        // Create FormData to send the image file to your server-side endpoint
        const formData = new FormData();
        formData.append('image', blob);
        const config = {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        }
   
        // Send the POST request to your server-side endpoint
        const serverResponse = await cloudinaryService.uploadPhoto(formData, config)
        const imageURL = serverResponse.fileUrl;
        return imageURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};
export default uploadImageToCloudinary;