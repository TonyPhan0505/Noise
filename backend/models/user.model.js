////////////// Import dependencies //////
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema /////////////
const UserSchema = new Schema({
    emailAddress: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    profileAvatar: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    identity: {
        type: String,
        trim: true,
        required: true,
    },
    age: {
        type: String,
        maxLength: 2,
        trim: true,
        required: true,
    },
    about: {
        type: String,
        trim: true,
        required: true,
    },
    followers: {
        type: [String],
        required: true,
        default: [],
    },
    followings: {
        type: [String],
        required: true,
        default: [],
    },
    numOfFollowers: {
        type: Number,
        required: true,
        default: 0
    },
    numOfFollowings: {
        type: Number,
        required: true,
        default: 0
    },
    companions: {
        type: [String],
        required: true,
        default: []
    },
    links: {
        type: Schema.Types.Object,
        required: false,
    },
    dreams: {
        type: [String],
        required: true,
        default: [],
    },
    stories: {
        type: [String],
        required: true,
        default: [],
    },
    interests: {
        type: [String],
        required: true,
        default: [],
    },
    trophies: {
        type: [String],
        required: true,
        default: [],
    },
    comments: {
        type: [String],
        required: true,
        default: [],
    },
    posts: {
        type: [String],
        required: true,
        default: [],
    },
    moments: {
        type: [String],
        required: true,
        default: [],
    },
    watchings: {
        type: [String],
        required: true,
        default: [],
    },
    views: {
        type: [String],
        required: true,
        default: [],
    },
    activities: {
        type: [String],
        required: true,
        default: [],
    },
    currentView: {
        type: String,
        required: true,
        default: '0',
    },
    hashed_password: {
        type: String,
        required: true,
        trim: true,
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
});
////////////////////////////////////////////////////

//////////// compare raw password with its hashed version //////////
UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.hashed_password);
};
///////////////////////////////////////////////////////////////////

//////////////////////// Exports //////////////////////
module.exports = mongoose.model('User', UserSchema);
//////////////////////////////////////////////////////