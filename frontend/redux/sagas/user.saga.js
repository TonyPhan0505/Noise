////////////////////////////// Import dependencies //////////////////////////////
import { 
    searchUsers,
    searchUsersWithInterestX,
    searchMoreUsersWithInterestX,
    getMutualInterestsUsers,
    login,
    signUp,
    verifyAccount,
    updateProfile,
    follow,
    getFollowers,
    getMoreFollowers,
    getFollowings,
    getMoreFollowings,
    unfollow,
    deleteAccount,
    doesUserExist
} from "../../apis/user.api";

import {
    takeEvery,
    put
} from 'redux-saga/effects';

import {
    searchReducer,
    resetSearchReducer,
    fetchMutualInterestsUsersReducer,
    resetFetchMutualInterestsUsersReducer,
    loginReducer,
    resetLoginReducer,
    signUpReducer,
    resetSignUpReducer,
    verifyAccountReducer,
    resetVerifyAccountReducer,
    updateProfileReducer,
    resetUpdateProfileReducer,
    addActivityReducer,
    resetAddActivityReducer,
    deleteActivityReducer,
    resetDeleteActivityReducer,
    commentReducer,
    resetCommentReducer,
    deleteCommentReducer,
    resetDeleteCommentReducer,
    addDreamReducer,
    resetAddDreamReducer,
    deleteDreamReducer,
    resetDeleteDreamReducer,
    addInterestReducer,
    resetAddInterestReducer,
    deleteInterestReducer,
    resetDeleteInterestReducer,
    addMomentReducer,
    resetAddMomentReducer,
    deleteMomentReducer,
    resetDeleteMomentReducer,
    addPostReducer,
    resetAddPostReducer,
    deletePostReducer,
    resetDeletePostReducer,
    addStoryReducer,
    resetAddStoryReducer,
    deleteStoryReducer,
    resetDeleteStoryReducer,
    addTrophyReducer,
    resetAddTrophyReducer,
    deleteTrophyReducer,
    resetDeleteTrophyReducer,
    followReducer,
    resetFollowReducer,
    fetchFollowersReducer,
    resetFetchFollowersReducer,
    fetchMoreFollowersReducer,
    resetFetchMoreFollowersReducer,
    fetchFollowingsReducer,
    resetFetchFollowingsReducer,
    fetchMoreFollowingsReducer,
    resetFetchMoreFollowingsReducer,
    unfollowReducer,
    resetUnfollowReducer,
    watchStoryReducer,
    resetWatchStoryReducer,
    unwatchStoryReducer,
    resetUnwatchStoryReducer,
    doesUserExistReducer,
    resetDoesUserExistReducer,
    searchUsersWithInterestXReducer,
    resetSearchUsersWithInterestXReducer,
    searchMoreUsersWithInterestXReducer,
    resetSearchMoreUsersWithInterestXReducer
} from '../slices/user.slice';
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Middleware ///////////////////////////////
function* searchSaga(action) {
    const searchedUsername = action.payload;
    const res = yield searchUsers(searchedUsername);
    if (res && res.data.success) {
        const users = res.data.users;
        yield put(searchReducer({
            status: 1,
            users: users
        }));
        console.log("SUCCESS: Successfully searched users.");
    } else {
        yield put(searchReducer({
            status: 0,
            users: undefined
        }));
        console.error("ERROR: Failed to search users.");
    }
}

function* resetSearchSaga() {
    yield put(resetSearchReducer());
}

function* searchUsersWithInterestXSaga(action) {
    const interestName = action.payload;
    const res = yield searchUsersWithInterestX(interestName);
    if (res && res.data.success) {
        const users = res.data.users;
        yield put(searchUsersWithInterestXReducer({
            status: 1,
            users: users
        }));
        console.log("SUCCESS: Successfully searched for users with interest x.");
    } else {
        yield put(searchUsersWithInterestXReducer({
            status: 0,
            users: undefined
        }));
        console.error("ERROR: Failed to search for users with interest x.");
    }
}

