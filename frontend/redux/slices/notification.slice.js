import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
        hasFetched: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasFetchedMore: 2, // 0 = failed to fetch more, 1 = successfully fetched more, 2 = waiting
        hasCreated: 2, // 0 = failed to create, 1 = successfully created, 2 = waiting
        hasHidden: 2 // 0 = failed to create, 1 = successfully created, 2 = waiting
    },
    reducers: {
        fetchReducer: (state, action) => {
            const { status, notifications } = action.payload;
            if (status === 1) { state.notifications = notifications; }
            state.hasFetched = status;
        },
        resetFetchReducer: (state) => {
            state.hasFetched = 2;
        },
        fetchMoreReducer: (state, action) => {
            const { status, notifications } = action.payload;
            if (status === 1) {
                let updatedNotifications = [...state.notifications];
                if (updatedNotifications.length >= 50) {
                    updatedNotifications = notifications;
                } else {
                    updatedNotifications = updatedNotifications.concat(notifications);
                }
                state.notifications = updatedNotifications;
            }
            state.hasFetchedMore = status;
        },
        resetFetchMoreReducer: (state) => {
            state.hasFetchedMore = 2;
        },
        createReducer: (state, action) => {
            const status = action.payload;
            state.hasCreated = status;
        },
        resetCreateReducer: (state) => {
            state.hasCreated = 2;
        },
        hideReducer: (state, action) => {
            const { status, notiId } = action.payload;
            if (status === 1) {
                let updatedNotifications = [...state.notifications];
                updatedNotifications = updatedNotifications.filter((notification) => { return notification.id !== notiId });
                state.notifications = updatedNotifications;
            }
            state.hasHidden = status;
        },
        resetHideReducer: (state) => {
            state.hasHidden = 2;
        }
    }
});

export const {
    fetchReducer,
    resetFetchReducer,
    fetchMoreReducer,
    resetFetchMoreReducer,
    createReducer,
    resetCreateReducer,
    hideReducer,
    resetHideReducer
} = notificationSlice.actions;

export default notificationSlice.reducer;