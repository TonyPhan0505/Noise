/////////////////////// Import dependencies /////////////////////
const express = require('express');
const interestController = require('../controllers/interest.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/get')
.post(
    authenticationController.authenticate,
    interestController.get
);

router.route('/addKeywords')
.put(
    authenticationController.authenticateAdmin,
    interestController.addKeywords
);

router.route('/removeKeywords')
.put(
    authenticationController.authenticateAdmin,
    interestController.removeKeywords
);

router.route('/create')
.post(
    authenticationController.authenticateAdmin,
    interestController.create
);

router.route('/delete')
.delete(
    authenticationController.authenticateAdmin,
    interestController.delete
);

router.route('/removeOldPosts')
.put(
    authenticationController.authenticateAdmin,
    interestController.removeOldPosts
);

router.route('/removeOldMoments')
.put(
    authenticationController.authenticateAdmin,
    interestController.removeOldMoments
);
/////////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////