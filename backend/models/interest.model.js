////////////// Import dependencies //////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema /////////////
const InterestSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    usernames: {
        type: [String],
        required: true,
        default: []
    },
    keywords: {
        type: [String],
        required: true,
        default: []
    },
    keywordTypes: {
        type: [String],
        required: true,
        default: [],
        validate: {
            validator: (keywordType) => {
                const allowedTypes = ['noun', 'adjective', 'verb'];
                return allowedTypes.includes(keywordType);
            },
            message: props => `${props.value} is not a valid keyword type!`
        }
    },
    relatedPosts: {
        type: [String],
        required: true,
        default: []
    },
    relatedMoments: {
        type: [String],
        required: true,
        default: []
    },
    relatedUsers: {
        type: [String],
        required: true,
        default: []
    }
});
////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Interest', InterestSchema);
///////////////////////////////////////////////////