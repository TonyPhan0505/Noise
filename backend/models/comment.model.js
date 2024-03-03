////////////// Import dependencies //////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema /////////////
const CommentSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    writing: {
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
    hostId: {
        type: String,
        required: true,
        trim: true
    },
    hostType: {
        type: String,
        required: true,
        trim: true,
        enum: ['post', 'moment', 'activity']
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
    },
    parentCommentId: {
        type: String,
        required: false
    }
});
////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Comment', CommentSchema);
///////////////////////////////////////////////////