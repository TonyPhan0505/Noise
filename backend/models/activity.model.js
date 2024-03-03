////////////// Import dependencies //////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema /////////////
const ActivitySchema = new Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    activityType: {
        type: String,
        required: true,
        trim: true,
        enum: [
            "posted this post", 
            "posted this moment", 
            "shared this post", 
            "shared this moment",
            "created this story",
            "shared this story",
            "shared this profile"
        ]
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
    itemId: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        required: true,
        default: []
    },
    writing: {
        type: String,
        required: false,
        trim: true
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
    comments: {
        type: [String],
        required: true,
        default: []
    }
});
////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Activity', ActivitySchema);
///////////////////////////////////////////////////