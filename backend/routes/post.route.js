/////////////////////// Import dependencies /////////////////////
const express = require('express');
const postController = require('../controllers/post.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/get')
.post(
    authenticationController.authenticate,
    postController.get
);

router.route('/search')
.post(
    authenticationController.authenticate,
    postController.search
);

router.route('/searchMore')
.post(
    authenticationController.authenticate,
    postController.searchMore
);

router.route('/update')
.put(
    authenticationController.authenticate,
    postController.update
);

router.route('/create')
.post(
    authenticationController.authenticate,
    postController.create
);

router.route('/delete')
.delete(
    authenticationController.authenticate,
    postController.delete
);

router.route('/like')
.put(
    authenticationController.authenticate,
    postController.like
);

router.route('/unlike')
.put(
    authenticationController.authenticate,
    postController.unlike
);
/////////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////