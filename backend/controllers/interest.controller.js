///////////////////////////// Import dependencies ///////////////////////////////
const Interest = require('../models/interest.model');
const User = require('../models/user.model');
const Post = require('../models/post.model');
const Moment = require('../models/moment.model');
const getMonthDifference = require('../services/getMonthDifference.service');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.get = (req, res) => {
    const category = req.body.category;
    Interest.find({ category: category }).then(
        (interests) => {
            return res.status(200).json({ success: true, interests: interests, message: `Successfully retrieved all interests for category ${category} from database.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to retrieve interests for category ${category} from database. ${err}.` });
        }
    );
};

exports.addKeywords = async (req, res) => {
    const name = req.body.name;
    const keywords = req.body.keywords;
    const keywordTypes = req.body.keywordTypes;
    try {
        const interest = await Interest.findOne({ name: name });
        for (let i = 0; i < keywords.length; i++) {
            interest.keywords.push(keywords[i]);
            interest.keywordTypes.push(keywordTypes[i]);
            await interest.save();
        }
        return res.status(200).json({ success: true, message: `Successfully added keywords to the interest with the name ${name} in database.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to add keywords to the interest with the name ${name} in database. ${err}.` });
    }
};

exports.removeKeywords = async (req, res) => {
    const name = req.body.name;
    const keywords = req.body.keywords;
    try {
        const interest = await Interest.findOne({ name: name });
        for (let i = 0; i < keywords.length; i++) {
            interest.keywords = interest.keywords.filter((e) => { return e !== keywords[i] });
            interest.keywordTypes.splice(i, 1);
            await interest.save();
        }
        return res.status(200).json({ success: true, message: `Successfully removed keywords from the interest with the name ${name} in database.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to remove keywords from the interest with the name ${name} in database. ${err}.` });
    }
};

exports.create = (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const newInterest = new Interest({
        name: name,
        category: category
    });
    newInterest.save().then(
        (interest) => {
            return res.status(200).json({ success: true, interest: interest, message: `New interest with name ${name} was successfully created.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save new interest with name ${name}. ${err}.` });
        }
    );
};

exports.delete = async (req, res) => {
    const name = req.body.name;
    const interest = await Interest.findOne({ name: name });
    const usernames = interest.usernames;
    Interest.deleteOne({ name: name }).then(
        async () => {
            for (const username of usernames) {
                const user = await User.findOne({ username: username });
                user.interests = user.interests.filter((interestName) => { interestName !== name });
                await user.save();
            }
            return res.status(200).json({ success: true, name: name, message: `Interest with name ${name} was successfully deleted.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to delete interest with name ${name}. ${err}.` });
        }
    );
};

exports.updateUsername = async (currentUsername, newUsername) => {
    const allInterests = await Interest.find({});
    for (const interest of allInterests) {
        interest.usernames.replace(currentUsername, newUsername);
        await interest.save();
    }
};

exports.removeOldPosts = async (req, res) => {
    try {
        const allInterests = await Interest.find({});
        const currentDate = new Date();
        for (const interest of allInterests) {
            const relatedPosts = interest.relatedPosts.reverse();
            let i = 0;
            while (i < relatedPosts.length && i < 100) {
                const post = await Post.findOne({ id: relatedPosts[i] });
                const createdDate = new Date(post.year, post.month, post.day);
                if (getMonthDifference(currentDate, createdDate) >= 6) {
                    interest.relatedPosts = interest.relatedPosts.filter((id) => { return id !== post.id });
                    await interest.save();
                }
                i += 1;
            }
        }
        return res.status(200).json({ success: true, message: "Successfully removed old posts from related posts in interests." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to remove old posts from related posts in interests. ${err}.` });
    }
};

exports.removeOldMoments = async (req, res) => {
    try {
        const allInterests = await Interest.find({});
        const currentDate = new Date();
        for (const interest of allInterests) {
            const relatedMoments = interest.relatedMoments.reverse();
            let i = 0;
            while (i < relatedMoments.length && i < 100) {
                const moment = await Moment.findOne({ id: relatedMoments[i] });
                const createdDate = new Date(moment.year, moment.month, moment.day);
                if (getMonthDifference(currentDate, createdDate) >= 6) {
                    interest.relatedMoments = interest.relatedMoments.filter((id) => { return id !== moment.id });
                    await interest.save();
                }
                i += 1;
            }
        }
        return res.status(200).json({ success: true, message: "Successfully removed old moments from related moments in interests." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to remove old moments from related moments in interests. ${err}.` });
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////