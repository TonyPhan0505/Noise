///////////////////////////// Import dependencies ///////////////////////////////
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const View = require('../models/view.model');
const Notification = require('../models/notification.model');
const Interest = require('../models/interest.model');
const Trophy = require('../models/trophy.model');
const Activity = require('../models/activity.model');
const Comment = require('../models/comment.model');
const Dream = require('../models/dream.model');
const Moment = require('../models/moment.model');
const Post = require('../models/post.model');
const Story = require('../models/story.model');

const interestController = require('./interest.controller');
const dreamController = require('./dream.controller');
const storyController = require('./story.controller');
const postController = require('./post.controller');
const momentController = require('./moment.controller');
const commentController = require('./comment.controller');
const activityController = require('./activity.controller');

const { uploadMedium, deleteMedium } = require('../services/cloudinary.service');
const categorizeUser = require('../services/categorizeUser.service');
const processMutualInterestsUsers = require('../services/processMutualInterestsUsers.service');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.searchUsers = (req, res) => {
    const searchedUsername = req.body.searchedUsername;
    User.find({ username: { $regex: searchedUsername, $options: 'i' } }).then(
        (users) => {
            return res.status(200).json({ success: true, users: users, message: "Successfully searched for users." });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to search for users. ${err}` });
        }
    );
};

exports.searchUsersWithInterestX = async (req, res) => {
    const interestName = req.body.interestName;
    try {
        const interest = await Interest.findOne({ name: interestName });
        const users = await User.find({ interests: { $in: [interest.id] } }).limit(12).exec();
        return res.status(200).json({ success: true, users: users, message: "Successfully searched for interest sharers." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to search for interest sharers. ${err}` });
    }
};

exports.searchMoreUsersWithInterestX = async (req, res) => {
    const interestName = req.body.interestName;
    const prevUsernames = req.body.prevUsernames;
    try {
        const interest = await Interest.findOne({ name: interestName });
        const users = await User.find({ 
            $and: [
                { username: { $nin: prevUsernames } },
                { interests: { $in: [interest.id] } }
            ] 
        }).limit(12).exec();
        return res.status(200).json({ success: true, users: users, message: "Successfully searched for more interest sharers." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to search for more interest sharers. ${err}` });
    }
};

exports.doesUserExist = async (req, res) => {
    const emailAddress = req.body.emailAddress;
    const username = req.body.username;
    try {
        const user = await User.findOne({ 
            $or: [
                { emailAddress: emailAddress },
                { username: username }
            ] 
        });
        if (user) {
            return res.status(200).json({ success: true, exists: true, message: "Successfully determine user's existence." });
        } else {
            return res.status(200).json({ success: true, exists: false, message: "Successfully determine user's existence." });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: "Failed to determine user's existence." });
    }
};

exports.getMutualInterestsUsers = async (req, res) => {
    const username = req.body.username;
    try {
        const user = await User.findOne({ username: username });
        const interestNames = user.interests;
        const interests = await Interest.find({ name: { $in: interestNames } });
        const mutualInterestsUsernames = interests.map((interest) => {
            return interest.relatedUsers;
        }).flat();
        const mutualInterestsUsers = await processMutualInterestsUsers(user, mutualInterestsUsernames);
        return res.status(200).json({ success: true, users: mutualInterestsUsers, message: "Successfully fetched users with mutual interests." });
    } catch (err) {
        return res.status(500).json({ success: true, message: `Failed to fetch users with mutual interests. ${err}.` });
    }
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username }).then(
        (user) => {
            if (!user || !user.comparePassword(password)) {
                res.status(401).json({ success: false, message: 'Invalid username or password.' });
            }
            try {
                const secretKey = process.env.LOGIN_SECRET_KEY;
                const accessToken = jwt.sign({ username: user.username }, secretKey, { expiresIn: '24h' });
                return res.status(200).json({ success: true, user: user, accessToken: accessToken });
            } catch (err) {
                return res.status(500).json({ success: false, message: `Server error when creating login token. ${err}.` });
            }
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Server error when logging in user. ${err}.` });
        }
    );
};

exports.signUp = async (req, res) => {
    const username = req.body.username;
    const emailAddress = req.body.emailAddress;
    const profileAvatar = req.body.profileAvatar;
    const profileAvatarUrl = await uploadMedium(profileAvatar);
    const identity = req.body.identity;
    const age = req.body.age;
    const about = req.body.about;
    const hashed_password = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({ 
        username: username,
        emailAddress: emailAddress,
        profileAvatar: profileAvatarUrl,
        identity: identity,
        age: age,
        about: about,
        hashed_password: hashed_password
    });
    newUser.save().then(
        async (user) => {
            await categorizeUser(user);
            return res.status(200).json({ success: true, message: `User ${user.username} was successfully saved.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save new user. ${err}.` });
        }
    );
};

exports.verifyAccount = async (req, res) => {
    const emailAddress = req.body.emailAddress;
    try {
        const user = await User.findOne({ emailAddress: emailAddress });
        user.verified = true;
        await user.save();
        return res.status(200).json({ success: true, message: `User ${user.username} was successfully verified.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to verify user. ${err}.` });
    }
};

