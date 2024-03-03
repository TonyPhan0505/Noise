/////////////////////// Import dependencies /////////////////////
const express = require('express');
const notificationController = require('../controllers/notification.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/get')
.post(
    authenticationController.authenticate,
    notificationController.get
);

router.route('/getMore')
.post(
    authenticationController.authenticate,
    notificationController.getMore
);

router.route('/create')
.post(
    authenticationController.authenticate,
    notificationController.create
);

router.route('/hide')
.put(
    authenticationController.authenticate,
    notificationController.hide
);
/////////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////