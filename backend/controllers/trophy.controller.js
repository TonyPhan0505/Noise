///////////////////////////// Import dependencies ///////////////////////////////
const Trophy = require('../models/trophy.model');
const User = require('../models/user.model');
const Story = require('../models/story.model');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.get = (req, res) => {
    const username = req.body.username;
    Trophy.find({ usernames: { $in: [username] } }).sort({ _id: -1 }).exec().then(
        () => {
            return res.status(200).json({ success: true, trophies: trophies, message: "Successfully retrieved all trophies from database." });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to retrieve trophies from database. ${err}.` });
        }
    );
};

exports.search = async (req, res) => {
    const keyword = req.body.keyword;
    try {
        const trophies = await Trophy.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { writing: { $regex: keyword, $options: 'i' } }
            ]
        }).sort({ _id: -1 }).limit(12).exec();
        return res.status(200).json({ success: true, trophies: trophies, message: "Successfully searched for trophies." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to searched for trophies. ${err}.` });
    }
};

exports.searchMore = async (req, res) => {
    const keyword = req.body.keyword;
    const prevTrophyIds = req.body.prevTrophyIds;
    try {
        const trophies = await Trophy.find({
            $and: [
                {
                    id: { $nin: prevTrophyIds }
                },
                {
                    $or: [
                        { title: { $regex: keyword, $options: 'i' } },
                        { writing: { $regex: keyword, $options: 'i' } }
                    ]
                }
            ]
        }).sort({ _id: -1 }).limit(12).exec();
        return res.status(200).json({ success: true, trophies: trophies, message: "Successfully searched for more trophies." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to searched for more trophies. ${err}.` });
    }
};

exports.update = (req, res) => {
    const trophyId = req.body.trophyId;
    const title = req.body.title;
    const media = req.body.media;
    const writing = req.body.writing;
    Trophy.updateOne({ id: trophyId }, {
        title: title,
        media: media,
        writing: writing
    }).then(
        async () => {
            const trophy = await Trophy.findOne({ id: trophyId });
            return res.status(200).json({ success: true, trophy: trophy, message: `Trophy with id ${trophyId} was successfully updated.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to update trophy ${trophyId} in database. ${err}.` });
        }
    );
};

exports.create = (req, res) => {
    const trophyId = req.body.trophyId;
    const title = req.body.title;
    const month = req.body.month;
    const year = req.body.year;
    const storyId = req.body.storyId;
    const usernames = req.body.usernames;
    const media = req.body.media;
    const writing = req.body.writing;
    const newTrophy = new Trophy({
        id: trophyId,
        title: title,
        month: month,
        year: year,
        storyId: storyId,
        usernames: usernames,
        media: media,
        writing: writing
    });
    newTrophy.save().then(
        async (trophy) => {
            for (const username of usernames) {
                const user = await User.findOne({ username: username });
                user.trophies.unshift(trophyId);
                await user.save();
            }
            const story = await Story.findOne({ storyId: storyId });
            story.trophies.unshift(trophyId);
            await story.save();
            return res.status(200).json({ success: true, trophy: trophy, message: `New trophy with id ${trophyId} was successfully created.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save new trophy with id ${trophyId}. ${err}.` });
        }
    );
};

exports.delete = (req, res) => {
    const trophyId = req.body.trophyId;
    Trophy.deleteOne({ id: trophyId }).then(
        async () => {
            const trophy = await Trophy.findOne({ id: trophyId });
            const usernames = trophy.usernames;
            const storyId = trophy.storyId;
            for (const username of usernames) {
                const user = await User.findOne({ username: username });
                user.trophies = user.trophies.filter((id) => { return id !== trophyId });
                await user.save();
            } 
            const story = await Story.findOne({ storyId: storyId });
            story.trophies = story.trophies.filter((id) => { return id !== trophyId });
            await story.save();
            return res.status(200).json({ success: true, message: `Trophy with id ${trophyId} was successfully deleted.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to delete trophy with id ${trophyId}. ${err}.` });
        }
    );
};
////////////////////////////////////////////////////////////////////////////////////////////////////////