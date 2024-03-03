////////////////////////////// Import dependencies //////////////////////////////
import {
    get,
    search,
    searchMore,
    update,
    create,
    deletePost,
    like,
    unlike
} from "../../apis/post.api";

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
    resetUnlikeReducer,
    searchReducer,
    resetSearchReducer,
    searchMoreReducer,
    resetSearchMoreReducer
} from "../slices/post.slice";
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Middleware ///////////////////////////////
function* fetchSaga(action) {
    const username = action.payload;
    const res = yield get(username);
    if (res && res.data.success) {
        const posts = res.data.posts;
        yield put(fetchReducer({
            status: 1,
            posts: posts
        }));
        console.log("SUCCESS: Successfully fetched posts.");
    } else {
        yield put(fetchReducer({
            status: 0,
            posts: undefined
        }));
        console.error("ERROR: Failed to fetch posts.");
    }
}

function* resetFetchSaga() {
    yield put(resetFetchReducer());
}

function* searchSaga(action) {
    const keyword = action.payload;
    const res = yield search(keyword);
    if (res && res.data.success) {
        const posts = res.data.posts;
        yield put(searchReducer({
            status: 1,
            posts: posts
        }));
        console.log("SUCCESS: Successfully searched posts.");
    } else {
        yield put(searchReducer({
            status: 0,
            posts: undefined
        }));
        console.error("ERROR: Failed to search posts.");
    }
}

function* resetSearchSaga() {
    yield put(resetSearchReducer());
}

function* searchMoreSaga(action) {
    const { 
        keyword,
        prevPostIds
    } = action.payload;
    const res = yield searchMore(
        keyword,
        prevPostIds
    );
    if (res && res.data.success) {
        const posts = res.data.posts;
        yield put(searchMoreReducer({
            status: 1,
            posts: posts
        }));
        console.log("SUCCESS: Successfully searched for more posts.");
    } else {
        yield put(searchMoreReducer({
            status: 0,
            posts: undefined
        }));
        console.error("ERROR: Failed to search for more posts.");
    }
}

function* resetSearchMoreSaga() {
    yield put(resetSearchMoreReducer());
}

function* updateSaga(action) {
    const { 
        postId, 
        writing, 
        media, 
        mediaTypes, 
        tags
    } = action.payload;
    const res = yield update(
        postId, 
        writing, 
        media, 
        mediaTypes, 
        tags
    );
    if (res && res.data.success) {
        const post = res.data.post;
        yield put(updateReducer({
            status: 1,
            post: post
        }));
        console.log("SUCCESS: Successfully updated post.");
    } else {
        yield put(updateReducer({
            status: 0,
            post: undefined
        }));
        console.error("ERROR: Failed to update post.");
    }
}

function* resetUpdateSaga() {
    yield put(resetUpdateReducer());
}

function* createSaga(action) {
    const {
        postId, 
        username, 
        year, 
        month, 
        day, 
        hour, 
        minute, 
        writing, 
        media, 
        mediaTypes, 
        tags, 
        storyId
    } = action.payload;
    const res = yield create(
        postId, 
        username, 
        year, 
        month, 
        day, 
        hour, 
        minute, 
        writing, 
        media, 
        mediaTypes, 
        tags, 
        storyId
    );
    if (res && res.data.success) {
        const post = res.data.post;
        yield put(createReducer({
            status: 1,
            post: post
        }));
        console.log("SUCCESS: Successfully created post.");
    } else {
        yield put(createReducer({
            status: 0,
            post: undefined
        }));
        console.error("ERROR: Failed to create post.");
    }
}

function* resetCreateSaga() {
    yield put(resetCreateReducer());
}

function* deleteSaga(action) {
    const postId = action.payload;
    const res = yield deletePost(postId);
    if (res && res.data.success) {
        yield put(deleteReducer({
            status: 1,
            postId: postId
        }));
        console.log("SUCCESS: Successfully deleted post.");
    } else {
        yield put(deleteReducer({
            status: 0,
            postId: undefined
        }));
        console.error("ERROR: Failed to delete post.");
    }
}

function* resetDeleteSaga() {
    yield put(resetDeleteReducer());
}

function* likeSaga(action) {
    const {
        postId, 
        username
    } = action.payload;
    const res = yield like(
        postId, 
        username
    );
    if (res && res.data.success) {
        yield put(likeReducer({
            status: 1,
            postId: postId,
            username: username
        }));
        console.log("SUCCESS: Successfully liked post.");
    } else {
        yield put(likeReducer({
            status: 0,
            postId: undefined,
            username: undefined
        }));
        console.error("ERROR: Failed to like post.");
    }
}

function* resetLikeSaga() {
    yield put(resetLikeReducer());
}

function* unlikeSaga(action) {
    const {
        postId, 
        username
    } = action.payload;
    const res = yield unlike(
        postId, 
        username
    );
    if (res && res.data.success) {
        yield put(unlikeReducer({
            status: 1,
            postId: postId,
            username: username
        }));
        console.log("SUCCESS: Successfully unliked post.");
    } else {
        yield put(unlikeReducer({
            status: 0,
            postId: undefined,
            username: undefined
        }));
        console.error("ERROR: Failed to unlike post.");
    }
}

function* resetUnlikeSaga() {
    yield put(resetUnlikeReducer());
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("post/fetch", fetchSaga);
}

export function* listenResetFetch() {
    yield takeEvery("post/resetFetch", resetFetchSaga);
}

export function* listenSearch() {
    yield takeEvery("post/search", searchSaga);
}

export function* listenResetSearch() {
    yield takeEvery("post/resetSearch", resetSearchSaga);
}

export function* listenSearchMore() {
    yield takeEvery("post/searchMore", searchMoreSaga);
}

export function* listenResetSearchMore() {
    yield takeEvery("post/resetSearchMore", resetSearchMoreSaga);
}

export function* listenUpdate() {
    yield takeEvery("post/update", updateSaga);
}

export function* listenResetUpdate() {
    yield takeEvery("post/resetUpdate", resetUpdateSaga);
}

export function* listenCreate() {
    yield takeEvery("post/create", createSaga);
}

export function* listenResetCreate() {
    yield takeEvery("post/resetCreate", resetCreateSaga);
}

export function* listenDelete() {
    yield takeEvery("post/delete", deleteSaga);
}

export function* listenResetDelete() {
    yield takeEvery("post/resetDelete", resetDeleteSaga);
}

export function* listenLike() {
    yield takeEvery("post/like", likeSaga);
}

export function* listenResetLike() {
    yield takeEvery("post/resetLike", resetLikeSaga);
}

export function* listenUnlike() {
    yield takeEvery("post/unlike", unlikeSaga);
}

export function* listenResetUnlike() {
    yield takeEvery("post/resetUnlike", resetUnlikeSaga);
}
////////////////////////////////////////////////////////////////////////