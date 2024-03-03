////////////////////////////// Import dependencies //////////////////////////////
import {
    get,
    getMore,
    update,
    create,
    deleteComment,
    like,
    unlike
} from "../../apis/comment.api";

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
    createReduce,
    resetCreateReducer,
    deleteReducer,
    resetDeleteReducer,
    likeReducer,
    resetLikeReducer,
    unlikeReducer,
    resetUnlikeReducer
} from "../slices/comment.slice";
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Middleware ///////////////////////////////
function* fetchSaga(action) {
    const { 
        itemId, 
        itemType 
    } = action.payload;
    const res = yield get(
        itemId, 
        itemType
    );
    if (res && res.data.success) {
        const comments = res.data.comments;
        yield put(fetchReducer({
            status: 1,
            comments: comments
        }));
        console.log("SUCCESS: Successfully fetched comments.");
    } else {
        yield put(fetchReducer({
            status: 0,
            comments: undefined
        }));
        console.error("ERROR: Failed to fetch comments.");
    }
}

function* resetFetchSaga() {
    yield put(resetFetchReducer());
}

function* fetchMoreSaga(action) {
    const { 
        itemId, 
        itemType,
        prevFetchedCommentIds
    } = action.payload;
    const res = yield getMore(
        itemId, 
        itemType,
        prevFetchedCommentIds
    );
    if (res && res.data.success) {
        const comments = res.data.comments;
        yield put(fetchMoreReducer({
            status: 1,
            comments: comments
        }));
        console.log("SUCCESS: Successfully fetched more comments.");
    } else {
        yield put(fetchMoreReducer({
            status: 0,
            comments: undefined
        }));
        console.error("ERROR: Failed to fetch more comments.");
    }
}

function* resetFetchMoreSaga() {
    yield put(resetFetchMoreReducer());
}

function* updateSaga(action) {
    const {
        commentId, 
        writing
    } = action.payload;
    const res = yield update(
        commentId, 
        writing
    );
    if (res && res.data.success) {
        const comment = res.data.comment;
        yield put(updateReducer({
            status: 1,
            comment: comment
        }));
        console.log("SUCCESS: Successfully updated comment.");
    } else {
        yield put(updateReducer({
            status: 0,
            comment: undefined
        }));
        console.error("ERROR: Failed to update comment.");
    }
}

function* resetUpdateSaga() {
    yield put(resetUpdateReducer());
}

function* createSaga(action) {
    const {
        commentId, 
        username, 
        writing, 
        year, 
        month, 
        day, 
        hour, 
        minute, 
        hostId, 
        hostType, 
        parentCommentId
    } = action.payload;
    const res = yield create(
        commentId, 
        username, 
        writing, 
        year, 
        month, 
        day, 
        hour, 
        minute, 
        hostId, 
        hostType, 
        parentCommentId
    );
    if (res && res.data.success) {
        const comment = res.data.comment;
        yield put(createReduce({
            status: 1,
            comment: comment
        }));
        console.log("SUCCESS: Successfully created comment.");
    } else {
        yield put(createReduce({
            status: 0,
            comment: undefined
        }));
        console.error("ERROR: Failed to create comment.");
    }
}

function* resetCreateSaga() {
    yield put(resetCreateReducer());
}

function* deleteSaga(action) {
    const {
        commentId, 
        hostId, 
        hostType, 
        username
    } = action.payload;
    const res = yield deleteComment(
        commentId, 
        hostId, 
        hostType, 
        username
    );
    if (res && res.data.success) {
        yield put(deleteReducer({
            status: 1,
            commentId: commentId
        }));
        console.log("SUCCESS: Successfully deleted comment.");
    } else {
        yield put(deleteReducer({
            status: 0,
            commentId: undefined
        }));
        console.error("ERROR: Failed to delete comment.");
    }
}

function* resetDeleteSaga() {
    yield put(resetDeleteReducer());
}

function* likeSaga(action) {
    const {
        commentId, 
        username
    } = action.payload;
    const res = yield like(
        commentId, 
        username
    );
    if (res && res.data.success) {
        yield put(likeReducer({
            status: 1,
            commentId: commentId,
            username: username
        }));
        console.log("SUCCESS: Successfully liked comment.");
    } else {
        yield put(likeReducer({
            status: 0,
            commentId: undefined,
            username: undefined
        }));
        console.error("ERROR: Failed to like comment.");
    }
}

function* resetLikeSaga() {
    yield put(resetLikeReducer());
}

function* unlikeSaga(action) {
    const {
        commentId, 
        username
    } = action.payload;
    const res = yield unlike(
        commentId, 
        username
    );
    if (res && res.data.success) {
        yield put(unlikeReducer({
            status: 1,
            commentId: commentId,
            username: username
        }));
        console.log("SUCCESS: Successfully unliked comment.");
    } else {
        yield put(unlikeReducer({
            status: 0,
            commentId: undefined,
            username: undefined
        }));
        console.error("ERROR: Failed to unlike comment.");
    }
}

function* resetUnlikeSaga() {
    yield put(resetUnlikeReducer());
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("comment/fetch", fetchSaga);
}

export function* listenResetFetch() {
    yield takeEvery("comment/resetFetch", resetFetchSaga);
}

export function* listenFetchMore() {
    yield takeEvery("comment/fetchMore", fetchMoreSaga);
}

export function* listenResetFetchMore() {
    yield takeEvery("comment/resetFetchMore", resetFetchMoreSaga);
}

export function* listenUpdate() {
    yield takeEvery("comment/update", updateSaga);
}

export function* listenResetUpdate() {
    yield takeEvery("comment/resetUpdate", resetUpdateSaga);
}

export function* listenCreate() {
    yield takeEvery("comment/create", createSaga);
}

export function* listenResetCreate() {
    yield takeEvery("comment/resetCreate", resetCreateSaga);
}

export function* listenDelete() {
    yield takeEvery("comment/delete", deleteSaga);
}

export function* listenResetDelete() {
    yield takeEvery("comment/resetDelete", resetDeleteSaga);
}

export function* listenLike() {
    yield takeEvery("comment/like", likeSaga);
}

export function* listenResetLike() {
    yield takeEvery("comment/resetLike", resetLikeSaga);
}

export function* listenUnlike() {
    yield takeEvery("comment/unlike", unlikeSaga);
}

export function* listenResetUnlike() {
    yield takeEvery("comment/resetUnlike", resetUnlikeSaga);
}
////////////////////////////////////////////////////////////////////////