import { createSlice } from "@reduxjs/toolkit";

export const viewSlice = createSlice({
    name: "view",
    initialState: {
        views: [],
        hasFetched: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasUpdated: 2, // 0 = failed to update, 1 = successfully updated, 2 = waiting
        hasCreated: 2, // 0 = failed to create, 1 = successfully created, 2 = waiting
        hasDeleted: 2 // 0 = failed to delete, 1 = successfully deleted, 2 = waiting
    },
    reducers: {
        fetchReducer: (state, action) => {
            const { status, views } = action.payload;
            if (status === 1) { state.views = views; }
            state.hasFetched = status;
        },
        resetFetchReducer: (state) => {
            state.hasFetched = 2;
        },
        updateReducer: (state, action) => {
            const { status, view } = action.payload;
            if (status === 1) {
                let updatedViews = [...state.views];
                for (let i = 0; i < updatedViews.length; i++) {
                    if (updatedViews[i].id === view.id) {
                        updatedViews[i] = view;
                        break;
                    }
                }
                state.views = updatedViews;
            }
            state.hasUpdated = status;
        },
        resetUpdateReducer: (state) => {
            state.hasUpdated = 2;
        },
        createReducer: (state, action) => {
            const { status, view } = action.payload;
            if (status === 1) {
                let updatedViews = [...state.views];
                updatedViews.unshift(view);
                state.views = updatedViews;
            }
            state.hasCreated = status;
        },
        resetCreateReducer: (state) => {
            state.hasCreated = 2;
        },
        deleteReducer: (state, action) => {
            const { status, viewId } = action.payload;
            if (status === 1) {
                let updatedViews = [...state.views];
                updatedViews = updatedViews.filter((view) => { return view.id !== viewId });
                state.views = updatedViews;
            }
            state.hasDeleted = status;
        },
        resetDeleteReducer: (state) => {
            state.hasDeleted = 2;
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
    resetDeleteReducer
} = viewSlice.actions;

export default viewSlice.reducer;