function* resetSearchUsersWithInterestXSaga() {
    yield put(resetSearchUsersWithInterestXReducer());
}

function* searchMoreUsersWithInterestXSaga(action) {
    const {
        interestName, 
        prevUsernames
    } = action.payload;
    const res = yield searchMoreUsersWithInterestX(
        interestName,
        prevUsernames
    );
    if (res && res.data.success) {
        const users = res.data.users;
        yield put(searchMoreUsersWithInterestXReducer({
            status: 1,
            users: users
        }));
        console.log("SUCCESS: Successfully searched for more users with interest x.");
    } else {
        yield put(searchMoreUsersWithInterestXReducer({
            status: 0,
            users: undefined
        }));
        console.error("ERROR: Failed to search for more users with interest x.");
    }
}

function* resetSearchMoreUsersWithInterestXSaga() {
    yield put(resetSearchMoreUsersWithInterestXReducer());
}

function* fetchMutualInterestsUsersSaga(action) {
    const username = action.payload;
    const res = yield getMutualInterestsUsers(username);
    if (res && res.data.success) {
        const users = res.data.users;
        yield put(fetchMutualInterestsUsersReducer({
            status: 1,
            users: users
        }));
        console.log("SUCCESS: Successfully fetched users with mutual interests.");
    } else {
        yield put(fetchMutualInterestsUsersReducer({
            status: 0,
            users: undefined
        }));
        console.error("ERROR: Failed to fetch users with mutual interests.");
    }
}

function* resetFetchMutualInterestsUsersSaga() {
    yield put(resetFetchMutualInterestsUsersReducer());
}

function* loginSaga(action) {
    const { username, password } = action.payload;
    const res = yield login(username, password);
    if (res && res.data.success) {
        const user = res.data.user;
        yield put(loginReducer({
            status: 1,
            user: user
        }));
        console.log("SUCCESS: Successfully logged in.");
    } else {
        yield put(loginReducer({
            status: 0,
            user: undefined
        }));
        console.error("ERROR: Failed to log in.");
    }
}

function* resetLoginSaga() {
    yield put(resetLoginReducer());
}

function* signUpSaga(action) {
    const { 
        username,
        emailAddress,
        profileAvatar,
        identity,
        age,
        about,
        password
    } = action.payload;
    const res = yield signUp(
        username, 
        emailAddress, 
        profileAvatar, 
        identity, 
        age, 
        about, 
        password
    );
    if (res && res.data.success) {
        yield put(signUpReducer(1));
        console.log("SUCCESS: Successfully signed up.");
    } else {
        yield put(signUpReducer(0));
        console.error("ERROR: Failed to sign up.");
    }
}

function* resetSignUpSaga() {
    yield put(resetSignUpReducer());
}

function* verifyAccountSaga(action) {
    const emailAddress = action.payload;
    const res = yield verifyAccount(emailAddress);
    if (res && res.data.success) {
        yield put(verifyAccountReducer(1));
        console.log("SUCCESS: Successfully verified account.");
    } else {
        yield put(verifyAccountReducer(0));
        console.error("ERROR: Failed to verify account.");
    }
}

function* resetVerifyAccountSaga() {
    yield put(resetVerifyAccountReducer());
}

function* updateProfileSaga(action) {
    const {
        currentUsername,
        username,
        emailAddress,
        profileAvatar,
        identity,
        age,
        about,
        newPassword,
        links
    } = action.payload;
    const res = yield updateProfile(
        currentUsername,
        username,
        emailAddress,
        profileAvatar,
        identity,
        age,
        about,
        newPassword,
        links
    );
    if (res && res.data.success) {
        const user = res.data.user;
        yield put(updateProfileReducer({
            status: 1,
            user: user
        }));
        console.log("SUCCESS: Successfully updated profile.");
    } else {
        yield put(updateProfileReducer({
            status: 0,
            user: undefined
        }));
        console.error("ERROR: Failed to update profile.");
    }
}

function* resetUpdateProfileSaga() {
    yield put(resetUpdateProfileReducer());
}

