////////////////////////////// Import dependencies //////////////////////////////
import {
    get,
    update,
    create,
    deleteView
} from "../../apis/view.api";

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
} from "../slices/view.slice";
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Middleware ///////////////////////////////
function* fetchSaga(action) {
    const username = action.payload;
    const res = yield get(username);
    if (res && res.data.success) {
        const views = res.data.views;
        yield put(fetchReducer({
            status: 1,
            views: views
        }));
        console.log("SUCCESS: Successfully fetched views.");
    } else {
        yield put(fetchReducer({
            status: 0,
            views: undefined
        }));
        console.error("ERROR: Failed to fetch views.");
    }
}

function* resetFetchSaga() {
    yield put(resetFetchReducer());
}

function* updateSaga(action) {
    const {
        viewId, 
        members
    } = action.payload;
    const res = yield update(
        viewId, 
        members
    );
    if (res && res.data.success) {
        const view = res.data.view;
        yield put(updateReducer({
            status: 1,
            view: view
        }));
        console.log("SUCCESS: Successfully updated view.");
    } else {
        yield put(updateReducer({
            status: 0,
            view: undefined
        }));
        console.error("ERROR: Failed to update view.");
    }
}

function* resetUpdateSaga() {
    yield put(resetUpdateReducer());
}

function* createSaga(action) {
    const {
        id, 
        username, 
        members
    } = action.payload;
    const res = yield create(
        id, 
        username, 
        members
    );
    if (res && res.data.success) {
        const view = res.data.view;
        yield put(createReducer({
            status: 1,
            view: view
        }));
        console.log("SUCCESS: Successfully created view.");
    } else {
        yield put(createReducer({
            status: 0,
            view: undefined
        }));
        console.error("ERROR: Failed to create view.");
    }
}

function* resetCreateSaga() {
    yield put(resetCreateReducer());
}

function* deleteSaga(action) {
    const viewId = action.payload;
    const res = yield deleteView(viewId);
    if (res && res.data.success) {
        yield put(deleteReducer({
            status: 1,
            viewId: viewId
        }));
        console.log("SUCCESS: Successfully deleted view.");
    } else {
        yield put(deleteReducer({
            status: 0,
            viewId: undefined
        }));
        console.error("ERROR: Failed to delete view.");
    }
}

function* resetDeleteSaga() {
    yield put(resetDeleteReducer());
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("view/fetch", fetchSaga);
}

export function* listenResetFetch() {
    yield takeEvery("view/resetFetch", resetFetchSaga);
}

export function* listenUpdate() {
    yield takeEvery("view/update", updateSaga);
}

export function* listenResetUpdate() {
    yield takeEvery("view/resetUpdate", resetUpdateSaga);
}

export function* listenCreate() {
    yield takeEvery("view/create", createSaga);
}

export function* listenResetCreate() {
    yield takeEvery("view/resetCreate", resetCreateSaga);
}

export function* listenDelete() {
    yield takeEvery("view/delete", deleteSaga);
}

export function* listenResetDelete() {
    yield takeEvery("view/resetDelete", resetDeleteSaga);
}
/////////////////////////////////////////////////////////////////////////