////////////// Import dependencies //////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema /////////////
const VerificationCodeSchema = new Schema({
    vcid: {
        type: String,
        unique: true,
        required: true,
        default: () => new mongoose.Types.ObjectId().toString(),
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    emailAddress: {
        type: String,
        required: true,
        trim: true
    },
    datetime: {
        type: Date,
        required: true
    }
});
////////////////////////////////////////////////////

////////////////////// Exports ////////////////////
module.exports = mongoose.model('Verification_Code', VerificationCodeSchema);
////////////////////////////////////////////////////