exports.updateProfile = (req, res) => {
    const currentUsername = req.body.currentUsername;
    const username = req.body.username;
    const emailAddress = req.body.emailAddress;
    const profileAvatar = req.body.profileAvatar;
    const identity = req.body.identity;
    const age = req.body.age;
    const about = req.body.about;
    const newPassword = req.body.newPassword;
    const links = req.body.links;
    User.updateOne({ username: currentUsername }, {
        emailAddress: emailAddress,
        profileAvatar: profileAvatar,
        identity: identity,
        age: age,
        about: about,
        links: links
    }).then(
        async () => {
            if (currentUsername !== username) { await changeUsername(currentUsername, username); }
            if (newPassword) { await changePassword(username, newPassword); }
            const user = await User.findOne({ username: username });
            return res.status(200).json({ success: true, user: user, message: `Successfully updated profile for user ${username}.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to update profile. ${err}.` });
        }
    );
};

const changeUsername = async (currentUsername, newUsername) => {
    await User.updateOne({ username: currentUsername }, { username: newUsername });
    const allUsers = await User.find({});
    for (const user of allUsers) {
        const updatedFollowers = user.followers.map((item) => {
            item.replace(currentUsername, newUsername);
        });
        const updatedFollowings = user.followings.map((item) => {
            item.replace(currentUsername, newUsername);
        });
        const updatedCompanions = user.companions.map((item) => {
            item.replace(currentUsername, newUsername);
        });
        user.followers = updatedFollowers;
        user.followings = updatedFollowings;
        user.companions = updatedCompanions;
        await user.save();
    }
    interestController.updateUsername(currentUsername, newUsername);
    dreamController.updateUsername(currentUsername, newUsername);
    storyController.updateUsername(currentUsername, newUsername);
    postController.updateUsername(currentUsername, newUsername);
    momentController.updateUsername(currentUsername, newUsername);
    commentController.updateUsername(currentUsername, newUsername);
    activityController.updateUsername(currentUsername, newUsername);
    await View.updateMany({ username: currentUsername }, { username: newUsername });
    await Notification.updateMany({ username: currentUsername }, { username: newUsername });
    await Trophy.updateMany({ username: currentUsername }, { username: newUsername });
};

const changePassword = async (username, newPassword) => {
    await User.updateOne({ username: username }, {
        hashed_password: bcrypt.hashSync(newPassword, 10)
    });
};

exports.follow = async (req, res) => {
    const followerUsername = req.body.followerUsername;
    const followedUsername = req.body.followedUsername;
    try {
        const followerUser = await User.findOne({ username: followerUsername });
        const followedUser = await User.findOne({ username: followedUsername });
        followerUser.followings.unshift(followedUsername);
        followerUser.numOfFollowings = followerUser.numOfFollowings + 1;
        followedUser.followers.unshift(followerUsername);
        followedUser.numOfFollowers = followedUser.numOfFollowers + 1;
        await followerUser.save();
        await followedUser.save();
        return res.status(200).json({ success: true, message: `${followerUsername} successfully followed ${followedUsername}.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `${followerUsername} failed to follow ${followedUsername}. ${err}.` });
    }
};

exports.unfollow = async (req, res) => {
    const followerUsername = req.body.followerUsername;
    const followedUsername = req.body.followedUsername;
    try {
        const followerUser = await User.findOne({ username: followerUsername });
        const followedUser = await User.findOne({ username: followedUsername });
        followerUser.followings = followerUser.followings.filter((username) => { return username !== followedUsername });
        followerUser.numOfFollowings = followerUser.numOfFollowings - 1;
        followedUser.followers = followedUser.followers.filter((username) => { return username !== followerUsername });
        followedUser.numOfFollowers = followedUser.numOfFollowers - 1;
        await followerUser.save();
        await followedUser.save();
        return res.status(200).json({ success: true, message: `${followerUsername} successfully unfollowed ${followedUsername}.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `${followerUsername} failed to unfollow ${followedUsername}. ${err}.` });
    }
};

exports.getFollowers = async (req, res) => {
    const username = req.body.username;
    try {
        const user = await User.findOne({ username: username });
        const followers = await User.find({ username: { $in: user.followers } }).limit(30).exec();
        return res.status(200).json({ success: true, followers: followers, message: "Successfully retrieved followers for user." });
    } catch (err) {
        return res.status(500).json({ success: true, message: "Failed to retrieve followers for user." });
    }
};

exports.getMoreFollowers = async (req, res) => {
    const username = req.body.username;
    const prevFetchedFollowerUsernames = req.body.prevFetchedFollowerUsernames;
    try {
        const user = await User.findOne({ username: username });
        const followers = await User.find({ 
            $and: [
                { username: { $nin: prevFetchedFollowerUsernames } },
                { username: { $in: user.followers } }
            ] 
        }).limit(30).exec();
        return res.status(200).json({ success: true, followers: followers, message: "Successfully retrieved more followers for user." });
    } catch (err) {
        return res.status(500).json({ success: true, message: "Failed to retrieve more followers for user." });
    }
};

