///////////////////////////// Import dependencies /////////////////////////////
const VerificationCode = require('../models/VerificationCode.model');
const sendVerificationCode = require('../services/sendVerificationCode.service');
//////////////////////////////////////////////////////////////////////////////

///////////////////////////// Callbacks /////////////////////////////
exports.send = async (req, res) => {
    const emailAddress = req.body.emailAddress;
    try {
        code = sendVerificationCode(emailAddress);
        const newVerificationCode = new VerificationCode({
            code: code,
            emailAddress: emailAddress,
            datetime: new Date()
        });
        await newVerificationCode.save();
        return res.status(200).json({ success: true, message: `Verification code sent.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Internal server error. Failed to send and save verification code. ${err}.` });
    }
};

exports.verify = async (req, res) => {
    const emailAddress = req.body.emailAddress;
    const code = req.body.code;
    try {
        const fourMinutesAgo = new Date();
        fourMinutesAgo.setMinutes(fourMinutesAgo.getMinutes() - 4);
        const verificationCode = await VerificationCode.findOne({
            $and: [
                { emailAddress: emailAddress },
                { datetime: { $gte: fourMinutesAgo } }
            ]
        });
        if (verificationCode) {
            await VerificationCode.deleteMany({ emailAddress: emailAddress });
            if (verificationCode.code === code) {
                return res.status(200).json({ success: true, valid: true, message: 'Verification code is successfully verified as valid.' });
            }
        } else {
            return res.status(200).json({ success: true, valid: false, message: 'Verification code is invalid.' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to verify verification code.' });
    }
};
////////////////////////////////////////////////////////////////////