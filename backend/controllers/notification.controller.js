///////////////////////////// Import dependencies ///////////////////////////////
const Notification = require('../models/notification.model');
const User = require('../models/user.model');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.get = async (req, res) => {
    const username = req.body.username;
    try {
        const user = await User.findOne({ username: username });
        const notifications = await Notification.find({
            $and: [
                {
                    hiddenBy: { $nin: [username] }
                },
                {
                    $or: [
                        { username: { $in: user.followings } },
                        { itemId: { $in: user.watchings } }
                    ] 
                }
            ]
        }).sort({ _id: -1 }).limit(20).exec();
        return res.status(200).json({ success: true, notifications: notifications, message: "Successfully retrieved notifications from database." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to retrieve notifications from database. ${err}.` });
    }
};

exports.getMore = async (req, res) => {
    const username = req.body.username;
    const prevFetchedNotiIds = req.body.prevFetchedNotiIds;
    try {
        const user = await User.findOne({ username: username });
        const notifications = await Notification.find({
            $and: [
                {
                    hiddenBy: { $nin: [username] }
                },
                {
                    $or: [
                        { username: { $in: user.followings } },
                        { itemId: { $in: user.watchings } }
                    ] 
                },
                {
                    id: { $nin: prevFetchedNotiIds }
                }
            ]
        }).sort({ _id: -1 }).limit(20).exec();
        return res.status(200).json({ success: true, notifications: notifications, message: "Successfully retrieved more notifications from database." });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to retrieve more notifications from database. ${err}.` });
    }
};

exports.create = (req, res) => {
    const id = req.body.id;
    const notiType = req.body.notiType;
    const itemId = req.body.itemId;
    const username = req.body.username;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const hour = req.body.hour;
    const minute = req.body.minute;
    const newNotification = new Notification({
        id: id,
        notiType: notiType,
        itemId: itemId,
        username: username,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute
    });
    newNotification.save().then(
        () => {
            return res.status(200).json({ success: true, message: `New notification with id ${id} was successfully created.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save new notification with id ${id}. ${err}.` });
        }
    );
};

exports.hide = async (req, res) => {
    const notiId = req.body.notiId;
    const username = req.body.username;
    try {
        const notification = await Notification.findOne({ id: notiId });
        notification.hiddenBy.push(username);
        await notification.save();
        return res.status(200).json({ success: true, message: `Notification with id ${id} was successfully hidden from ${username}.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Failed to hide notification with id ${id} from ${username}. ${err}.` });
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////