////////////// Import dependencies //////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema /////////////
const NotificationSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    notiType: {
        type: String,
        required: true,
        trim: true,
        enum: [
            'created a story', 
            'posted a post', 
            'posted a moment',
            'posted a trophy'
        ],
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
    hiddenBy: {
        type: [String],
        required: true,
        default: []
    }
});
////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Notification', NotificationSchema);
///////////////////////////////////////////////////