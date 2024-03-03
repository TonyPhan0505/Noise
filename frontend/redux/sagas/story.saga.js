////////////////////////////// Import dependencies //////////////////////////////
import {
    get,
    search,
    searchMore,
    update,
    create,
    deleteStory,
    watch,
    unwatch
} from "../../apis/story.api";

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
    watchReducer,
    resetWatchReducer,
    unwatchReducer,
    resetUnwatchReducer,
    addTrophyReducer,
    resetAddTrophyReducer,
    searchReducer,
    resetSearchReducer,
    searchMoreReducer,
    resetSearchMoreReducer
} from "../slices/story.slice";
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Middleware ///////////////////////////////
function* fetchSaga(action) {
    const username = action.payload;
    const res = yield get(username);
    if (res && res.data.success) {
        const stories = res.data.stories;
        yield put(fetchReducer({
            status: 1,
            stories: stories
        }));
        console.log("SUCCESS: Successfully fetched stories.");
    } else {
        yield put(fetchReducer({
            status: 0,
            stories: undefined
        }));
        console.error("ERROR: Failed to fetch stories.");
    }
}

function* resetFetchSaga() {
    yield put(resetFetchReducer());
}

function* searchSaga(action) {
    const keyword = action.payload;
    const res = yield search(keyword);
    if (res && res.data.success) {
        const stories = res.data.stories;
        yield put(searchReducer({
            status: 1,
            stories: stories
        }));
        console.log("SUCCESS: Successfully searched stories.");
    } else {
        yield put(searchReducer({
            status: 0,
            stories: undefined
        }));
        console.error("ERROR: Failed to search stories.");
    }
}

function* resetSearchSaga() {
    yield put(resetSearchReducer());
}

function* searchMoreSaga(action) {
    const { 
        keyword,
        prevStoryIds
    } = action.payload;
    const res = yield searchMore(
        keyword,
        prevStoryIds
    );
    if (res && res.data.success) {
        const stories = res.data.stories;
        yield put(searchMoreReducer({
            status: 1,
            stories: stories
        }));
        console.log("SUCCESS: Successfully searched for more stories.");
    } else {
        yield put(searchMoreReducer({
            status: 0,
            stories: undefined
        }));
        console.error("ERROR: Failed to search for more stories.");
    }
}

function* resetSearchMoreSaga() {
    yield put(resetSearchMoreReducer());
}

function* updateSaga(action) {
    const {
        storyId, 
        type, 
        name, 
        usernames
    } = action.payload;
    const res = yield update(
        storyId, 
        type, 
        name, 
        usernames
    );
    if (res && res.data.success) {
        const story = res.data.story;
        yield put(updateReducer({
            status: 1,
            story: story
        }));
        console.log("SUCCESS: Successfully updated story.");
    } else {
        yield put(updateReducer({
            status: 0,
            story: undefined
        }));
        console.error("ERROR: Failed to update story.");
    }
}

function* resetUpdateSaga() {
    yield put(resetUpdateReducer());
}

function* createSaga(action) {
    const {
        storyId, 
        type, 
        month, 
        year, 
        name, 
        usernames
    } = action.payload;
    const res = yield create(
        storyId, 
        type, 
        month, 
        year, 
        name, 
        usernames
    );
    if (res && res.data.success) {
        const story = res.data.story;
        yield put(createReducer({
            status: 1,
            story: story
        }));
        console.log("SUCCESS: Successfully created story.");
    } else {
        yield put(createReducer({
            status: 0,
            story: undefined
        }));
        console.error("ERROR: Failed to create story.");
    }
}

function* resetCreateSaga() {
    yield put(resetCreateReducer());
}

function* deleteSaga(action) {
    const storyId = action.payload;
    const res = yield deleteStory(storyId);
    if (res && res.data.success) {
        yield put(deleteReducer({
            status: 1,
            storyId: storyId
        }));
        console.log("SUCCESS: Successfully deleted story.");
    } else {
        yield put(deleteReducer({
            status: 0,
            storyId: undefined
        }));
        console.error("ERROR: Failed to delete story.");
    }
}

function* resetDeleteSaga() {
    yield put(resetDeleteReducer());
}

function* watchSaga(action) {
    const {
        storyId, 
        username
    } = action.payload;
    const res = yield watch(
        storyId, 
        username
    );
    if (res && res.data.success) {
        yield put(watchReducer({
            status: 1,
            storyId: storyId,
            username: username
        }));
        console.log(`SUCCESS: ${username} successfully watched story`);
    } else {
        yield put(watchReducer({
            status: 0,
            storyId: undefined,
            username: undefined
        }));
        console.log(`ERROR: ${username} failed to watch story`);
    }
}

function* resetWatchSaga() {
    yield put(resetWatchReducer());
}

function* unwatchSaga(action) {
    const {
        storyId, 
        username
    } = action.payload;
    const res = yield unwatch(
        storyId, 
        username
    );
    if (res && res.data.success) {
        yield put(unwatchReducer({
            status: 1,
            storyId: storyId,
            username: username
        }));
        console.log(`SUCCESS: ${username} successfully unwatched story`);
    } else {
        yield put(unwatchReducer({
            status: 0,
            storyId: undefined,
            username: undefined
        }));
        console.log(`ERROR: ${username} failed to unwatch story`);
    }
}

function* resetUnwatchSaga() {
    yield put(resetUnwatchReducer());
}

function* addTrophySaga(action) {
    const { status, storyId, trophyId } = action.payload;
    if (status === 1) {
        yield put(addTrophyReducer({
            status: 1,
            storyId: storyId,
            trophyId: trophyId
        }));
    } else {
        yield put(addTrophyReducer({
            status: 0,
            storyId: undefined,
            trophyId: undefined
        }));
    }
}

function* resetAddTrophySaga() {
    yield put(resetAddTrophyReducer());
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("story/fetch", fetchSaga);
}

export function* listenResetFetch() {
    yield takeEvery("story/resetFetch", resetFetchSaga);
}

export function* listenSearch() {
    yield takeEvery("story/search", searchSaga);
}

export function* listenResetSearch() {
    yield takeEvery("story/resetSearch", resetSearchSaga);
}

export function* listenSearchMore() {
    yield takeEvery("story/searchMore", searchMoreSaga);
}

export function* listenResetSearchMore() {
    yield takeEvery("story/resetSearchMore", resetSearchMoreSaga);
}

export function* listenUpdate() {
    yield takeEvery("story/update", updateSaga);
}

export function* listenResetUpdate() {
    yield takeEvery("story/resetUpdate", resetUpdateSaga);
}

export function* listenCreate() {
    yield takeEvery("story/create", createSaga);
}

export function* listenResetCreate() {
    yield takeEvery("story/resetCreate", resetCreateSaga);
}

export function* listenDelete() {
    yield takeEvery("story/delete", deleteSaga);
}

export function* listenResetDelete() {
    yield takeEvery("story/resetDelete", resetDeleteSaga);
}

export function* listenWatch() {
    yield takeEvery("story/watch", watchSaga);
}

export function* listenResetWatch() {
    yield takeEvery("story/resetWatch", resetWatchSaga);
}

export function* listenUnwatch() {
    yield takeEvery("story/unwatch", unwatchSaga);
}

export function* listenResetUnwatch() {
    yield takeEvery("story/resetUnwatch", resetUnwatchSaga);
}

export function* listenAddTrophy() {
    yield takeEvery("story/addTrophy", addTrophySaga);
}

export function* listenResetAddTrophy() {
    yield takeEvery("story/resetAddTrophy", resetAddTrophySaga);
}
////////////////////////////////////////////////////////////////////////