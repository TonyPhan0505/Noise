///////////////////////////// Import dependencies ///////////////////////////////
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Activity = require('../models/activity.model');
const Story = require('../models/story.model');
const categorizePost = require('../services/categorizePost.service');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.get = (req, res) => {
    const username = req.body.username;
    Post.find({ username: username }).sort({ _id: -1 }).exec().then(
        (posts) => {
            return res.status(200).json({ success: true, posts: posts, message: "Successfully retrieved all posts from database." });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to retrieve posts from database. ${err}.` });
        }
    );
};

exports.search = async (req, res) => {
    const keyword = req.body.keyword;
    try {
        const posts = await Post.find({
            writing: { $regex: keyword, $options: 'i' }
        }).sort({ _id: -1 }).limit(12).exec();
        return res.status(200).json({ success: true, posts: posts, message: "Successfully fetched posts relevant to searched word." });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Failed to fetch posts relevant to searched word." });
    }
};

exports.searchMore = async (req, res) => {
    const keyword = req.body.keyword;
    const prevPostIds = req.body.prevPostIds;
    try {
        const posts = await Post.find({
            $and: [
                { writing: { $regex: keyword, $options: 'i' } },
                { id: { $nin: prevPostIds } }
            ]
        }).sort({ _id: -1 }).limit(12).exec();
        return res.status(200).json({ success: true, posts: posts, message: "Successfully fetched more posts relevant to searched word." });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Failed to fetch more posts relevant to searched word." });
    }
};

exports.update = (req, res) => {
    const postId = req.body.postId;
    const writing = req.body.writing;
    const media = req.body.media;
    const tags = req.body.tags;
    Post.updateOne({ id: postId }, {
        writing: writing,
        media: media,
        tags: tags
    }).then(
        async () => {
            const post = await Post.findOne({ id: postId });
            return res.status(200).json({ success: true, post: post, message: `Post with id ${postId} was successfully updated.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to update post ${postId} in database. ${err}.` });
        }
    );
};

exports.create = (req, res) => {
    const postId = req.body.postId;
    const username = req.body.username;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const hour = req.body.hour;
    const minute = req.body.minute;
    const writing = req.body.writing;
    const media = req.body.media;
    const tags = req.body.tags;
    const storyId = req.body.storyId;
    const newPost = new Post({
        id: postId,
        username: username,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        writing: writing,
        media: media,
        tags: tags,
        storyId: storyId
    });
    newPost.save().then(
        async (post) => {
            const user = await User.findOne({ username: username });
            user.posts.unshift(postId);
            await user.save();
            const story = await Story.findOne({ id: storyId });
            story.posts.unshift(postId);
            await story.save();
            await categorizePost(post);
            return res.status(200).json({ success: true, post: post, message: `New post with id ${postId} was successfully created.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save new post. ${err}.` });
        }
    );
};

exports.delete = (req, res) => {
    const postId = req.body.postId;
    Post.deleteOne({ id: postId }).then(
        async () => {
            const post = await Post.findOne({ id: postId });
            const user = await User.findOne({ username: post.username });
            user.posts = user.posts.filter((id) => { return id !== postId });
            await user.save();
            await Activity.deleteMany({ itemId: postId });
            const story = await Story.findOne({ id: post.storyId });
            story.posts = story.posts.filter((id) => { return id !== postId });
            await story.save();
            return res.status(200).json({ success: true, message: `Post with id ${postId} was successfully deleted.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to delete post with id ${postId}. ${err}.` });
        }
    );
};

exports.updateUsername = async (currentUsername, newUsername) => {
    const allPosts = await Post.find({});
    for (const post of allPosts) {
        if (post.username === currentUsername) {
            post.username = newUsername;
        }
        post.tags = post.tags.map((item) => {
            item.replace(currentUsername, newUsername);
        });
        post.likedBy = post.likedBy.map((item) => {
            item.replace(currentUsername, newUsername);
        });
        await post.save();
    }
};

exports.like = async (req, res) => {
    const postId = req.body.postId;
    const username = req.body.username;
    try {
        const post = await Post.findOne({ id: postId });
        post.likedBy.unshift(username);
        post.numOfLikes = post.numOfLikes + 1;
        await post.save();
        return res.status(200).json({ success: true, message: "Successfully liked post." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to like post. ${err}.` });
    }
};

exports.unlike = async (req, res) => {
    const postId = req.body.postId;
    const username = req.body.username;
    try {
        const post = await Post.findOne({ id: postId });
        post.likedBy = post.likedBy.filter((e) => { return e !== username });
        post.numOfLikes = post.numOfLikes - 1;
        await post.save();
        return res.status(200).json({ success: true, message: "Successfully unliked post." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to unlike post. ${err}.` });
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////