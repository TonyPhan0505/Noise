////////////////////////////// Import dependencies //////////////////////////////
import {
    get,
    getMore,
    create,
    hide
} from "../../apis/notification.api";

import {
    takeEvery,
    put
} from 'redux-saga/effects';

import {
    fetchReducer,
    resetFetchReducer,
    fetchMoreReducer,
    resetFetchMoreReducer,
    createReducer,
    resetCreateReducer,
    hideReducer,
    resetHideReducer
} from "../slices/notification.slice";
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Middleware ///////////////////////////////
function* fetchSaga(action) {
    const username = action.payload;
    const res = yield get(username);
    if (res && res.data.success) {
        const notifications = res.data.notifications;
        yield put(fetchReducer({
            status: 1,
            notifications: notifications
        }));
        console.log("SUCCESS: Successfully fetched notifications.");
    } else {
        yield put(fetchReducer({
            status: 0,
            notifications: undefined
        }));
        console.error("ERROR: Failed to fetch notifications.");
    }
}

function* resetFetchSaga() {
    yield put(resetFetchReducer());
}

function* fetchMoreSaga(action) {
    const {
        username,
        prevFetchedNotiIds
    } = action.payload;
    const res = yield getMore(
        username,
        prevFetchedNotiIds
    );
    if (res && res.data.success) {
        const notifications = res.data.notifications;
        yield put(fetchMoreReducer({
            status: 1,
            notifications: notifications
        }));
        console.log("SUCCESS: Successfully fetched more notifications.");
    } else {
        yield put(fetchMoreReducer({
            status: 0,
            notifications: undefined
        }));
        console.error("ERROR: Failed to fetch more notifications.");
    }
}

function* resetFetchMoreSaga() {
    yield put(resetFetchMoreReducer());
}

function* createSaga(action) {
    const {
        id, 
        notiType, 
        itemId, 
        username, 
        year, 
        month, 
        day, 
        hour, 
        minute
    } = action.payload;
    const res = yield create(
        id, 
        notiType, 
        itemId, 
        username, 
        year, 
        month, 
        day, 
        hour, 
        minute
    );
    if (res && res.data.success) {
        yield put(createReducer(1));
        console.log("SUCCESS: Successfully fetched notifications.");
    } else {
        yield put(createReducer(0));
        console.error("ERROR: Failed to fetch notifications.");
    }
}

function* resetCreateSaga() {
    yield put(resetCreateReducer());
}

function* hideSaga(action) {
    const {
        notiId, 
        username
    } = action.payload;
    const res = yield hide(
        notiId, 
        username
    );
    if (res && res.data.success) {
        yield put(hideReducer({
            status: 1,
            notiId: notiId
        }));
        console.log("SUCCESS: Successfully hid notification.");
    } else {
        yield put(hideReducer({
            status: 0,
            notiId: undefined
        }));
        console.error("ERROR: Failed to hide notification.");
    }
}

function* resetHideSaga() {
    yield put(resetHideReducer());
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("notification/fetch", fetchSaga);
}

export function* listenResetFetch() {
    yield takeEvery("notification/resetFetch", resetFetchSaga);
}

export function* listenFetchMore() {
    yield takeEvery("notification/fetchMore", fetchMoreSaga);
}

export function* listenResetFetchMore() {
    yield takeEvery("notification/resetFetchMore", resetFetchMoreSaga);
}

export function* listenCreate() {
    yield takeEvery("notification/create", createSaga);
}

export function* listenResetCreate() {
    yield takeEvery("notification/resetCreate", resetCreateSaga);
}

export function* listenHide() {
    yield takeEvery("notification/hide", hideSaga);
}

export function* listenResetHide() {
    yield takeEvery("notification/resetHide", resetHideSaga);
}
////////////////////////////////////////////////////////////////////////