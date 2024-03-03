////////////// Import dependencies //////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema /////////////
const InterestCategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    interests: {
        type: [String],
        required: true,
        default: []
    }
});
////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Interest_Category', InterestCategorySchema);
///////////////////////////////////////////////////