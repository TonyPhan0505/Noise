const Activity = require('../models/activity.model');
const User = require('../models/user.model');
const Interest = require('../models/interest.model');
const shuffleArray = require('./shuffleArray.service');

module.exports = async (username, prevFetchedActivityItemIds) => {
    const user = await User.findOne({ username: username });
    const interestNames = user.interests;
    const interests = await Interest.find({ name: { $in: interestNames } });
    const relevantPosts = shuffleArray(interests.map((interest) => {
        return interest.relatedPosts;
    }).flat().filter((id) => { return !prevFetchedActivityItemIds.includes(id) }).slice(0, 40));
    const relevantMoments = shuffleArray(interests.map((interest) => {
        return interest.relatedMoments;
    }).flat().filter((id) => { return !prevFetchedActivityItemIds.includes(id) }).slice(0, 40));
    const relevantUsers = shuffleArray(interests.map((interest) => {
        return interest.relatedUsers;
    }).flat().filter((id) => { return !prevFetchedActivityItemIds.includes(id) }).slice(0, 40));
    const relevantPostActivities = await getRelevantPostActivities(username, relevantPosts);
    const relevantMomentActivities = await getRelevantMomentActivities(username, relevantMoments);
    const relevantProfileActivities = await getRelevantProfileActivities(username, relevantUsers);
    const relevantActivities = shuffleArray(
        relevantPostActivities.concat(
            relevantMomentActivities, 
            relevantProfileActivities
        )
    );
    return relevantActivities;
};

async function getRelevantPostActivities(
    username,
    relevantPosts
) {
    const activities = await Activity.find({
        $and: [
            { itemId: { $in: relevantPosts } },
            { username: { $ne: username } }
        ]
    });
    return activities;
}

async function getRelevantMomentActivities(
    username,
    relevantMoments
) {
    const activities = await Activity.find({ 
        $and: [
            { itemId: { $in: relevantMoments } },
            { username: { $ne: username } }
        ] 
    });
    return activities;
}

async function getRelevantProfileActivities(
    username,
    relevantUsers
) {
    const activities = await Activity.find({ 
        $and: [
            { itemId: { $in: relevantUsers } },
            { username: { $ne: username } }
        ] 
    });
    return activities;
}