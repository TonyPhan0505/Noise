////////////// Import dependencies //////
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
////////////////////////////////////////

////////////// Create a database schema /////////////
const AdminSchema = new Schema({
    emailAddress: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true,
        trim: true,
    }
});
////////////////////////////////////////////////////

//////////// compare raw password with its hashed version //////////
AdminSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.hashed_password);
};
///////////////////////////////////////////////////////////////////

//////////////////////// Exports //////////////////////
module.exports = mongoose.model('Admin', AdminSchema);
//////////////////////////////////////////////////////