////////////////////////////// Import dependencies //////////////////////////////
import {
    get,
    update,
    create,
    deleteMoment,
    like,
    unlike
} from "../../apis/moment.api";

import {
    takeEvery,
    put
} from 'redux-saga/effects';

import {
    fetchReducer,
    resetFetchReducer,
    updateReducer,
    resetUpdateReducer,
    createReducer,
    resetCreateReducer,
    deleteReducer,
    resetDeleteReducer,
    likeReducer,
    resetLikeReducer,
    unlikeReducer,
    resetUnlikeReducer
} from "../slices/moment.slice";
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Middleware ///////////////////////////////
function* fetchSaga(action) {
    const username = action.payload;
    const res = yield get(username);
    if (res && res.data.success) {
        const moments = res.data.moments;
        yield put(fetchReducer({
            status: 1,
            moments: moments
        }));
        console.log("SUCCESS: Successfully fetched moments.");
    } else {
        yield put(fetchReducer({
            status: 0,
            moments: undefined
        }));
        console.error("ERROR: Failed to fetch moments.");
    }
}

function* resetFetchSaga() {
    yield put(resetFetchReducer());
}

function* updateSaga(action) {
    const {
        momentId, 
        writing, 
        media, 
        mediaTypes
    } = action.payload;
    const res = yield update(
        momentId, 
        writing, 
        media, 
        mediaTypes
    );
    if (res && res.data.success) {
        const moment = res.data.moment;
        yield put(updateReducer({
            status: 1,
            moment: moment
        }));
        console.log("SUCCESS: Successfully updated moment.");
    } else {
        yield put(updateReducer({
            status: 0,
            moment: undefined
        }));
        console.error("ERROR: Failed to update moment.");
    }
}

function* resetUpdateSaga() {
    yield put(resetUpdateReducer());
}

function* createSaga(action) {
    const {
        momentId, 
        username, 
        year, 
        month, 
        day, 
        hour, 
        minute, 
        writing, 
        media, 
        mediaTypes
    } = action.payload;
    const res = yield create(
        momentId, 
        username, 
        year, 
        month, 
        day, 
        hour, 
        minute, 
        writing, 
        media, 
        mediaTypes
    );
    if (res && res.data.success) {
        const moment = res.data.moment;
        yield put(createReducer({
            status: 1,
            moment: moment
        }));
        console.log("SUCCESS: Successfully created moment.");
    } else {
        yield put(createReducer({
            status: 0,
            moment: undefined
        }));
        console.error("ERROR: Failed to create moment.");
    }
}

function* resetCreateSaga() {
    yield put(resetCreateReducer());
}

function* deleteSaga(action) {
    const momentId = action.payload;
    const res = yield deleteMoment(momentId);
    if (res && res.data.success) {
        yield put(deleteReducer({
            status: 1,
            momentId: momentId
        }));
        console.log("SUCCESS: Successfully deleted moment.");
    } else {
        yield put(deleteReducer({
            status: 0,
            momentId: undefined
        }));
        console.error("ERROR: Failed to delete moment.");
    }
}

function* resetDeleteSaga() {
    yield put(resetDeleteReducer());
}

function* likeSaga(action) {
    const {
        momentId, 
        username
    } = action.payload;
    const res = yield like(
        momentId, 
        username
    );
    if (res && res.data.success) {
        yield put(likeReducer({
            status: 1,
            momentId: momentId,
            username: username
        }));
        console.log("SUCCESS: Successfully liked moment.");
    } else {
        yield put(likeReducer({
            status: 0,
            momentId: undefined,
            username: undefined
        }));
        console.error("ERROR: Failed to like moment.");
    }
}

function* resetLikeSaga() {
    yield put(resetLikeReducer());
}

function* unlikeSaga(action) {
    const {
        momentId, 
        username
    } = action.payload;
    const res = yield unlike(
        momentId, 
        username
    );
    if (res && res.data.success) {
        yield put(unlikeReducer({
            status: 1,
            momentId: momentId,
            username: username
        }));
        console.log("SUCCESS: Successfully unliked moment.");
    } else {
        yield put(unlikeReducer({
            status: 0,
            momentId: undefined,
            username: undefined
        }));
        console.error("ERROR: Failed to unlike moment.");
    }
}

function* resetUnlikeSaga() {
    yield put(resetUnlikeReducer());
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("moment/fetch", fetchSaga);
}

export function* listenResetFetch() {
    yield takeEvery("moment/resetFetch", resetFetchSaga);
}

export function* listenUpdate() {
    yield takeEvery("moment/update", updateSaga);
}

export function* listenResetUpdate() {
    yield takeEvery("moment/resetUpdate", resetUpdateSaga);
}

export function* listenCreate() {
    yield takeEvery("moment/create", createSaga);
}

export function* listenResetCreate() {
    yield takeEvery("moment/resetCreate", resetCreateSaga);
}

export function* listenDelete() {
    yield takeEvery("moment/delete", deleteSaga);
}

export function* listenResetDelete() {
    yield takeEvery("moment/resetDelete", resetDeleteSaga);
}

export function* listenLike() {
    yield takeEvery("moment/like", likeSaga);
}

export function* listenResetLike() {
    yield takeEvery("moment/resetLike", resetLikeSaga);
}

export function* listenUnlike() {
    yield takeEvery("moment/unlike", unlikeSaga);
}

export function* listenResetUnlike() {
    yield takeEvery("moment/resetUnlike", resetUnlikeSaga);
}
////////////////////////////////////////////////////////////////////////