function* addActivitySaga(action) {
    const { status, activityId } = action.payload;
    if (status === 1) {
        yield put(addActivityReducer({
            status: 1,
            activityId: activityId
        }));
    } else {
        yield put(addActivityReducer({
            status: 0,
            activityId: undefined
        }));
    }
}

function* resetAddActivitySaga() {
    yield put(resetAddActivityReducer());
}

function* deleteActivitySaga(action) {
    const { status, activityId } = action.payload;
    if (status === 1) {
        yield put(deleteActivityReducer({
            status: 1,
            activityId: activityId
        }));
    } else {
        yield put(deleteActivityReducer({
            status: 0,
            activityId: undefined
        }));
    }
}

function* resetDeleteActivitySaga() {
    yield put(resetDeleteActivityReducer());
}

function* commentSaga(action) {
    const { status, commentId } = action.payload;
    if (status === 1) {
        yield put(commentReducer({
            status: 1,
            commentId: commentId
        }));
    } else {
        yield put(commentReducer({
            status: 0,
            commentId: undefined
        }));
    }
}

function* resetCommentSaga() {
    yield put(resetCommentReducer());
}

function* deleteCommentSaga(action) {
    const { status, commentId } = action.payload;
    if (status === 1) {
        yield put(deleteCommentReducer({
            status: 1,
            commentId: commentId
        }));
    } else {
        yield put(deleteCommentReducer({
            status: 0,
            commentId: undefined
        }));
    }
}

function* resetDeleteCommentSaga() {
    yield put(resetDeleteCommentReducer());
}

function* addDreamSaga(action) {
    const { status, dreamId } = action.payload;
    if (status === 1) {
        yield put(addDreamReducer({
            status: 1,
            dreamId: dreamId
        }));
    } else {
        yield put(addDreamReducer({
            status: 0,
            dreamId: undefined
        }));
    }
}

function* resetAddDreamSaga() {
    yield put(resetAddDreamReducer());
}

function* deleteDreamSaga(action) {
    const { status, dreamId } = action.payload;
    if (status === 1) {
        yield put(deleteDreamReducer({
            status: 1,
            dreamId: dreamId
        }));
    } else {
        yield put(deleteDreamReducer({
            status: 0,
            dreamId: undefined
        }));
    }
}

function* resetDeleteDreamSaga() {
    yield put(resetDeleteDreamReducer());
}

function* addInterestSaga(action) {
    const { status, interestName } = action.payload;
    if (status === 1) {
        yield put(addInterestReducer({
            status: 1,
            interestName: interestName
        }));
    } else {
        yield put(addInterestReducer({
            status: 0,
            interestName: undefined
        }));
    }
}

function* resetAddInterestSaga() {
    yield put(resetAddInterestReducer());
}

function* deleteInterestSaga(action) {
    const { status, interestName } = action.payload;
    if (status === 1) {
        yield put(deleteInterestReducer({
            status: 1,
            interestName: interestName
        }));
    } else {
        yield put(deleteInterestReducer({
            status: 0,
            interestName: undefined
        }));
    }
}

function* resetDeleteInterestSaga() {
    yield put(resetDeleteInterestReducer());
}

function* addMomentSaga(action) {
    const { status, momentId } = action.payload;
    if (status === 1) {
        yield put(addMomentReducer({
            status: 1,
            momentId: momentId
        }));
    } else {
        yield put(addMomentReducer({
            status: 0,
            momentId: undefined
        }));
    }
}

function* resetAddMomentSaga() {
    yield put(resetAddMomentReducer());
}

function* deleteMomentSaga(action) {
    const { status, momentId } = action.payload;
    if (status === 1) {
        yield put(deleteMomentReducer({
            status: 1,
            momentId: momentId
        }));
    } else {
        yield put(deleteMomentReducer({
            status: 0,
            momentId: undefined
        }));
    }
}

function* resetDeleteMomentSaga() {
    yield put(resetDeleteMomentReducer());
}

