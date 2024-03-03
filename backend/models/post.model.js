////////////// Import dependencies //////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema /////////////
const PostSchema = new Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    hour: {
        type: Number,
        required: true
    },
    minute: {
        type: Number,
        required: true
    },
    writing: {
        type: String,
        required: true,
        trim: true
    },
    media: {
        type: [String],
        required: true,
        default: []
    },
    tags: {
        type: [String],
        required: true,
        default: []
    },
    storyId: {
        type: String,
        required: true,
        trim: true
    },
    comments: {
        type: [String],
        required: true,
        default: []
    },
    likedBy: {
        type: [String],
        required: true,
        default: []
    },
    numOfLikes: {
        type: Number,
        required: true,
        default: 0
    }
});
////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Post', PostSchema);
///////////////////////////////////////////////////