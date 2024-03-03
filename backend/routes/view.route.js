/////////////////////// Import dependencies /////////////////////
const express = require('express');
const viewController = require('../controllers/view.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/get')
.post(
    authenticationController.authenticate,
    viewController.get
);

router.route('/update')
.put(
    authenticationController.authenticate,
    viewController.update
);

router.route('/create')
.post(
    authenticationController.authenticate,
    viewController.create
);

router.route('/delete')
.delete(
    authenticationController.authenticate,
    viewController.delete
);
/////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////