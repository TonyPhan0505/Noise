///////////////////////////// Import dependencies ///////////////////////////////
const InterestCategory = require('../models/InterestCategory.model');
const Interest = require('../models/interest.model');
///////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.getAll = (req, res) => {
    InterestCategory.find({}).then(
        (categories) => {
            return res.status(200).json({ success: true, categories: categories, message: "Successfully fetched interest categories from database." });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to fetch interest categories from database. ${err}.` });
        }
    );
};

exports.removeInterest = async (req, res) => {
    const name = req.body.name;
    const interestName = req.body.interestName;
    try {
        const category = await InterestCategory.findOne({ name: name });
        category.interests = category.interests.filter((e) => { return e !== interestName });
        await category.save();
        return res.status(200).json({ success: true, message: `Successfully removed ${interestName} from ${name} in database.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to remove ${interestName} from ${name} in database. ${err}.` });
    }
};

exports.addInterest = async (req, res) => {
    const name = req.body.name;
    const interestName = req.body.interestName;
    try {
        const category = await InterestCategory.findOne({ name: name });
        category.interests.push(interestName);
        await category.save();
        return res.status(200).json({ success: true, message: `Successfully added the interest ${interestName} to category ${name} in database.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to remove the interest ${interestName} from category ${name} in database. ${err}.` });
    }
};

exports.create = (req, res) => {
    const name = req.body.name;
    const interests = req.body.interests;
    const newInterestCategory = new InterestCategory({
        name: name,
        interests: interests
    });
    newInterestCategory.save().then(
        () => {
            return res.status(200).json({ success: true, message: `New interest category with name ${name} was successfully created.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save new interest category with name ${name}. ${err}.` });
        }
    );
};

exports.delete = (req, res) => {
    const name = req.body.name;
    InterestCategory.deleteOne({ name: name }).then(
        async () => {
            await Interest.deleteMany({ category: name });
            return res.status(200).json({ success: false, message: `Successfully deleted interest category with name ${name} and all of its related interests.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to delete interest category with name ${name}. ${err}.` });
        }
    );
};
/////////////////////////////////////////////////////////////////////////