/////////////////////// Import dependencies /////////////////////
const express = require('express');
const trophyController = require('../controllers/trophy.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/get')
.post(
    authenticationController.authenticate,
    trophyController.get
);

router.route('/search')
.post(
    authenticationController.authenticate,
    trophyController.search
);

router.route('/searchMore')
.post(
    authenticationController.authenticate,
    trophyController.searchMore
);

router.route('/update')
.put(
    authenticationController.authenticate,
    trophyController.update
);

router.route('/create')
.post(
    authenticationController.authenticate,
    trophyController.create
);

router.route('/delete')
.delete(
    authenticationController.authenticate,
    trophyController.delete
);
/////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////