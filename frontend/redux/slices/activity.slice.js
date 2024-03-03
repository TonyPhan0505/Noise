import { createSlice } from "@reduxjs/toolkit";

export const activitySlice = createSlice({
    name: "activity",
    initialState: {
        activities: [],
        hasFetched: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasFetchedMore: 2, // 0 = failed to fetch more, 1 = successfully fetched more, 2 = waiting
        hasUpdated: 2, // 0 = failed to update, 1 = successfully updated, 2 = waiting
        hasCreated: 2, // 0 = failed to create, 1 = successfully created, 2 = waiting
        hasDeleted: 2, // 0 = failed to delete, 1 = successfully deleted, 2 = waiting
        hasAddedComment: 2, // 0 = failed to add comment, 1 = successfully added comment, 2 = waiting
        hasDeletedComment: 2, // 0 = failed to delete comment, 1 = successfully deleted comment, 2 = waiting
        hasLiked: 2, // 0 = failed to like, 1 = successfully liked, 2 = waiting
        hasUnliked: 2 // 0 = failed to unlike, 1 = successfully unliked, 2 = waiting
    },
    reducers: {
        fetchReducer: (state, action) => {
            const { status, activities } = action.payload;
            if (status === 1) { state.activities = activities; }
            state.hasFetched = status;
        },
        resetFetchReducer: (state) => {
            state.hasFetched = 2;
        },
        fetchMoreReducer: (state, action) => {
            const { status, activities } = action.payload;
            if (status === 1) { 
                let updatedActivities = [...state.activities];
                if (updatedActivities.length >= (40 * 3)) {
                    updatedActivities = activities;
                } else {
                    updatedActivities = updatedActivities.concat(activities);
                }
                state.activities = updatedActivities;
            }
            state.hasFetchedMore = status;
        },
        resetFetchMoreReducer: (state) => {
            state.hasFetchedMore = 2;
        },
        updateReducer: (state, action) => {
            const { status, activity } = action.payload;
            if (status === 1) {
                let updatedActivities = [...state.activities];
                for (let i = 0; i < updatedActivities.length; i++) {
                    if (updatedActivities[i].id === activity.id) {
                        updatedActivities[i] = activity;
                        break;
                    }
                }
                state.activities = updatedActivities;
            }
            state.hasUpdated = status;
        },
        resetUpdateReducer: (state) => {
            state.hasUpdated = 2;
        },
        createReducer: (state, action) => {
            const { status, activity } = action.payload;
            if (status === 1) {
                let updatedActivities = [...state.activities];
                updatedActivities.unshift(activity);
                state.activities = updatedActivities;
            }
            state.hasCreated = status;
        },
        resetCreateReducer: (state) => {
            state.hasCreated = 2;
        },
        deleteReducer: (state, action) => {
            const { status, activityId } = action.payload;
            if (status === 1) {
                let updatedActivities = [...state.activities];
                updatedActivities = updatedActivities.filter((activity) => { return activity.id !== activityId });
                state.activities = updatedActivities;
            }
            state.hasDeleted = status;
        },
        resetDeleteReducer: (state) => {
            state.hasDeleted = 2;
        },
        addCommentReducer: (state, action) => {
            const { status, activityId, commentId } = action.payload;
            if (status === 1) {
                let updatedActivities = [...state.activities];
                for (let i = 0; i < updatedActivities.length; i++) {
                    if (updatedActivities[i].id === activityId) {
                        updatedActivities[i].comments.unshift(commentId);
                        break;
                    }
                }
                state.activities = updatedActivities;
            }
            state.hasAddedComment = status;
        },
        resetAddCommentReducer: (state) => {
            state.hasAddedComment = 2;
        },
        deleteCommentReducer: (state, action) => {
            const { status, activityId, commentId } = action.payload;
            if (status === 1) {
                let updatedActivities = [...state.activities];
                for (let i = 0; i < updatedActivities.length; i++) {
                    if (updatedActivities[i].id === activityId) {
                        updatedActivities[i].comments = updatedActivities[i].comments.filter((id) => { return id !== commentId });
                        break;
                    }
                }
                state.activities = updatedActivities;
            }
            state.hasDeletedComment = status;
        },
        resetDeleteCommentReducer: (state) => {
            state.hasDeletedComment = 2;
        },
        likeReducer: (state, action) => {
            const { status, activityId, username } = action.payload;
            if (status === 1) {
                let updatedActivities = [...state.activities];
                for (let i = 0; i < updatedActivities.length; i++) {
                    if (updatedActivities[i].id === activityId) {
                        updatedActivities[i].likedBy.unshift(username);
                        updatedActivities[i].numOfLikes = updatedActivities[i].numOfLikes + 1;
                        break;
                    }
                }
                state.activities = updatedActivities;
            }
            state.hasLiked = status;
        },
        resetLikeReducer: (state) => {
            state.hasLiked = 2;
        },
        unlikeReducer: (state, action) => {
            const { status, activityId, username } = action.payload;
            if (status === 1) {
                let updatedActivities = [...state.activities];
                for (let i = 0; i < updatedActivities.length; i++) {
                    if (updatedActivities[i].id === activityId) {
                        updatedActivities[i].likedBy = updatedActivities[i].likedBy.filter((e) => { return e !== username });
                        updatedActivities[i].numOfLikes = updatedActivities[i].numOfLikes - 1;
                        break;
                    }
                }
                state.activities = updatedActivities;
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
    createReducer,
    resetCreateReducer,
    deleteReducer,
    resetDeleteReducer,
    addCommentReducer,
    resetAddCommentReducer,
    deleteCommentReducer,
    resetDeleteCommentReducer,
    likeReducer,
    resetLikeReducer,
    unlikeReducer,
    resetUnlikeReducer
} = activitySlice.actions;

export default activitySlice.reducer;