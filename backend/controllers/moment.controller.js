///////////////////////////// Import dependencies ///////////////////////////////
const Moment = require('../models/moment.model');
const User = require('../models/user.model');
const Activity = require('../models/activity.model');
const categorizeMoment = require('../services/categorizeMoment.service');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.get = async (req, res) => {
    const username = req.body.username;
    try {
        const user = await User.findOne({ username: username });
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 7);
        const primaryMoments = await Moment.find({
            $and: [
                { username: username },
                { year: { $gte: yesterday.getFullYear() } },
                { month: { $gte: yesterday.getMonth() + 1 } },
                { day: { $gte: yesterday.getDate() } }
            ]
        }).sort({ _id: -1 }).exec();
        const secondaryMoments = await Moment.find({
            $and: [
                { username: { $in: user.followings } },
                { year: { $gte: yesterday.getFullYear() } },
                { month: { $gte: yesterday.getMonth() + 1 } },
                { day: { $gte: yesterday.getDate() } }
            ]
        }).sort({ _id: -1 }).exec();
        const moments = primaryMoments.concat(secondaryMoments);
        return res.status(200).json({ success: true, moments: moments, message: "Successfully retrieved moments from database." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to retrieve moments from database. ${err}.` });
    }
};

exports.update = (req, res) => {
    const momentId = req.body.momentId;
    const writing = req.body.writing;
    const media = req.body.media;
    const mediaTypes = req.body.mediaTypes;
    Moment.updateOne({ id: momentId }, {
        writing: writing,
        media: media,
        mediaTypes: mediaTypes
    }).then(
        async () => {
            const moment = await Moment.findOne({ id: momentId });
            return res.status(200).json({ success: true, moment: moment, message: `Moment with id ${momentId} was successfully updated.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to update moment ${momentId} in database. ${err}.` });
        }
    );
};

exports.create = (req, res) => {
    const momentId = req.body.momentId;
    const username = req.body.username;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const hour = req.body.hour;
    const minute = req.body.minute;
    const writing = req.body.writing;
    const media = req.body.media;
    const mediaTypes = req.body.mediaTypes;
    const newMoment = new Moment({
        id: momentId,
        username: username,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        writing: writing,
        media: media,
        mediaTypes: mediaTypes
    });
    newMoment.save().then(
        async (moment) => {
            const user = await User.findOne({ username: username });
            user.moments.unshift(momentId);
            await user.save();
            await categorizeMoment(moment);
            return res.status(200).json({ success: true, moment: moment, message: `New moment with id ${momentId} was successfully created.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save new moment. ${err}.` });
        }
    );
};

exports.delete = (req, res) => {
    const momentId = req.body.momentId;
    Moment.deleteOne({ id: momentId }).then(
        async () => {
            const moment = await Moment.findOne({ id: momentId });
            const user = await User.findOne({ username: moment.username });
            user.moments = user.moments.filter((id) => { return id !== momentId });
            await user.save();
            await Activity.deleteMany({ itemId: momentId });
            return res.status(200).json({ success: true, message: `Moment with id ${momentId} was successfully deleted.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to delete moment with id ${momentId}. ${err}.` });
        }
    );
};

exports.updateUsername = async (currentUsername, newUsername) => {
    const allMoments = await Moment.find({});
    for (const moment of allMoments) {
        if (moment.username === currentUsername) {
            moment.username = newUsername;
        }
        moment.tags = moment.tags.map((item) => {
            item.replace(currentUsername, newUsername);
        });
        moment.likedBy = moment.likedBy.map((item) => {
            item.replace(currentUsername, newUsername);
        });
        await moment.save();
    }
};

exports.like = async (req, res) => {
    const momentId = req.body.momentId;
    const username = req.body.username;
    try {
        const moment = await Moment.findOne({ id: momentId });
        moment.likedBy.unshift(username);
        moment.numOfLikes = moment.numOfLikes + 1;
        await moment.save();
        return res.status(200).json({ success: true, message: "Successfully liked moment." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to like moment. ${err}.` });
    }
};

exports.unlike = async (req, res) => {
    const momentId = req.body.momentId;
    const username = req.body.username;
    try {
        const moment = await Moment.findOne({ id: momentId });
        moment.likedBy = moment.likedBy.filter((e) => { return e !== username });
        moment.numOfLikes = moment.numOfLikes - 1;
        await moment.save();
        return res.status(200).json({ success: true, message: "Successfully unliked moment." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to unlike moment. ${err}.` });
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////