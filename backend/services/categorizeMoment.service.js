const Interest = require('../models/interest.model');

module.exports = async (moment) => {
    const writing = moment.writing.toLowerCase();
    const allInterests = await Interest.find({});
    for (const interest of allInterests) {
        if (!interest.relatedMoments.includes(moment.id)) {
            const keywords = interest.keywords;
            const keywordTypes = interest.keywordTypes;
            let matchedKeywords = {
                "noun": undefined,
                "adjective": undefined,
                "verb": undefined
            };
            let matchedCount = 0;
            for (let i = 0; i < keywords.length; i++) {
                if (matchedCount >= 3) {
                    break;
                }
                if (writing.includes(keywords[i]) && !matchedKeywords[keywordTypes[i]]) {
                    matchedKeywords[keywordTypes[i]] = keywords[i];
                    matchedCount += 1;
                }
            }
            if (matchedCount >= 3) {
                interest.relatedMoments.unshift(moment.id);
                await interest.save();
            }
        }
    }
};