const Interest = require('../models/interest.model');

module.exports = async (post) => {
    const writing = post.writing.toLowerCase();
    const allInterests = await Interest.find({});
    for (const interest of allInterests) {
        if (!interest.relatedPosts.includes(post.id)) {
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
                interest.relatedPosts.unshift(post.id);
                await interest.save();
            }
        }
    }
};