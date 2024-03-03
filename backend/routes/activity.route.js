/////////////////////// Import dependencies /////////////////////
const express = require('express');
const activityController = require('../controllers/activity.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/get')
.post(
    authenticationController.authenticate,
    activityController.get
);

router.route('/getMore')
.post(
    authenticationController.authenticate,
    activityController.getMore
);

router.route('/update')
.put(
    authenticationController.authenticate,
    activityController.update
);

router.route('/create')
.post(
    authenticationController.authenticate,
    activityController.create
);

router.route('/delete')
.delete(
    authenticationController.authenticate,
    activityController.delete
);

router.route('/like')
.put(
    authenticationController.authenticate,
    activityController.like
);

router.route('/unlike')
.put(
    authenticationController.authenticate,
    activityController.unlike
);
/////////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////