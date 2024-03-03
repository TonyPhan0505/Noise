const shuffle = require("string-shuffle");
const sendEmail = require("./sendEmail.service");

function generateVerificationCode() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    let combination = alphabet + digits;
    for (let _ = 0; _ < 6; _++) {
        combination = shuffle.shuffleString(combination); 
    }
    const code = combination.substring(0, 7);
    return code;
}

module.exports = (emailAddress) => {
    const code = generateVerificationCode();
    sendEmail(
        emailAddress,
        "Verification",
        `Hello,\n\nYour verification code is ${code}.\n\nBest regards,\nNoise`
    );
};