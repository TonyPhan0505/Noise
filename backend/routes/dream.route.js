/////////////////////// Import dependencies /////////////////////
const express = require('express');
const dreamController = require('../controllers/dream.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/get')
.post(
    authenticationController.authenticate,
    dreamController.get
);

router.route('/update')
.put(
    authenticationController.authenticate,
    dreamController.update
);

router.route('/create')
.post(
    authenticationController.authenticate,
    dreamController.create
);

router.route('/delete')
.delete(
    authenticationController.authenticate,
    dreamController.delete
);
/////////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////