exports.getFollowings = async (req, res) => {
    const username = req.body.username;
    try {
        const user = await User.findOne({ username: username });
        const followings = await User.find({ username: { $in: user.followings } }).limit(30).exec();
        return res.status(200).json({ success: true, followings: followings, message: "Successfully retrieved the followings for user." });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Failed to retrieve the followings for user." });
    }
};

exports.getMoreFollowings = async (req, res) => {
    const username = req.body.username;
    const prevFetchedFollowingUsernames = req.body.prevFetchedFollowingUsernames;
    try {
        const user = await User.findOne({ username: username });
        const followings = await User.find({
            $and: [
                { username: { $nin: prevFetchedFollowingUsernames } },
                { username: { $in: user.followings } }
            ] 
        }).limit(30).exec();
        return res.status(200).json({ success: true, followings: followings, message: "Successfully retrieved more of the followings for user." });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Failed to retrieve more of the followings for user." });
    }
};

exports.deleteAccount = async (req, res) => {
    const username = req.body.username;
    try {
        await deleteActivityRecords(username);
        await deleteCommentRecords(username);
        await deleteDreamRecords(username);
        await deleteMomentRecords(username);
        await deleteNotificationRecords(username);
        await deletePostRecords(username);
        await deleteStoryRecords(username);
        await deleteTrophyRecords(username);
        await deleteViewRecords(username);
        const user = await User.findOne({ username: username });
        await deleteMedium(user.profileAvatar);
        return res.status(200).json({ success: true, message: `Successfully deleted ${username}'s account from the database.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to delete ${username}'s account from the database.` });
    }
};

const deleteActivityRecords = async (username) => {
    const activities = await Activity.find({ username: username });
    const commentIdsRelatedToActivities = activities.map((activity) => {
        return activity.comments;
    }).flat();
    await Comment.deleteMany({ id: { $in: commentIdsRelatedToActivities } });
    Activity.deleteMany({ username: username });
};

const deleteCommentRecords = async (username) => {
    await Comment.deleteMany({ username: username });
};

const deleteDreamRecords = async (username) => {
    const dreams = await Dream.find({ username: username });
    const mediaRelatedToDreams = dreams.map((dream) => {
        return dream.media;
    }).flat();
    for (let i = 0; i < mediaRelatedToDreams.length; i++) {
        await deleteMedium(mediaRelatedToDreams[i]);
    }
    await Dream.deleteMany({ username: username });
};

const deleteMomentRecords = async (username) => {
    const moments = await Moment.find({ username: username });
    const mediaRelatedToMoments = moments.map((moment) => {
        return moment.media;
    }).flat();
    for (let i = 0; i < mediaRelatedToMoments.length; i++) {
        await deleteMedium(mediaRelatedToMoments[i]);
    }
    const commentIdsRelatedToMoments = moments.map((moment) => {
        return moment.comments;
    }).flat();
    await Comment.deleteMany({ id: { $in: commentIdsRelatedToMoments } });
    await Moment.deleteMany({ username: username });
};

const deleteNotificationRecords = async (username) => {
    await Notification.deleteMany({ username: username });
};

const deletePostRecords = async (username) => {
    const posts = await Post.find({ username: username });
    const mediaRelatedToPosts = posts.map((post) => {
        return post.media;
    }).flat();
    for (let i = 0; i < mediaRelatedToPosts.length; i++) {
        await deleteMedium(mediaRelatedToPosts[i]);
    }
    const commentIdsRelatedToPosts = posts.map((post) => {
        return post.comments;
    }).flat();
    await Comment.deleteMany({ id: { $in: commentIdsRelatedToPosts } });
    const postIds = posts.map((post) => {
        return post.id;
    });
    const relatedStories = await Story.find({ posts: { $in: postIds } });
    for (const story of relatedStories) {
        story.posts = story.posts.filter((e) => { return !postIds.includes(e) });
        await story.save();
    }
    await Post.deleteMany({ username: username });
};

const deleteStoryRecords = async (username) => {
    const stories = await Story.find({ usernames: { $in: [username] } });
    for (const story of stories) {
        if (story.type === "shared") {
            story.usernames = story.usernames.filter((e) => { return e !== username });
            await story.save();
        } else {
            await story.remove();
        }
    }
};

const deleteTrophyRecords = async (username) => {
    const trophies = await Trophy.find({ usernames: { $in: [username] } });
    for (const trophy of trophies) {
        if (trophy.usernames.length > 1) {
            trophy.usernames = trophy.usernames.filter((e) => { return e !== username });
            await trophy.save();
        } else {
            for (let i = 0; i < trophy.media.length; i++) {
                await deleteMedium(trophy.media[i]);
            }
            await trophy.remove();
        }
    }
};

const deleteViewRecords = async (username) => {
    await View.deleteMany({ username: username });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////