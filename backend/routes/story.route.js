/////////////////////// Import dependencies /////////////////////
const express = require('express');
const storyController = require('../controllers/story.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/get')
.post(
    authenticationController.authenticate,
    storyController.get
);

router.route('/search')
.post(
    authenticationController.authenticate,
    storyController.search
);

router.route('/searchMore')
.post(
    authenticationController.authenticate,
    storyController.searchMore
);

router.route('/update')
.put(
    authenticationController.authenticate,
    storyController.update
);

router.route('/create')
.post(
    authenticationController.authenticate,
    storyController.create
);

router.route('/delete')
.delete(
    authenticationController.authenticate,
    storyController.delete
);

router.route('/watch')
.put(
    authenticationController.authenticate,
    storyController.watch
);

router.route('/unwatch')
.put(
    authenticationController.authenticate,
    storyController.unwatch
);
/////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////