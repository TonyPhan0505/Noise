import { createSlice } from "@reduxjs/toolkit";

export const dreamSlice = createSlice({
    name: "dream",
    initialState: {
        dreams: [],
        hasFetched: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasUpdated: 2, // 0 = failed to update, 1 = successfully updated, 2 = waiting
        hasCreated: 2, // 0 = failed to create, 1 = successfully created, 2 = waiting
        hasDeleted: 2 // 0 = failed to delete, 1 = successfully deleted, 2 = waiting
    },
    reducers: {
        fetchReducer: (state, action) => {
            const { status, dreams } = action.payload;
            if (status === 1) { state.dreams = dreams; }
            state.hasFetched = status;
        },
        resetFetchReducer: (state) => {
            state.hasFetched = 2;
        },
        updateReducer: (state, action) => {
            const { status, dream } = action.payload;
            if (status === 1) {
                let updatedDreams = [...state.dreams];
                for (let i = 0; i < updatedDreams.length; i++) {
                    if (updatedDreams[i].id === dream.id) {
                        updatedDreams[i] = dream;
                        break;
                    }
                }
                state.dreams = updatedDreams;
            }
            state.hasUpdated = status;
        },
        resetUpdateReducer: (state) => {
            state.hasUpdated = 2;
        },
        createReducer: (state, action) => {
            const { status, dream } = action.payload;
            if (status === 1) {
                let updatedDreams = [...state.dreams];
                updatedDreams.unshift(dream);
                state.dreams = updatedDreams;
            }
            state.hasCreated = status;
        },
        resetCreateReducer: (state) => {
            state.hasCreated = 2;
        },
        deleteReducer: (state, action) => {
            const { status, dreamId } = action.payload;
            if (status === 1) {
                let updatedDreams = [...state.dreams];
                updatedDreams = updatedDreams.filter((dream) => { return dream.id !== dreamId });
                state.dreams = updatedDreams;
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
} = dreamSlice.actions;

export default dreamSlice.reducer;