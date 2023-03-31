import axios from 'axios';

const uploadImageToCloudinary = async (file) => {
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/upload`;
    const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

    // Create form data to send to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    console.log(formData)
    try {
        // Send POST request to Cloudinary with the image file
        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Get the image URL from the response
        const imageURL = response.data.secure_url;
        return imageURL;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return null;
    }
};

export default uploadImageToCloudinary;