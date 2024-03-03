const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadMedium = async (medium) => {
    const result = await cloudinary.uploader.upload(
        medium,
        { folder: "noise" }
    );
    return result;
};

const deleteMedium = async (mediumSecuredUrl, mediumType) => {
    let publicId;
    if (mediumType === "image") {
        publicId = 'noise/' + mediumSecuredUrl.match(/v\d+\/noise\/(.+)\.jpg$/)[1];
    } else {
        publicId = 'noise/' + mediumSecuredUrl.match(/v\d+\/noise\/(.+)\.mp4$/)[1];
    }
    await cloudinary.uploader.destroy(publicId);
};

module.exports = { cloudinary, uploadMedium, deleteMedium };