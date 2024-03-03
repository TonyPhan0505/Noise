////////////// Import dependencies //////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema /////////////
const DreamSchema = new Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    media: {
        type: [String],
        required: true,
        default: []
    },
    details: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        enum: [0, 1],
        required: true,
        default: 0,
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
});
////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Dream', DreamSchema);
///////////////////////////////////////////////////