const Interest = require('../models/interest.model');

module.exports = async (user) => {
    const interestNames = user.interests;
    const interests = await Interest.find({ name: { $in: interestNames } });
    for (const interest of interests) {
        if (!interest.relatedUsers.includes(user.username)) {
            interest.relatedUsers.push(user.username);
            await interest.save();
        }
    }
};