///////////////////////////// Import dependencies ///////////////////////////////
const View = require('../models/view.model');
const User = require('../models/user.model');
/////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Callbacks /////////////////////////////////
exports.get = (req, res) => {
    const username = req.body.username;
    View.find({ username: username }).then(
        (views) => {
            return res.status(200).json({ success: true, views: views, message: "Successfully retrieved all users from database." });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to retrieve views from database. ${err}.` });
        }
    );
};

exports.update = (req, res) => {
    const viewId = req.body.viewId;
    const members = req.body.members;
    View.updateOne({ id: viewId }, {
        members: members
    }).then(
        async () => {
            const view = await View.findOne({ id: viewId });
            return res.status(200).json({ success: true, view: view, message: `View with id ${viewId} was successfully updated.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to update view ${viewId} in database. ${err}.` });
        }
    );
};

exports.create = (req, res) => {
    const id = req.body.id;
    const username = req.body.username;
    const members = req.body.members;
    const newView = new View({
        id: id,
        username: username,
        members: members
    });
    newView.save().then(
        async (view) => {
            const user = await User.findOne({ username: username });
            user.views.unshift(id);
            await user.save();
            return res.status(200).json({ success: true, view: view, message: `New view with id ${id} was successfully created.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save new view with id ${id}. ${err}.` });
        }
    );
};

exports.delete = (req, res) => {
    const viewId = req.body.viewId;
    View.deleteOne({ id: viewId }).then(
        async () => {
            const view = await View.findOne({ id: viewId });
            const user = await User.findOne({ username: view.username });
            user.views = user.views.filter((id) => { return id !== viewId });
            await user.save();
            return res.status(200).json({ success: true, message: `View with id ${viewId} was successfully deleted.` });
        }
    ).catch(
        err => {
            return res.status(500).json({ success: false, message: `Failed to save new view with id ${id}. ${err}.` });
        }
    );
};
////////////////////////////////////////////////////////////////////////////////////////////////////////