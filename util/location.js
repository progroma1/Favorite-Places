const GOOGLE_API_KEY =''; // import from .env

const getMapPreview = () => {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=` + `${lat}, ${lng}` + `&key=${GOOGLE_API_KEY}`; // set from google cloud account api
    return imagePreviewUrl;
};

const getAddress = async (lat, lng) => {
    const url = (`https://maps.googleapis.com/maps/api/geocode/json?lanlng=${lat},${lng}&key=${GOOGLE_API_KEY}`);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch address');
    }

    const data = await response.json();
    const address = data.results[0].formatted_address;
    return address;
};

export {
    getMapPreview,
    getAddress,
};