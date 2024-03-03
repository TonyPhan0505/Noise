/////////////////////// Import dependencies /////////////////////
const express = require('express');
const interestCategoryController = require('../controllers/InterestCategory.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/getAll')
.post(
    authenticationController.authenticate,
    interestCategoryController.getAll
);

router.route('/removeInterest')
.put(
    authenticationController.authenticateAdmin,
    interestCategoryController.removeInterest
);

router.route('/addInterest')
.put(
    authenticationController.authenticateAdmin,
    interestCategoryController.addInterest
);

router.route('/create')
.post(
    authenticationController.authenticateAdmin,
    interestCategoryController.create
);

router.route('/delete')
.delete(
    authenticationController.authenticateAdmin,
    interestCategoryController.delete
);
/////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
/////////////////////////