/////////////////////// Import dependencies /////////////////////
const express = require('express');
const userController = require('../controllers/user.controller');
const authenticationController = require('../controllers/authentication.controller');
const router = express.Router();
/////////////////////////////////////////////////////////////////

/////////////////////////// Routes ///////////////////////////
router.route('/searchUsers')
.post(
    authenticationController.authenticate,
    userController.searchUsers
);

router.route('/searchUsersWithInterestX')
.post(
    authenticationController.authenticate,
    userController.searchUsersWithInterestX
);

router.route('/searchMoreUsersWithInterestX')
.post(
    authenticationController.authenticate,
    userController.searchMoreUsersWithInterestX
);

router.route('/doesUserExist')
.post(
    userController.doesUserExist
);

router.route('/getMutualInterestsUsers')
.post(
    authenticationController.authenticate,
    userController.getMutualInterestsUsers
);

router.route('/login')
.post(userController.login);

router.route('/signUp')
.post(userController.signUp);

router.route('/verifyAccount')
.put(userController.verifyAccount);

router.route('/updateProfile')
.put(
    authenticationController.authenticate,
    userController.updateProfile
);

router.route('/follow')
.put(
    authenticationController.authenticate,
    userController.follow
);

router.route('/getFollowers')
.post(
    authenticationController.authenticate,
    userController.getFollowers
);

router.route('/getMoreFollowers')
.post(
    authenticationController.authenticate,
    userController.getMoreFollowers
);

router.route('/getFollowings')
.post(
    authenticationController.authenticate,
    userController.getFollowings
);

router.route('/getMoreFollowings')
.post(
    authenticationController.authenticate,
    userController.getMoreFollowings
);

router.route('/unfollow')
.put(
    authenticationController.authenticate,
    userController.unfollow
);

router.route('/deleteAccount')
.delete(
    authenticationController.authenticate,
    userController.deleteAccount
);
//////////////////////////////////////////////////////////////

///////// Exports /////////
module.exports = router;
//////////////////////////