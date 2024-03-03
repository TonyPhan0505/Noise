////////////// Import dependencies //////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema /////////////
const TrophySchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    storyId: {
        type: String,
        required: true,
        trim: true
    },
    usernames: {
        type: [String],
        required: true,
        trim: true
    },
    media: {
        type: [String],
        required: true,
        default: []
    },
    writing: {
        type: String,
        required: true,
        trim: true
    }
});
////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Trophy', TrophySchema);
///////////////////////////////////////////////////