const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadMedium = async (medium) => {
    const imageData = await fs.promises.readFile(medium.replace('file://', ''), { encoding: 'base64' });
    const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${imageData}`,
        { folder: "noise" }
    );
    return result.secure_url;
};

const deleteMedium = async (mediumSecuredUrl) => {
    const publicId = 'noise/' + mediumSecuredUrl.match(/v\d+\/noise\/(.+)\.jpg$/)[1];
    await cloudinary.uploader.destroy(publicId);
};

module.exports = { cloudinary, uploadMedium, deleteMedium };