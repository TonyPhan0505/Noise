const User = require("../models/user.model");

module.exports = async (currentUser, mutualInterestsUsernames) => {
    const users = await User.find({ 
        $and: [
            { username: { $in: mutualInterestsUsernames } },
            { username: { $ne: currentUser.username } },
            { username: { $nin: currentUser.followings } }
        ]
    });
    users.sort((a, b) => b.numOfFollowers - a.numOfFollowers);
    users = users.slice(0, 10);
    return users;
};