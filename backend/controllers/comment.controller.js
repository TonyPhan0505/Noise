///////////////////////////// Import dependencies ///////////////////////////////
const Comment = require('../models/comment.model');
const User = require('../models/user.model');
const Activity = require('../models/activity.model');
const Post = require('../models/post.model');
const Moment = require('../models/moment.model');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.get = async (req, res) => {
    const itemId = req.body.itemId;
    const itemType = req.body.itemType;
    try {
        let commentIds;
        if (itemType === "Activity") {
            const activity = await Activity.findOne({ id: itemId });
            commentIds = activity.comments;
        } else if (itemType === "Post") {
            const post = await Post.findOne({ id: itemId });
            commentIds = post.comments;
        } else if (itemType === "Moment") {
            const moment = await Moment.findOne({ id: itemId });
            commentIds = moment.comments;
        }
        const comments = await Comment.find({ id: { $in: commentIds } }).sort({ _id: -1 }).limit(30).exec();
        return res.status(200).json({ success: true, comments: comments, message: `Successfully retrieved comments for ${itemType} with id ${itemId}.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to retrieve comments for ${itemType} with id ${itemId}. ${err}.` });
    }
};

exports.getMore = async (req, res) => {
    const itemId = req.body.itemId;
    const itemType = req.body.itemType;
    const prevFetchedCommentIds = req.body.prevFetchedCommentIds;
    try {
        let commentIds;
        if (itemType === "Activity") {
            const activity = await Activity.findOne({ id: itemId });
            commentIds = activity.comments;
        } else if (itemType === "Post") {
            const post = await Post.findOne({ id: itemId });
            commentIds = post.comments;
        } else if (itemType === "Moment") {
            const moment = await Moment.findOne({ id: itemId });
            commentIds = moment.comments;
        }
        const comments = await Comment.find({
            $and: [
                { id: { $in: commentIds } },
                { id: { $nin: prevFetchedCommentIds } }
            ] 
        }).sort({ _id: -1 }).limit(30).exec();
        return res.status(200).json({ success: true, comments: comments, message: `Successfully retrieved more comments for ${itemType} with id ${itemId}.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to retrieve more comments for ${itemType} with id ${itemId}. ${err}.` });
    }
};

exports.update = (req, res) => {
    const commentId = req.body.commentId;
    const writing = req.body.writing;
    Comment.updateOne({ id: commentId }, {
        writing: writing
    }).then(
        async () => {
            const comment = await Comment.findOne({ id: commentId });
            return res.status(200).json({ success: true, comment: comment, message: `Comment with id ${commentId} was successfully updated.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to update comment ${commentId}. ${err}.` });
        }
    );
};

exports.create = (req, res) => {
    const commentId = req.body.commentId;
    const username = req.body.username;
    const writing = req.body.writing;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const hour = req.body.hour;
    const minute = req.body.minute;
    const hostId = req.body.hostId;
    const hostType = req.body.hostType;
    const parentCommentId = req.body.parentCommentId;
    const newComment = new Comment({
        id: commentId,
        username: username,
        writing: writing,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        hostId: hostId,
        hostType: hostType,
        parentCommentId: parentCommentId
    });
    newComment.save().then(
        async (comment) => {
            const user = await User.findOne({ username: username });
            user.comments.unshift(commentId);
            await user.save();
            if (hostType === "post") {
                const post = await Post.findOne({ id: hostId });
                post.comments.unshift(commentId);
                await post.save();
            } else if (hostType === "moment") {
                const moment = await Moment.findOne({ id: hostId });
                moment.comments.unshift(commentId);
                await moment.save();
            } else {
                const activity = await Activity.findOne({ id: hostId });
                activity.comments.unshift(commentId);
                await activity.save();
            }
            return res.status(200).json({ success: true, comment: comment, message: `New comment with id ${commentId} was successfully created.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save comment ${commentId}. ${err}.` });
        }
    );
};

exports.delete = (req, res) => {
    const commentId = req.body.commentId;
    const hostId = req.body.hostId;
    const hostType = req.body.hostType;
    const username = req.body.username;
    Comment.deleteOne({ id: commentId }).then(
        async () => {
            const user = await User.findOne({ username: username });
            user.comments = user.comments.filter((id) => { return id !== commentId });
            await user.save();
            if (hostType === "post") {
                const post = await Post.findOne({ id: hostId });
                post.comments = post.comments.filter((id) => { return id !== commentId });
                await post.save();
            } else if (hostType === "moment") {
                const moment = await Moment.findOne({ id: hostId });
                moment.comments = moment.comments.filter((id) => { return id !== commentId });
                await moment.save();
            } else {
                const activity = await Activity.findOne({ id: hostId });
                activity.comments = activity.comments.filter((id) => { return id !== commentId });
                await activity.save();
            }
            return res.status(200).json({ success: true, message: `Comment with id ${commentId} was successfully deleted.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to delete comment ${commentId}. ${err}.` });
        }
    );
};

exports.updateUsername = async (currentUsername, newUsername) => {
    const allComments = await Comment.find({});
    for (const comment of allComments) {
        if (comment.username === currentUsername) {
            comment.username = newUsername;
        }
        comment.likedBy = comment.likedBy.map((item) => {
            item.replace(currentUsername, newUsername);
        });
        await comment.save();
    }
};

exports.like = async (req, res) => {
    const commentId = req.body.commentId;
    const username = req.body.username;
    try {
        const comment = await Comment.findOne({ id: commentId });
        comment.likedBy.unshift(username);
        comment.numOfLikes = comment.numOfLikes + 1;
        await comment.save();
        return res.status(200).json({ success: true, message: "Successfully liked comment." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to like comment. ${err}.` });
    }
};

exports.unlike = async (req, res) => {
    const commentId = req.body.commentId;
    const username = req.body.username;
    try {
        const comment = await Comment.findOne({ id: commentId });
        comment.likedBy = comment.likedBy.filter((e) => { return e !== username });
        comment.numOfLikes = comment.numOfLikes - 1;
        await comment.save();
        return res.status(200).json({ success: true, message: "Successfully unliked comment." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to unlike comment. ${err}.` });
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////