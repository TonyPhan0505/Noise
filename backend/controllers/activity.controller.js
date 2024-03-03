///////////////////////////// Import dependencies ///////////////////////////////
const Activity = require('../models/activity.model');
const Post = require('../models/post.model');
const Moment = require('../models/moment.model');
const getRelevantActivities = require('../services/getRelevantActivities.service');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.get = async (req, res) => {
    const username = req.body.username;
    try {
        const activities = await getRelevantActivities(username, []);
        return res.status(200).json({ success: true, activities: activities, message: "Successfully fetched relevant activities." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to fetch relevant activities. ${err}.` });
    }
};

exports.getMore = async (req, res) => {
    const username = req.body.username;
    const prevFetchedActivityItemIds = req.body.prevFetchedActivityItemIds;
    try {
        const activities = await getRelevantActivities(username, prevFetchedActivityItemIds);
        return res.status(200).json({ success: true, activities: activities, message: "Successfully fetched more relevant activities." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to fetch more relevant activities. ${err}.` });
    }
};

exports.update = (req, res) => {
    const activityId = req.body.activityId;
    const writing = req.body.writing;
    const tags = req.body.tags;
    Activity.updateOne({ id: activityId }, {
        writing: writing,
        tags: tags
    }).then(
        async () => {
            const activity = await Activity.findOne({ id: activityId });
            return res.status(200).json({ success: true, activity: activity, message: `Activity with id ${activityId} was successfully updated.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to update activity ${activityId} in database. ${err}.` });
        }
    );
};

exports.create = (req, res) => {
    const activityId = req.body.activityId;
    const activityType = req.body.activityType;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const hour = req.body.hour;
    const minute = req.body.minute;
    const itemId = req.body.itemId;
    const username = req.body.username;
    const tags = req.body.tags;
    const writing = req.body.writing;
    const newActivity = new Activity({
        id: activityId,
        activityType: activityType,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        itemId: itemId,
        username: username,
        tags: tags,
        writing: writing
    });
    newActivity.save().then(
        async (activity) => {
            const user = await User.findOne({ username: username });
            user.activities.unshift(activityId);
            await user.save();
            return res.status(200).json({ success: true, activity: activity, message: `New activity with id ${activityId} was successfully created.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save new activity. ${err}.` });
        }
    );
};

exports.delete = (req, res) => {
    const activityId = req.body.activityId;
    const username = req.body.username;
    Activity.deleteOne({ id: activityId }).then(
        async () => {
            const user = await User.findOne({ username: username });
            user.activities = user.activities.filter((id) => { return id !== activityId });
            await user.save();
            return res.status(200).json({ success: true, activityId: activityId, message: `Activity with id ${activityId} was successfully deleted.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to delete activity ${activityId}. ${err}.` });
        }
    );
};

exports.updateUsername = async (currentUsername, newUsername) => {
    const allActivities = await Activity.find({});
    for (const activity of allActivities) {
        if (activity.username === currentUsername) {
            activity.username = newUsername;
        }
        activity.tags = activity.tags.map((item) => {
            item.replace(currentUsername, newUsername);
        });
        activity.likedBy = activity.likedBy.map((item) => {
            item.replace(currentUsername, newUsername);
        });
        await activity.save();
    }
};

exports.like = async (req, res) => {
    const activityId = req.body.activityId;
    const username = req.body.username;
    try {
        const activity = await Activity.findOne({ id: activityId });
        activity.likedBy.unshift(username);
        activity.numOfLikes = activity.numOfLikes + 1;
        await activity.save();
        if (activity.activityType === "posted this post") {
            const post = await Post.findOne({ id: activity.itemId });
            post.likedBy.unshift(username);
            post.numOfLikes = post.numOfLikes + 1;
            await post.save();
        } else if (activity.activityType === "posted this moment") {
            const moment = await Moment.findOne({ id: activity.itemId });
            moment.likedBy.unshift(username);
            moment.numOfLikes = moment.numOfLikes + 1;
            await moment.save();
        }
        return res.status(200).json({ success: true, message: "Successfully liked activity." });
    } catch (err) {
        return res.status(500).json({ success: true, message: `Failed to like activity. ${err}.` });
    }
};

exports.unlike = async (req, res) => {
    const activityId = req.body.activityId;
    const username = req.body.username;
    try {
        const activity = await Activity.findOne({ id: activityId });
        activity.likedBy = activity.likedBy.filter((e) => { return e !== username });
        activity.numOfLikes = activity.numOfLikes - 1;
        await activity.save();
        if (activity.activityType === "posted this post") {
            const post = await Post.findOne({ id: activity.itemId });
            post.likedBy = post.likedBy.filter((e) => { return e !== username });
            post.numOfLikes = post.numOfLikes - 1;
            await post.save();
        } else if (activity.activityType === "posted this moment") {
            const moment = await Moment.findOne({ id: activity.itemId });
            moment.likedBy = moment.likedBy.filter((e) => { return e !== username });
            moment.numOfLikes = moment.numOfLikes - 1;
            await moment.save();
        }
        return res.status(200).json({ success: true, message: "Successfully unliked activity." });
    } catch (err) {
        return res.status(500).json({ success: true, message: `Failed to unlike activity. ${err}.` });
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////