function* addPostSaga(action) {
    const { status, postId } = action.payload;
    if (status === 1) {
        yield put(addPostReducer({
            status: 1,
            postId: postId
        }));
    } else {
        yield put(addPostReducer({
            status: 0,
            postId: undefined
        }));
    }
}

function* resetAddPostSaga() {
    yield put(resetAddPostReducer());
}

function* deletePostSaga(action) {
    const { status, postId } = action.payload;
    if (status === 1) {
        yield put(deletePostReducer({
            status: 1,
            postId: postId
        }));
    } else {
        yield put(deletePostReducer({
            status: 0,
            postId: undefined
        }));
    }
}

function* resetDeletePostSaga() {
    yield put(resetDeletePostReducer());
}

function* addStorySaga(action) {
    const { status, storyId } = action.payload;
    if (status === 1) {
        yield put(addStoryReducer({
            status: 1,
            storyId: storyId
        }));
    } else {
        yield put(addStoryReducer({
            status: 0,
            storyId: undefined
        }));
    }
}

function* resetAddStorySaga() {
    yield put(resetAddStoryReducer());
}

function* deleteStorySaga(action) {
    const { status, storyId } = action.payload;
    if (status === 1) {
        yield put(deleteStoryReducer({
            status: 1,
            storyId: storyId
        }));
    } else {
        yield put(deleteStoryReducer({
            status: 0,
            storyId: undefined
        }));
    }
}

function* resetDeleteStorySaga() {
    yield put(resetDeleteStoryReducer());
}

function* addTrophySaga(action) {
    const { status, trophyId } = action.payload;
    if (status === 1) {
        yield put(addTrophyReducer({
            status: 1,
            trophyId: trophyId
        }));
    } else {
        yield put(addTrophyReducer({
            status: 0,
            trophyId: undefined
        }));
    }
}

function* resetAddTrophySaga() {
    yield put(resetAddTrophyReducer());
}

function* deleteTrophySaga(action) {
    const { status, trophyId } = action.payload;
    if (status === 1) {
        yield put(deleteTrophyReducer({
            status: 1,
            trophyId: trophyId
        }));
    } else {
        yield put(deleteTrophyReducer({
            status: 0,
            trophyId: undefined
        }));
    } 
}

function* resetDeleteTrophySaga() {
    yield put(resetDeleteTrophyReducer());
}

function* followSaga(action) {
    const { 
        followerUsername, 
        followedUsername
    } = action.payload;
    const res = yield follow(
        followerUsername, 
        followedUsername
    );
    if (res && res.data.success) {
        yield put(followReducer({
            status: 1,
            followedUsername: followedUsername
        }));
        console.log(`SUCCESS: ${followerUsername} successfully followed ${followedUsername}.`);
    } else {
        yield put(followReducer({
            status: 0,
            followedUsername: undefined
        }));
        console.log(`ERROR: ${followerUsername} failed to follow ${followedUsername}.`);
    }
}

function* resetFollowSaga() {
    yield put(resetFollowReducer());
}

function* fetchFollowersSaga(action) {
    const username = action.payload;
    const res = yield getFollowers(username);
    if (res && res.data.success) {
        const followers = res.data.followers;
        yield put(fetchFollowersReducer({
            status: 1,
            followers: followers
        }));
        console.log("SUCCESS: Successfully fetched followers for user.");
    } else {
        yield put(fetchFollowersReducer({
            status: 0,
            followers: undefined
        }));
        console.error("ERROR: Failed fetch followers for user.");
    }
}

function* resetFetchFollowersSaga() {
    yield put(resetFetchFollowersReducer());
}

function* fetchMoreFollowersSaga(action) {
    const {
        username,
        prevFetchedFollowerUsernames
    } = action.payload;
    const res = yield getMoreFollowers(
        username,
        prevFetchedFollowerUsernames
    );
    if (res && res.data.success) {
        const followers = res.data.followers;
        yield put(fetchMoreFollowersReducer({
            status: 1,
            followers: followers
        }));
        console.log("SUCCESS: Successfully fetched more followers for user.");
    } else{
        yield put(fetchMoreFollowersReducer({
            status: 0,
            followers: undefined
        }));
        console.error("ERROR: Failed to fetch more followers for user.");
    }
}

