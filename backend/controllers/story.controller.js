///////////////////////////// Import dependencies ///////////////////////////////
const Story = require('../models/story.model');
const User = require('../models/user.model');
const Activity = require('../models/activity.model');
const Post = require('../models/post.model');
const Trophy = require('../models/trophy.model');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.get = (req, res) => {
    const username = req.body.username;
    Story.find({ username: username }).sort({ _id: -1 }).exec().then(
        (stories) => {
            return res.status(200).json({ success: true, stories: stories, message: "Successfully retrieved all stories from database." });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to retrieve stories from database. ${err}.` });
        }
    );
};

exports.search = async (req, res) => {
    const keyword = req.body.keyword;
    try {
        const stories = await Story.find({
            name: { $regex: keyword, $options: 'i' }
        }).sort({ _id: -1 }).limit(12).exec();
        return res.status(200).json({ success: true, stories: stories, message: "Successfully fetched stories relevant to searched word." });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Failed to fetch stories relevant to searched word." });
    } 
};

exports.searchMore = async (req, res) => {
    const keyword = req.body.keyword;
    const prevStoryIds = req.body.prevStoryIds;
    try {
        const stories = await Story.find({
            $and: [
                { name: { $regex: keyword, $options: 'i' } },
                { id: { $nin: prevStoryIds } }
            ]
        }).sort({ _id: -1 }).limit(12).exec();
        return res.status(200).json({ success: true, stories: stories, message: "Successfully fetched more stories relevant to searched word." });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Failed to fetch more stories relevant to searched word." });
    } 
};

exports.update = (req, res) => {
    const storyId = req.body.storyId;
    const type = req.body.type;
    const name = req.body.name;
    const usernames = req.body.usernames;
    Story.updateOne({ id: storyId }, {
        type: type,
        name: name,
        usernames: usernames
    }).then(
        async () => {
            const story = await Story.findOne({ id: storyId });
            return res.status(200).json({ success: true, story: story, message: `Story with id ${storyId} was successfully updated.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to update story ${storyId} in database. ${err}.` });
        }
    );
};

exports.create = (req, res) => {
    const storyId = req.body.storyId;
    const type = req.body.type;
    const month = req.body.month;
    const year = req.body.year;
    const name = req.body.name;
    const usernames = req.body.usernames;
    const newStory = new Story({
        id: storyId,
        type: type,
        month: month,
        year: year,
        name: name,
        usernames: usernames
    });
    newStory.save().then(
        async (story) => {
            for (const username of usernames) {
                const user = await User.findOne({ username: username });
                user.stories.unshift(storyId);
                const otherUsernames = usernames.filter((e) => { return e !== username });
                for (const otherUsername of otherUsernames) {
                    if (!user.companions.includes(otherUsername)) {
                        const sharedStories = await Story.find({
                             usernames: { $all: [username, otherUsername] } 
                        });
                        if (sharedStories.length >= 5) {
                            user.companions.unshift(otherUsername);
                        }
                    }
                }
                await user.save();
            }
            return res.status(200).json({ success: true, story: story, message: `Story with id ${storyId} and name ${name} was created successfully.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save new story. ${err}.` });
        }
    );
};

exports.delete = (req, res) => {
    const storyId = req.body.storyId;
    Story.deleteOne({ id: storyId }).then(
        async () => {
            const story = await Story.findOne({ id: storyId });
            for (const username of story.usernames) {
                const user = await User.findOne({ username: username });
                user.stories = user.stories.filter((id) => { return id !== storyId });
                await user.save();
            }
            await Activity.deleteMany({ itemId: storyId });
            await Post.deleteMany({ storyId: storyId });
            await Trophy.deleteMany({ storyId: storyId });
            return res.status(200).json({ success: true, message: `Story with id ${storyId} was successfully deleted.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to delete story. ${err}.` });
        }
    );
};

exports.updateUsername = async (currentUsername, newUsername) => {
    const allStories = await Story.find({});
    for (const story of allStories) {
        const updatedUsernames = story.usernames.map((item) => {
            item.replace(currentUsername, newUsername);
        });
        const updatedWatchedBy = story.watchedBy.map((item) => {
            item.replace(currentUsername, newUsername);
        });
        story.usernames = updatedUsernames;
        story.watchedBy = updatedWatchedBy;
        await story.save();
    }
};

exports.watch = async (req, res) => {
    const storyId = req.body.storyId;
    const username = req.body.username;
    try {
        const story = await Story.findOne({ id: storyId });
        const user = await User.findOne({ username: username });
        story.watchedBy.unshift(username);
        story.numOfWatchers = story.numOfWatchers + 1;
        user.watchings.unshift(storyId);
        await story.save();
        await user.save();
        return res.status(200).json({ success: true, message: `${username} successfully watched story with id ${storyId}.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `${username} failed to watch story with id ${storyId}. ${err}.` });
    }
};

exports.unwatch = async (req, res) => {
    const storyId = req.body.storyId;
    const username = req.body.username;
    try {
        const story = await Story.findOne({ id: storyId });
        const user = await User.findOne({ username: username });
        story.watchedBy = story.watchedBy.filter((e) => { return e !== username });
        story.numOfWatchers = story.numOfWatchers - 1;
        user.watchings = user.watchings.filter((e) => { return e !== storyId });
        await story.save();
        await user.save();
        return res.status(200).json({ success: true, message: `${username} successfully unwatched story with id ${storyId}.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `${username} failed to unwatch story with id ${storyId}. ${err}.` });
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////