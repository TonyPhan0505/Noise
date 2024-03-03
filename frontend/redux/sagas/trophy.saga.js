////////////////////////////// Import dependencies //////////////////////////////
import {
    get,
    search,
    searchMore,
    update,
    create,
    deleteTrophy
} from "../../apis/trophy.api";

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
    searchReducer,
    resetSearchReducer,
    searchMoreReducer,
    resetSearchMoreReducer
} from "../slices/trophy.slice";
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Middleware ///////////////////////////////
function* fetchSaga(action) {
    const username = action.payload;
    const res = yield get(username);
    if (res && res.data.success) {
        const trophies = res.data.trophies;
        yield put(fetchReducer({
            status: 1,
            trophies: trophies
        }));
        console.log("SUCCESS: Successfully fetched trophies.");
    } else {
        yield put(fetchReducer({
            status: 0,
            trophies: undefined
        }));
        console.error("ERROR: Failed to fetch trophies.");
    }
}

function* resetFetchSaga() {
    yield put(resetFetchReducer());
}

function* searchSaga(action) {
    const keyword = action.payload;
    const res = yield search(keyword);
    if (res && res.data.success) {
        const trophies = res.data.trophies;
        yield put(searchReducer({
            status: 1,
            trophies: trophies
        }));
        console.log("SUCCESS: Successfully searched trophies.");
    } else {
        yield put(searchReducer({
            status: 0,
            trophies: undefined
        }));
        console.error("ERROR: Failed to search trophies.");
    }
}

function* resetSearchSaga() {
    yield put(resetSearchReducer());
}

function* searchMoreSaga(action) {
    const { 
        keyword,
        prevTrophyIds
    } = action.payload;
    const res = yield searchMore(
        keyword,
        prevTrophyIds
    );
    if (res && res.data.success) {
        const trophies = res.data.trophies;
        yield put(searchMoreReducer({
            status: 1,
            trophies: trophies
        }));
        console.log("SUCCESS: Successfully searched for more trophies.");
    } else {
        yield put(searchMoreReducer({
            status: 0,
            trophies: undefined
        }));
        console.error("ERROR: Failed to search for more trophies.");
    }
}

function* resetSearchMoreSaga() {
    yield put(resetSearchMoreReducer());
}

function* updateSaga(action) {
    const {
        trophyId, 
        title, 
        media,
        writing
    } = action.payload;
    const res = yield update(
        trophyId, 
        title, 
        media,
        writing
    );
    if (res && res.data.success) {
        const trophy = res.data.trophy;
        yield put(updateReducer({
            status: 1,
            trophy: trophy
        }));
        console.log("SUCCESS: Successfully updated trophies.");
    } else {
        yield put(updateReducer({
            status: 0,
            trophy: undefined
        }));
        console.error("ERROR: Failed to update trophies.");
    }
}

function* resetUpdateSaga() {
    yield put(resetUpdateReducer());
}

function* createSaga(action) {
    const {
        trophyId, 
        title, 
        month, 
        year, 
        storyId, 
        usernames, 
        media,
        writing
    } = action.payload;
    const res = yield create(
        trophyId, 
        title, 
        month, 
        year, 
        storyId, 
        usernames, 
        media,
        writing
    );
    if (res && res.data.success) {
        const trophy = res.data.trophy;
        yield put(createReducer({
            status: 1,
            trophy: trophy
        }));
        console.log("SUCCESS: Successfully created trophy.");
    } else {
        yield put(createReducer({
            status: 0,
            trophy: undefined
        }));
        console.error("ERROR: Failed to create trophy.");
    }
}

function* resetCreateSaga() {
    yield put(resetCreateReducer());
}

function* deleteSaga(action) {
    const trophyId = action.payload;
    const res = yield deleteTrophy(trophyId);
    if (res && res.data.success) {
        yield put(deleteReducer({
            status: 1,
            trophyId: trophyId
        }));
        console.log("SUCCESS: Successfully deleted trophy.");
    } else {
        yield put(deleteReducer({
            status: 0,
            trophyId: undefined
        }));
        console.error("ERROR: Failed to delete trophy.");
    }
}

function* resetDeleteSaga() {
    yield put(resetDeleteReducer());
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("trophy/fetch", fetchSaga);
}

export function* listenResetFetch() {
    yield takeEvery("trophy/resetFetch", resetFetchSaga);
}

export function* listenSearch() {
    yield takeEvery("trophy/search", searchSaga);
}

export function* listenResetSearch() {
    yield takeEvery("trophy/resetSearch", resetSearchSaga);
}

export function* listenSearchMore() {
    yield takeEvery("trophy/searchMore", searchMoreSaga);
}

export function* listenResetSearchMore() {
    yield takeEvery("trophy/resetSearchMore", resetSearchMoreSaga);
}

export function* listenUpdate() {
    yield takeEvery("trophy/update", updateSaga);
}

export function* listenResetUpdate() {
    yield takeEvery("trophy/resetUpdate", resetUpdateSaga);
}

export function* listenCreate() {
    yield takeEvery("trophy/create", createSaga);
}

export function* listenResetCreate() {
    yield takeEvery("trophy/resetCreate", resetCreateSaga);
}

export function* listenDelete() {
    yield takeEvery("trophy/delete", deleteSaga);
}

export function* listenResetDelete() {
    yield takeEvery("trophy/resetDelete", resetDeleteSaga);
}
////////////////////////////////////////////////////////////////////////