function* resetFetchMoreFollowersSaga() {
    yield put(resetFetchMoreFollowersReducer());
}

function* fetchFollowingsSaga(action) {
    const username = action.payload;
    const res = yield getFollowings(username);
    if (res && res.data.success) {
        const followings = res.data.followings;
        yield put(fetchFollowingsReducer({
            status: 1,
            followings: followings
        }));
        console.log("SUCCESS: Successfully fetched the followings for user.");
    } else {
        yield put(fetchFollowingsReducer({
            status: 0,
            followings: undefined
        }));
        console.error("ERROR: Failed to fetch the followings for user.");
    }
}

function* resetFetchFollowingsSaga() {
    yield put(resetFetchFollowingsReducer());
}

function* fetchMoreFollowingsSaga(action) {
    const {
        username,
        prevFetchedFollowingUsernames
    } = action.payload;
    const res = yield getMoreFollowings(
        username,
        prevFetchedFollowingUsernames
    );
    if (res && res.data.success) {
        const followings = res.data.followings;
        yield put(fetchMoreFollowingsReducer({
            status: 1,
            followings: followings
        }));
        console.log("SUCCESS: Successfully fetched more followings for user.");
    } else {
        yield put(fetchMoreFollowingsReducer({
            status: 0,
            followings: undefined
        }));
        console.error("ERROR: Failed to fetch more followings for user.");
    }
}

function* resetFetchMoreFollowingsSaga() {
    yield put(resetFetchMoreFollowingsReducer());
}

function* unfollowSaga(action) {
    const {
        followerUsername, 
        followedUsername
    } = action.payload;
    const res = yield unfollow(
        followerUsername, 
        followedUsername
    );
    if (res && res.data.success) {
        yield put(unfollowReducer({
            status: 1,
            followedUsername: followedUsername
        }));
        console.log(`SUCCESS: ${followerUsername} successfully unfollowed ${followedUsername}.`);
    } else {
        yield put(unfollowReducer({
            status: 0,
            followedUsername: undefined
        }));
        console.log(`ERROR: ${followerUsername} failed to unfollow ${followedUsername}.`);
    }
}

function* resetUnfollowSaga() {
    yield put(resetUnfollowReducer());
}

function* watchStorySaga(action) {
    const { status, storyId } = action.payload;
    if (status === 1) {
        yield put(watchStoryReducer({
            status: 1,
            storyId: storyId
        }));
    } else {
        yield put(watchStoryReducer({
            status: 0,
            storyId: undefined
        }));
    }
}

function* resetWatchStorySaga() {
    yield put(resetWatchStoryReducer());
}

function* unwatchStorySaga(action) {
    const { status, storyId } = action.payload;
    if (status === 1) {
        yield put(unwatchStoryReducer({
            status: 1,
            storyId: storyId
        }));
    } else {
        yield put(unwatchStoryReducer({
            status: 0,
            storyId: undefined
        }));
    }
}

function* resetUnwatchStorySaga() {
    yield put(resetUnwatchStoryReducer());
}

function* deleteAccountSaga(action) {
    const username = action.payload;
    deleteAccount(username);
}

function* doesUserExistSaga(action) {
    const { emailAddress, username } = action.payload;
    const res = yield doesUserExist(emailAddress, username);
    if (res && res.data.success) {
        const exists = res.data.exists;
        if (exists) { yield put(doesUserExistReducer(1)); }
        else { yield put(doesUserExistReducer(2)); }
    } else {
        yield put(doesUserExistReducer(0));
    }
}

