////////////////////////////// Import dependencies //////////////////////////////
import {
    get,
    update,
    create,
    deleteDream
} from "../../apis/dream.api";

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
    resetDeleteReducer
} from "../slices/dream.slice";
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Middleware ///////////////////////////////
function* fetchSaga(action) {
    const username = action.payload;
    const res = yield get(username);
    if (res && res.data.success) {
        const dreams = res.data.dreams;
        yield put(fetchReducer({
            status: 1,
            dreams: dreams
        }));
        console.log("SUCCESS: Successfully fetched dreams.");
    } else {
        yield put(fetchReducer({
            status: 0,
            dreams: undefined
        }));
        console.error("ERROR: Failed to fetch dreams.");
    }
}

function* resetFetchSaga() {
    yield put(resetFetchReducer());
}

function* updateSaga(action) {
    const {
        dreamId, 
        name, 
        media, 
        details, 
        status
    } = action.payload;
    const res = yield update(
        dreamId, 
        name, 
        media, 
        details, 
        status
    );
    if (res && res.data.success) {
        const dream = res.data.dream;
        yield put(updateReducer({
            status: 1,
            dream: dream
        }));
        console.log("SUCCESS: Successfully updated dream.");
    } else {
        yield put(updateReducer({
            status: 0,
            dream: undefined
        }));
        console.error("ERROR: Failed to update dream.");
    }
}

function* resetUpdateSaga() {
    yield put(resetUpdateReducer());
}

function* createSaga(action) {
    const {
        id, 
        name, 
        media, 
        details, 
        status, 
        username
    } = action.payload;
    const res = yield create(
        id, 
        name, 
        media, 
        details, 
        status, 
        username
    );
    if (res && res.data.success) {
        const dream = res.data.dream;
        yield put(createReducer({
            status: 1,
            dream: dream
        }));
        console.log("SUCCESS: Successfully created dream.");
    } else {
        yield put(createReducer({
            status: 0,
            dream: undefined
        }));
        console.error("ERROR: Failed to create dream.");
    }
}

function* resetCreateSaga() {
    yield put(resetCreateReducer());
}

function* deleteSaga(action) {
    const {
        dreamId, 
        username
    } = action.payload;
    const res = yield deleteDream(
        dreamId, 
        username
    );
    if (res && res.data.success) {
        yield put(deleteReducer({
            status: 1,
            dreamId: dreamId
        }));
        console.log("SUCCESS: Successfully deleted dream.");
    } else {
        yield put(deleteReducer({
            status: 0,
            dreamId: undefined
        }));
        console.error("ERROR: Failed to delete dream.");
    }
}

function* resetDeleteSaga() {
    yield put(resetDeleteReducer());
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("dream/fetch", fetchSaga);
}

export function* listenResetFetch() {
    yield takeEvery("dream/resetFetch", resetFetchSaga);
}

export function* listenUpdate() {
    yield takeEvery("dream/update", updateSaga);
}

export function* listenResetUpdate() {
    yield takeEvery("dream/resetUpdate", resetUpdateSaga);
}

export function* listenCreate() {
    yield takeEvery("dream/create", createSaga);
}

export function* listenResetCreate() {
    yield takeEvery("dream/resetCreate", resetCreateSaga);
}

export function* listenDelete() {
    yield takeEvery("dream/delete", deleteSaga);
}

export function* listenResetDelete() {
    yield takeEvery("dream/resetDelete", resetDeleteSaga);
}
/////////////////////////////////////////////////////////////////////////