////////////// Import dependencies //////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema /////////////
const StorySchema = new Schema({
    id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true,
        enum: ['individual', 'shared']
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    usernames: {
        type: [String],
        required: true
    },
    trophies: {
        type: [String],
        required: true,
        default: []
    },
    posts: {
        type: [String],
        required: true,
        default: []
    },
    watchedBy: {
        type: [String],
        required: true,
        default: []
    },
    numOfWatchers: {
        type: Number,
        required: true,
        default: 0
    }
}); 
////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Story', StorySchema);
///////////////////////////////////////////////////