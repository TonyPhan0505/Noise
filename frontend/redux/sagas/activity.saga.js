////////////////////////////// Import dependencies //////////////////////////////
import {
    get,
    getMore,
    update,
    create,
    deleteActivity,
    like,
    unlike
} from "../../apis/activity.api";

import {
    takeEvery,
    put
} from 'redux-saga/effects';

import {
    fetchReducer,
    resetFetchReducer,
    fetchMoreReducer,
    resetFetchMoreReducer,
    updateReducer,
    resetUpdateReducer,
    createReducer,
    resetCreateReducer,
    deleteReducer,
    resetDeleteReducer,
    addCommentReducer,
    resetAddCommentReducer,
    deleteCommentReducer,
    resetDeleteCommentReducer,
    likeReducer,
    resetLikeReducer,
    unlikeReducer,
    resetUnlikeReducer
} from "../slices/activity.slice";
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Middleware ///////////////////////////////
function* fetchSaga(action) {
    const username = action.payload;
    const res = yield get(username);
    if (res && res.data.success) {
        const activities = res.data.activities;
        yield put(fetchReducer({
            status: 1,
            activities: activities
        }));
        console.log("SUCCESS: Successfully fetched activities.");
    } else {
        yield put(fetchReducer({
            status: 0,
            activities: undefined
        }));
        console.error("ERROR: Failed to fetch activities.");
    }
}

function* resetFetchSaga() {
    yield put(resetFetchReducer());
}

function* fetchMoreSaga(action) {
    const {
        username,
        prevFetchedActivityItemIds
    } = action.payload;
    const res = yield getMore(
        username,
        prevFetchedActivityItemIds
    );
    if (res && res.data.success) {
        const activities = res.data.activities;
        yield put(fetchMoreReducer({
            status: 1,
            activities: activities
        }));
        console.log("SUCCESS: Successfully fetched more activities.");
    } else {
        yield put(fetchMoreReducer({
            status: 0,
            activities: undefined
        }));
        console.error("ERROR: Failed to fetch more activities.");
    }
}

function* resetFetchMoreSaga() {
    yield put(resetFetchMoreReducer());
}

function* updateSaga(action) {
    const { 
        activityId, 
        writing, 
        tags
    } = action.payload;
    const res = yield update(
        activityId, 
        writing, 
        tags
    );
    if (res && res.data.success) {
        const activity = res.data.activity;
        yield put(updateReducer({
            status: 1,
            activity: activity
        }));
        console.log("SUCCESS: Successfully updated activity.");
    } else {
        yield put(updateReducer({
            status: 0,
            activity: undefined
        }));
        console.error("ERROR: Failed to update activity.");
    }
}

function* resetUpdateSaga() {
    yield put(resetUpdateReducer());
}

function* createSaga(action) {
    const {
        activityId, 
        activityType, 
        year, 
        month, 
        day, 
        hour, 
        minute, 
        itemId, 
        username, 
        tags, 
        writing
    } = action.payload;
    const res = yield create(
        activityId, 
        activityType, 
        year, 
        month, 
        day, 
        hour, 
        minute, 
        itemId, 
        username, 
        tags, 
        writing
    );
    if (res && res.data.success) {
        const activity = res.data.activity;
        yield put(createReducer({
            status: 1,
            activity: activity
        }));
        console.log("SUCCESS: Successfully created activity.");
    } else {
        yield put(createReducer({
            status: 0,
            activity: undefined
        }));
        console.error("ERROR: Failed to create activity.");
    }
}

function* resetCreateSaga() {
    yield put(resetCreateReducer());
}

function* deleteSaga(action) {
    const { activityId, username } = action.payload;
    const res = yield deleteActivity(activityId, username);
    if (res && res.data.success) {
        const activityId = res.data.activityId;
        yield put(deleteReducer({
            status: 1,
            activityId: activityId
        }));
        console.log("SUCCESS: Successfully deleted activity.");
    } else {
        yield put(deleteReducer({
            status: 0,
            activityId: undefined
        }));
        console.error("ERROR: Failed to delete activity.");
    }
}

