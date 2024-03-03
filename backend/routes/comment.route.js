/////////////////////// Import dependencies /////////////////////
const express = require('express');
const commentController = require('../controllers/comment.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/get')
.post(
    authenticationController.authenticate,
    commentController.get
);

router.route('/getMore')
.post(
    authenticationController.authenticate,
    commentController.getMore
);

router.route('/update')
.put(
    authenticationController.authenticate,
    commentController.update
);

router.route('/create')
.post(
    authenticationController.authenticate,
    commentController.create
);

router.route('/delete')
.delete(
    authenticationController.authenticate,
    commentController.delete
);

router.route('/like')
.put(
    authenticationController.authenticate,
    commentController.like
);

router.route('/unlike')
.put(
    authenticationController.authenticate,
    commentController.unlike
);
/////////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////