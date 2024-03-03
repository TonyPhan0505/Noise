///////////////////////////// Import dependencies ///////////////////////////////
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.model');
////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.signUp = async (req, res) => {
    const emailAddress = req.body.emailAddress;
    const hashed_password = bcrypt.hashSync(req.body.password, 10);
    const admins = await Admin.find({});
    if (admins.length >= 1) {
        return res.status(400).json({ success: false, message: "Cannot create anymore admin account." });
    } else {
        const newAdmin = new Admin({
            emailAddress: emailAddress,
            hashed_password: hashed_password
        });
        newAdmin.save().then(
            () => {
                return res.status(200).json({ success: true, message: "Successfully created admin account." });
            }
        ).catch(
            err => {
                return res.status(500).json({ success: false, message: `Failed to create admin account. ${err}.` });
            }
        );
    }
};

exports.signIn = (req, res) => {
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    Admin.findOne({ emailAddress: emailAddress }).then(
        (admin) => {
            if (!admin || !admin.comparePassword(password)) {
                res.status(401).json({ success: false, message: 'Invalid email or password.' });
            }
            try {
                const secretKey = process.env.ADMIN_SECRET_KEY;
                const accessToken = jwt.sign({ emailAddress: admin.emailAddress }, secretKey, { expiresIn: '2h' });
                return res.status(200).json({ success: true, accessToken: accessToken });
            } catch (err) {
                return res.status(500).json({ success: false, message: `Server error when creating login token for admin. ${err}.` });
            }
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Server error when logging in admin. ${err}.` });
        }
    );
};
/////////////////////////////////////////////////////////////////////////