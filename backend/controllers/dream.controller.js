///////////////////////////// Import dependencies ///////////////////////////////
const Dream = require('../models/dream.model');
const User = require('../models/user.model');
const { uploadMedium, deleteMedium } = require('../services/cloudinary.service');
const areIdenticalArrays = require('../services/areIdenticalArrays.service');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.get = (req, res) => {
    const username = req.body.username;
    Dream.find({ username: username }).sort({ _id: -1 }).exec().then(
        (dreams) => {
            return res.status(200).json({ success: true, dreams: dreams, message: "Successfully retrieved all dreams from database." });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to retrieve dreams from database. ${err}.` });
        }
    );
};

exports.update = async (req, res) => {
    const dreamId = req.body.dreamId;
    const name = req.body.name;
    const media = req.body.media;
    const mediaTypes = req.body.mediaTypes;
    const details = req.body.details;
    const status = req.body.status;
    const dream = await Dream.findOne({ id: dreamId });
    if (!areIdenticalArrays(dream.media, media)) {
        const toBeUploadedMedia = media.filter((medium) => { return !dream.media.includes(medium) });
        if (toBeUploadedMedia.length > 0) {
            for (let i = 0; i < media.length; i++) {
                if (toBeUploadedMedia.includes(media[i])) {
                    media[i] = await uploadMedium(media[i]);
                }
            }
        }
        const toBeDeletedMedia = dream.media.filter((medium) => { return !media.includes(medium) });
        if (toBeDeletedMedia.length > 0) {
            for (let i = 0; i < dream.media.length; i++) {
                if (toBeDeletedMedia.includes(dream.media[i])) {
                    await deleteMedium(dream.media[i], dream.mediaTypes[i]);
                }
            }
        }
    }
    Dream.updateOne({ id: dreamId }, {
        name: name,
        media: media,
        mediaTypes: mediaTypes,
        details: details,
        status: status
    }).then(
        async () => {
            const dream = await Dream.findOne({ id: dreamId });
            return res.status(200).json({ success: true, dream: dream, message: `Dream with id ${dreamId} was successfully updated.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to update dream ${dreamId} in database. ${err}.` });
        }
    );
};

exports.create = async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    let media = req.body.media;
    const mediaTypes = req.body.mediaTypes;
    const details = req.body.details;
    const status = req.body.status;
    const username = req.body.username;
    for (let i = 0; i < media.length; i++) {
        const mediumUrl = await uploadMedium(media[i]);
        media[i] = mediumUrl;
    }
    const newDream = new Dream({
        id: id,
        name: name,
        media: media,
        mediaTypes: mediaTypes,
        details: details,
        status: status,
        username: username
    });
    newDream.save().then(
        async (dream) => {
            const user = await User.findOne({ username: username });
            user.dreams.unshift(id);
            await user.save();
            return res.status(200).json({ success: true, dream: dream, message: `New dream with id ${id} was successfully created.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save new dream with id ${id}. ${err}.` });
        }
    );
};

exports.delete = async (req, res) => {
    const dreamId = req.body.dreamId;
    const username = req.body.username;
    const dream = await Dream.findOne({ id: dreamId });
    for (let i = 0; i < dream.media.length; i++) {
        await deleteMedium(dream.media[i], dream.mediaTypes[i]);
    }
    Dream.deleteOne({ id: dreamId }).then(
        async () => {
            const user = await User.findOne({ username: username });
            user.dreams = user.dreams.filter((id) => { return id !== dreamId });
            await user.save();
            return res.status(200).json({ success: true, message: `Dream with id ${dreamId} was successfully deleted.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to delete dream with id ${dreamId}. ${err}.` });
        }
    );
};

exports.updateUsername = async (currentUsername, newUsername) => {
    const allDreams = await Dream.find({});
    for (const dream of allDreams) {
        if (dream.username === currentUsername) {
            dream.username = newUsername;
            await dream.save();
        }
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////