function* resetDeleteSaga() {
    yield put(resetDeleteReducer());
}

function* addCommentSaga(action) {
    const { status, activityId, commentId } = action.payload;
    if (status === 1) {
        yield put(addCommentReducer({
            status: 1,
            activityId: activityId,
            commentId: commentId
        }));
    } else {
        yield put(addCommentReducer({
            status: 0,
            activityId: undefined,
            commentId: undefined
        }));
    }
}

function* resetAddCommentSaga() {
    yield put(resetAddCommentReducer());
}

function* deleteCommentSaga(action) {
    const { status, activityId, commentId } = action.payload;
    if (status === 1) {
        yield put(deleteCommentReducer({
            status: 1,
            activityId: activityId,
            commentId: commentId
        }));
    } else {
        yield put(deleteCommentReducer({
            status: 0,
            activityId: undefined,
            commentId: undefined
        }));
    }
}

function* resetDeleteCommentSaga() {
    yield put(resetDeleteCommentReducer());
}

function* likeSaga(action) {
    const {
        activityId, 
        username
    } = action.payload;
    const res = yield like(
        activityId, 
        username
    );
    if (res && res.data.success) {
        yield put(likeReducer({
            status: 1, 
            activityId: activityId, 
            username: username
        }));
        console.log("SUCCESS: Successfully liked activity.");
    } else {
        yield put(likeReducer({
            status: 0, 
            activityId: undefined, 
            username: undefined
        }));
        console.error("ERROR: Failed to like activity.");
    }
}

function* resetLikeSaga() {
    yield put(resetLikeReducer());
}

function* unlikeSaga(action) {
    const {
        activityId, 
        username
    } = action.payload;
    const res = yield unlike(
        activityId, 
        username
    );
    if (res && res.data.success) {
        yield put(unlikeReducer({
            status: 1, 
            activityId: activityId, 
            username: username
        }));
        console.log("SUCCESS: Successfully unliked activity.");
    } else {
        yield put(unlikeReducer({
            status: 0, 
            activityId: undefined, 
            username: undefined
        }));
        console.error("ERROR: Failed to unlike activity.");
    }
}

function* resetUnlikeSaga() {
    yield put(resetUnlikeReducer());
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("activity/fetch", fetchSaga);
}

export function* listenResetFetch() {
    yield takeEvery("activity/resetFetch", resetFetchSaga);
}

export function* listenFetchMore() {
    yield takeEvery("activity/fetchMore", fetchMoreSaga);
}

export function* listenResetFetchMore() {
    yield takeEvery("activity/resetFetchMore", resetFetchMoreSaga);
}

export function* listenUpdate() {
    yield takeEvery("activity/update", updateSaga);
}

export function* listenResetUpdate() {
    yield takeEvery("activity/resetUpdate", resetUpdateSaga);
}

export function* listenCreate() {
    yield takeEvery("activity/create", createSaga);
}

export function* listenResetCreate() {
    yield takeEvery("activity/resetCreate", resetCreateSaga);
}

export function* listenDelete() {
    yield takeEvery("activity/delete", deleteSaga);
}

export function* listenResetDelete() {
    yield takeEvery("activity/resetDelete", resetDeleteSaga);
}

export function* listenAddComment() {
    yield takeEvery("activity/addComment", addCommentSaga);
}

export function* listenResetAddComment() {
    yield takeEvery("activity/resetAddComment", resetAddCommentSaga);
}

export function* listenDeleteComment() {
    yield takeEvery("activity/deleteComment", deleteCommentSaga);
}

export function* listenResetDeleteComment() {
    yield takeEvery("activity/resetDeleteComment", resetDeleteCommentSaga);
}

export function* listenLike() {
    yield takeEvery("activity/like", likeSaga);
}

export function* listenResetLike() {
    yield takeEvery("activity/resetLike", resetLikeSaga);
}

export function* listenUnlike() {
    yield takeEvery("activity/unlike", unlikeSaga);
}

export function* listenResetUnlike() {
    yield takeEvery("activity/resetUnlike", resetUnlikeSaga);
}
////////////////////////////////////////////////////////////////////////