function* resetDoesUserExistSaga() {
    yield put(resetDoesUserExistReducer());
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenSearch() {
    yield takeEvery("user/search", searchSaga);
}

export function* listenResetSearch() {
    yield takeEvery("user/resetSearch", resetSearchSaga);
}

export function* listenSearchUsersWithInterestX() {
    yield takeEvery("user/searchUsersWithInterestX", searchUsersWithInterestXSaga);
}

export function* listenResetSearchUsersWithInterestX() {
    yield takeEvery("user/resetSearchUsersWithInterestX", resetSearchUsersWithInterestXSaga);
}

export function* listenSearchMoreUsersWithInterestX() {
    yield takeEvery("user/searchMoreUsersWithInterestX", searchMoreUsersWithInterestXSaga);
}

export function* listenResetSearchMoreUsersWithInterestX() {
    yield takeEvery("user/resetSearchMoreUsersWithInterestX", resetSearchMoreUsersWithInterestXSaga);
}

export function* listenFetchMutualInterestsUsers() {
    yield takeEvery("user/fetchMutualInterestsUsers", fetchMutualInterestsUsersSaga);
}

export function* listenResetFetchMutualInterestsUsers() {
    yield takeEvery("user/resetFetchMutualInterestsUsers", resetFetchMutualInterestsUsersSaga);
}

export function* listenLogin() {
    yield takeEvery("user/login", loginSaga);
}

export function* listenResetLogin() {
    yield takeEvery("user/resetLogin", resetLoginSaga);
}

export function* listenSignUp() {
    yield takeEvery("user/signUp", signUpSaga);
}

export function* listenResetSignUp() {
    yield takeEvery("user/resetSignUp", resetSignUpSaga);
}

export function* listenVerifyAccount() {
    yield takeEvery("user/verifyAccount", verifyAccountSaga);
}

export function* listenResetVerifyAccount() {
    yield takeEvery("user/resetVerifyAccount", resetVerifyAccountSaga);
}

export function* listenUpdateProfile() {
    yield takeEvery("user/updateProfile", updateProfileSaga);
}

export function* listenResetUpdateProfile() {
    yield takeEvery("user/resetUpdateProfile", resetUpdateProfileSaga);
}

export function* listenAddActivity() {
    yield takeEvery("user/addActivity", addActivitySaga);
}

export function* listenResetAddActivity() {
    yield takeEvery("user/resetAddActivity", resetAddActivitySaga);
}

export function* listenDeleteActivity() {
    yield takeEvery("user/deleteActivity", deleteActivitySaga);
}

export function* listenResetDeleteActivity() {
    yield takeEvery("user/resetDeleteActivity", resetDeleteActivitySaga);
}

export function* listenComment() {
    yield takeEvery("user/comment", commentSaga);
}

export function* listenResetComment() {
    yield takeEvery("user/resetComment", resetCommentSaga);
}

export function* listenDeleteComment() {
    yield takeEvery("user/deleteComment", deleteCommentSaga);
}

export function* listenResetDeleteComment() {
    yield takeEvery("user/resetDeleteComment", resetDeleteCommentSaga);
}

export function* listenAddDream() {
    yield takeEvery("user/addDream", addDreamSaga);
}

export function* listenResetAddDream() {
    yield takeEvery("user/resetAddDream", resetAddDreamSaga);
}

export function* listenDeleteDream() {
    yield takeEvery("user/deleteDream", deleteDreamSaga);
}

export function* listenResetDeleteDream() {
    yield takeEvery("user/resetDeleteDream", resetDeleteDreamSaga);
}

export function* listenAddInterest() {
    yield takeEvery("user/addInterest", addInterestSaga);
}

export function* listenResetAddInterest() {
    yield takeEvery("user/resetAddInterest", resetAddInterestSaga);
}

export function* listenDeleteInterest() {
    yield takeEvery("user/deleteInterest", deleteInterestSaga);
}

export function* listenResetDeleteInterest() {
    yield takeEvery("user/resetDeleteInterest", resetDeleteInterestSaga);
}

export function* listenAddMoment() {
    yield takeEvery("user/addMoment", addMomentSaga);
}

export function* listenResetAddMoment() {
    yield takeEvery("user/resetAddMoment", resetAddMomentSaga);
}

export function* listenDeleteMoment() {
    yield takeEvery("user/deleteMoment", deleteMomentSaga);
}

export function* listenResetDeleteMoment() {
    yield takeEvery("user/resetDeleteMoment", resetDeleteMomentSaga);
}

export function* listenAddPost() {
    yield takeEvery("user/addPost", addPostSaga);
}

export function* listenResetAddPost() {
    yield takeEvery("user/resetAddPost", resetAddPostSaga);
}

export function* listenDeletePost() {
    yield takeEvery("user/deletePost", deletePostSaga);
}

export function* listenResetDeletePost() {
    yield takeEvery("user/resetDeletePost", resetDeletePostSaga);
}

export function* listenAddStory() {
    yield takeEvery("user/addStory", addStorySaga);
}

export function* listenResetAddStory() {
    yield takeEvery("user/resetAddStory", resetAddStorySaga);
}

export function* listenDeleteStory() {
    yield takeEvery("user/deleteStory", deleteStorySaga);
}

export function* listenResetDeleteStory() {
    yield takeEvery("user/resetDeleteStory", resetDeleteStorySaga);
}

export function* listenAddTrophy() {
    yield takeEvery("user/addTrophy", addTrophySaga);
}

export function* listenResetAddTrophy() {
    yield takeEvery("user/resetAddTrophy", resetAddTrophySaga);
}

export function* listenDeleteTrophy() {
    yield takeEvery("user/deleteTrophy", deleteTrophySaga);
}

export function* listenResetDeleteTrophy() {
    yield takeEvery("user/resetDeleteTrophy", resetDeleteTrophySaga);
}

export function* listenFollow() {
    yield takeEvery("user/follow", followSaga);
}

export function* listenResetFollow() {
    yield takeEvery("user/resetFollow", resetFollowSaga);
}

export function* listenFetchFollowers() {
    yield takeEvery("user/fetchFollowers", fetchFollowersSaga);
}

export function* listenResetFetchFollowers() {
    yield takeEvery("user/resetFetchFollowers", resetFetchFollowersSaga);
}

export function* listenFetchMoreFollowers() {
    yield takeEvery("user/fetchMoreFollowers", fetchMoreFollowersSaga);
}

export function* listenResetFetchMoreFollowers() {
    yield takeEvery("user/resetFetchMoreFollowers", resetFetchMoreFollowersSaga);
}

export function* listenFetchFollowings() {
    yield takeEvery("user/fetchFollowings", fetchFollowingsSaga);
}

export function* listenResetFetchFollowings() {
    yield takeEvery("user/resetFetchFollowings", resetFetchFollowingsSaga);
}

export function* listenFetchMoreFollowings() {
    yield takeEvery("user/fetchMoreFollowings", fetchMoreFollowingsSaga);
}

export function* listenResetFetchMoreFollowings() {
    yield takeEvery("user/resetFetchMoreFollowings", resetFetchMoreFollowingsSaga);
}

export function* listenUnfollow() {
    yield takeEvery("user/unfollow", unfollowSaga);
}

export function* listenResetUnfollow() {
    yield takeEvery("user/resetUnfollow", resetUnfollowSaga);
}

export function* listenWatchStory() {
    yield takeEvery("user/watchStory", watchStorySaga);
}

export function* listenResetWatchStory() {
    yield takeEvery("user/resetWatchStory", resetWatchStorySaga);
}

export function* listenUnwatchStory() {
    yield takeEvery("user/unwatchStory", unwatchStorySaga);
}

export function* listenResetUnwatchStory() {
    yield takeEvery("user/resetUnwatchStory", resetUnwatchStorySaga);
}

export function* listenDeleteAccount() {
    yield takeEvery("user/deleteAccount", deleteAccountSaga);
}

export function* listenDoesUserExist() {
    yield takeEvery("user/doesUserExist", doesUserExistSaga);
}

export function* listenResetDoesUserExist() {
    yield takeEvery("user/resetDoesUserExist", resetDoesUserExistSaga);
}
////////////////////////////////////////////////////////////////////////