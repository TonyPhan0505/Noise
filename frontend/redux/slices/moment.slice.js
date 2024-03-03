import { createSlice } from "@reduxjs/toolkit";

export const momentSlice = createSlice({
    name: "moment",
    initialState: {
        moments: [],
        hasFetched: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasUpdated: 2, // 0 = failed to update, 1 = successfully updated, 2 = waiting
        hasCreated: 2, // 0 = failed to create, 1 = successfully created, 2 = waiting
        hasDeleted: 2, // 0 = failed to create, 1 = successfully created, 2 = waiting
        hasLiked: 2, // 0 = failed to like, 1 = successfully liked, 2 = waiting
        hasUnliked: 2 // 0 = failed to unlike, 1 = successfully unliked, 2 = waiting
    },
    reducers: {
        fetchReducer: (state, action) => {
            const { status, moments } = action.payload;
            if (status === 1) {
                state.moments = moments;
            }
            state.hasFetched = status;
        },
        resetFetchReducer: (state) => {
            state.hasFetched = 2;
        },
        updateReducer: (state, action) => {
            const { status, moment } = action.payload;
            if (status === 1) {
                let updatedMoments = [...state.moments];
                for (let i = 0; i < updatedMoments.length; i++) {
                    if (updatedMoments[i].id === moment.id) {
                        updatedMoments[i] = moment;
                        break;
                    }
                }
                state.moments = updatedMoments;
            }
            state.hasUpdated = status;
        },
        resetUpdateReducer: (state) => {
            state.hasUpdated = 2;
        },
        createReducer: (state, action) => {
            const { status, moment } = action.payload;
            if (status === 1) {
                let updatedMoments = [...state.moments];
                updatedMoments.unshift(moment);
                state.moments = updatedMoments;
            }
            state.hasCreated = status;
        },
        resetCreateReducer: (state) => {
            state.hasCreated = 2;
        },
        deleteReducer: (state, action) => {
            const { status, momentId } = action.payload;
            if (status === 1) {
                let updatedMoments = [...state.moments];
                updatedMoments = updatedMoments.filter((moment) => { return moment.id !== momentId });
                state.moments = updatedMoments;
            }
            state.hasDeleted = status;
        },
        resetDeleteReducer: (state) => {
            state.hasDeleted = 2;
        },
        likeReducer: (state, action) => {
            const { status, momentId, username } = action.payload;
            if (status === 1) {
                let updatedMoments = [...state.moments];
                for (let i = 0; i < updatedMoments.length; i++) {
                    if (updatedMoments[i].id === momentId) {
                        updatedMoments[i].likedBy.unshift(username);
                        updatedMoments[i].numOfLikes = updatedMoments[i].numOfLikes + 1;
                        break;
                    }
                }
                state.moments = updatedMoments;
            }
            state.hasLiked = status;
        },
        resetLikeReducer: (state) => {
            state.hasLiked = 2;
        },
        unlikeReducer: (state, action) => {
            const { status, momentId, username } = action.payload;
            if (status === 1) {
                let updatedMoments = [...state.moments];
                for (let i = 0; i < updatedMoments.length; i++) {
                    if (updatedMoments[i].id === momentId) {
                        updatedMoments[i].likedBy = updatedMoments[i].likedBy.filter((e) => { return e !== username });
                        updatedMoments[i].numOfLikes = updatedMoments[i].numOfLikes - 1;
                        break;
                    }
                }
                state.moments = updatedMoments;
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
} = momentSlice.actions;

export default momentSlice.reducer;