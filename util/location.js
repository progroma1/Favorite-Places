const GOOGLE_API_KEY =''; // import from .env

const getMapPreview = () => {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=` + `${lat}, ${lng}` + `&key=${GOOGLE_API_KEY}`; // set from google cloud account api
    return imagePreviewUrl;
};