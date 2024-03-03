/////////////////////// Import dependencies /////////////////////
const express = require('express');
const momentController = require('../controllers/moment.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/get')
.post(
    authenticationController.authenticate,
    momentController.get
);

router.route('/update')
.put(
    authenticationController.authenticate,
    momentController.update
);

router.route('/create')
.post(
    authenticationController.authenticate,
    momentController.create
);

router.route('/delete')
.delete(
    authenticationController.authenticate,
    momentController.delete
);

router.route('/like')
.put(
    authenticationController.authenticate,
    momentController.like
);

router.route('/unlike')
.put(
    authenticationController.authenticate,
    momentController.unlike
);
/////////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////