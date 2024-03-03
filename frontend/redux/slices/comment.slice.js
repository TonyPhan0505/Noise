import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        hasFetched: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasFetchedMore: 2, // 0 = failed to fetch more, 1 = successfully fetched more, 2 = waiting
        hasUpdated: 2, // 0 = failed to update, 1 = successfully updated, 2 = waiting
        hasCreated: 2, // 0 = failed to create, 1 = successfully created, 2 = waiting
        hasDeleted: 2, // 0 = failed to delete, 1 = successfully deleted, 2 = waiting
        hasLiked: 2, // 0 = failed to like, 1 = successfully liked, 2 = waiting
        hasUnliked: 2 // 0 = failed to unlike, 1 = successfully unliked, 2 = waiting
    },
    reducers: {
        fetchReducer: (state, action) => {
            const { status, comments } = action.payload;
            if (status === 1) { state.comments = comments; }
            state.hasFetched = status;
        },
        resetFetchReducer: (state) => {
            state.hasFetched = 2;
        },
        fetchMoreReducer: (state, action) => {
            const { status, comments } = action.payload;
            if (status === 1) {
                let updatedComments = [...state.comments];
                if (updatedComments.length >= 100) {
                    updatedComments = comments;
                } else {
                    updatedComments = updatedComments.concat(comments);
                }
                state.comments = updatedComments;
            }
            state.hasFetchedMore = status;
        },
        resetFetchMoreReducer: (state) => {
            state.hasFetchedMore = 2;
        },
        updateReducer: (state, action) => {
            const { status, comment } = action.payload;
            if (status === 1) {
                let updatedComments = [...state.comments];
                for (let i = 0; i < updatedComments.length; i++) {
                    if (updatedComments[i].id === comment.id) {
                        updatedComments[i] = comment;
                        break;
                    }
                }
                state.comments = updatedComments;
            }
            state.hasUpdated = status;
        },
        resetUpdateReducer: (state) => {
            state.hasUpdated = 2;
        },
        createReduce: (state, action) => {
            const { status, comment } = action.payload;
            if (status === 1) {
                let updatedComments = [...state.comments];
                updatedComments.unshift(comment);
                state.comments = updatedComments;
            }
            state.hasCreated = status;
        },
        resetCreateReducer: (state) => {
            state.hasCreated = 2;
        },
        deleteReducer: (state, action) => {
            const { status, commentId } = action.payload;
            if (status === 1) {
                let updatedComments = [...state.comments];
                updatedComments = updatedComments.filter((comment) => { return comment.id !== commentId });
                state.comments = updatedComments;
            }
            state.hasDeleted = status;
        },
        resetDeleteReducer: (state) => {
            state.hasDeleted = 2;
        },
        likeReducer: (state, action) => {
            const { status, commentId, username } = action.payload;
            if (status === 1) {
                let updatedComments = [...state.comments];
                for (let i = 0; i < updatedComments.length; i++) {
                    if (updatedComments[i].id === commentId) {
                        updatedComments[i].likedBy.unshift(username);
                        updatedComments[i].numOfLikes = updatedComments[i].numOfLikes + 1;
                        break;
                    }
                }
                state.comments = updatedComments;
            }
            state.hasLiked = status;
        },
        resetLikeReducer: (state) => {
            state.hasLiked = 2;
        },
        unlikeReducer: (state, action) => {
            const { status, commentId, username } = action.payload;
            if (status === 1) {
                let updatedComments = [...state.comments];
                for (let i = 0; i < updatedComments.length; i++) {
                    if (updatedComments[i].id === commentId) {
                        updatedComments[i].likedBy = updatedComments[i].likedBy.filter((e) => { return e !== username; });
                        updatedComments[i].numOfLikes = updatedComments[i].numOfLikes - 1;
                        break;
                    }
                }
                state.comments = updatedComments;
            }
            state.hasUnliked = status;
        },
        resetUnlikeReducer: (state) => {
            state.hasUnliked = 2;
        }
    }
});

export const {
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
} = commentSlice.actions;

export default commentSlice.reducer;