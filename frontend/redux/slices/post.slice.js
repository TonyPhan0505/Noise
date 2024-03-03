import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        searchedPosts: [], 
        hasFetched: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasUpdated: 2, // 0 = failed to update, 1 = successfully updated, 2 = waiting
        hasCreated: 2, // 0 = failed to create, 1 = successfully created, 2 = waiting
        hasDeleted: 2, // 0 = failed to delete, 1 = successfully deleted, 2 = waiting
        hasLiked: 2, // 0 = failed to like, 1 = successfully liked, 2 = waiting
        hasUnliked: 2, // 0 = failed to unlike, 1 = successfully unliked, 2 = waiting
        hasSearched: 2, // 0 = failed to search, 1 = successfully searched, 2 = waiting
        hasSearchedMore: 2 // 0 = failed to search more, 1 = successfully searched more, 2 = waiting
    },
    reducers: {
        fetchReducer: (state, action) => {
            const { status, posts } = action.payload;
            if (status === 1) { state.posts = posts; }
            state.hasFetched = status;
        },
        resetFetchReducer: (state) => {
            state.hasFetched = 2;
        },
        updateReducer: (state, action) => {
            const { status, post } = action.payload;
            if (status === 1) {
                let updatedPosts = [...state.posts];
                for (let i = 0; i < updatedPosts.length; i++) {
                    if (updatedPosts[i].id === post.id) {
                        updatedPosts[i] = post;
                        break;
                    }
                }
                state.posts = updatedPosts;
            }
            state.hasUpdated = status;
        },
        resetUpdateReducer: (state) => {
            state.hasUpdated = 2;
        },
        createReducer: (state, action) => {
            const { status, post } = action.payload;
            if (status === 1) {
                let updatedPosts = [...state.posts];
                updatedPosts.unshift(post);
                state.posts = updatedPosts;
            }
            state.hasCreated = status;
        },
        resetCreateReducer: (state) => {
            state.hasCreated = 2;
        },
        deleteReducer: (state, action) => {
            const { status, postId } = action.payload;
            if (status === 1) {
                let updatedPosts = [...state.posts];
                updatedPosts = updatedPosts.filter((post) => { return post.id !== postId });
                state.posts = updatedPosts;
            }
            state.hasDeleted = status;
        },
        resetDeleteReducer: (state) => {
            state.hasDeleted = 2;
        },
        likeReducer: (state, action) => {
            const { status, postId, username } = action.payload;
            if (status === 1) {
                let updatedPosts = [...state.posts];
                for (let i = 0; i < updatedPosts.length; i++) {
                    if (updatedPosts[i].id === postId) {
                        updatedPosts[i].likedBy.unshift(username);
                        updatedPosts[i].numOfLikes = updatedPosts[i].numOfLikes + 1;
                        break;
                    }
                }
                state.posts = updatedPosts;
            }
            state.hasLiked = status;
        },
        resetLikeReducer: (state) => {
            state.hasLiked = 2;
        },
        unlikeReducer: (state, action) => {
            const { status, postId, username } = action.payload;
            if (status === 1) {
                let updatedPosts = [...state.posts];
                for (let i = 0; i < updatedPosts.length; i++) {
                    if (updatedPosts[i].id === postId) {
                        updatedPosts[i].likedBy = updatedPosts[i].likedBy.filter((e) => { return e !== username });
                        updatedPosts[i].numOfLikes = updatedPosts[i].numOfLikes - 1;
                        break;
                    }
                }
                state.posts = updatedPosts;
            }
            state.hasUnliked = status;
        },
        resetUnlikeReducer: (state) => {
            state.hasUnliked = 2;
        },
        searchReducer: (state, action) => {
            const { status, posts } = action.payload;
            if (status === 1) { state.searchedPosts = posts; }
            state.hasSearched = status;
        },
        resetSearchReducer: (state) => {
            state.hasSearched = 2;
        },
        searchMoreReducer: (state, action) => {
            const { status, posts } = action.payload;
            if (status === 1) {
                const updatedSearchedPosts = [...state.searchedPosts];
                state.searchedPosts = updatedSearchedPosts.concat(posts);
            }
            state.hasSearchedMore = status;
        },
        resetSearchMoreReducer: (state) => {
            state.hasSearchedMore = 2;
        }
    }
});

export const {
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
} = postSlice.actions;

export default postSlice.reducer;