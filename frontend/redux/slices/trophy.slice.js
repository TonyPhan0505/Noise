import { createSlice } from "@reduxjs/toolkit";

export const trophySlice = createSlice({
    name: "trophy",
    initialState: {
        trophies: [],
        searchedTrophies: [],
        hasFetched: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasUpdated: 2, // 0 = failed to update, 1 = successfully updated, 2 = waiting
        hasCreated: 2, // 0 = failed to create, 1 = successfully created, 2 = waiting
        hasDeleted: 2, // 0 = failed to delete, 1 = successfully deleted, 2 = waiting
        hasSearched: 2, // 0 = failed to search, 1 = successfully searched, 2 = waiting
        hasSearchedMore: 2 // 0 = failed to search more, 1 = successfully searched more, 2 = waiting
    },
    reducers: {
        fetchReducer: (state, action) => {
            const { status, trophies } = action.payload;
            if (status === 1) { state.trophies = trophies; }
            state.hasFetched = status;
        },
        resetFetchReducer: (state) => {
            state.hasFetched = 2;
        },
        updateReducer: (state, action) => {
            const { status, trophy } = action.payload;
            if (status === 1) {
                let updatedTrophies = [...state.trophies];
                for (let i = 0; i < updatedTrophies.length; i++) {
                    if (updatedTrophies[i].id === trophy.id) {
                        updatedTrophies[i] = trophy;
                        break;
                    }
                }
                state.trophies = updatedTrophies;
            }
            state.hasUpdated = status;
        },
        resetUpdateReducer: (state) => {
            state.hasUpdated = 2;
        },
        createReducer: (state, action) => {
            const { status, trophy } = action.payload;
            if (status === 1) {
                let updatedTrophies = [...state.trophies];
                updatedTrophies.unshift(trophy);
                state.trophies = updatedTrophies;
            }
            state.hasCreated = status;
        },
        resetCreateReducer: (state) => {
            state.hasCreated = 2;
        },
        deleteReducer: (state, action) => {
            const { status, trophyId } = action.payload;
            if (status === 1) {
                let updatedTrophies = [...state.trophies];
                updatedTrophies = updatedTrophies.filter((trophy) => { return trophy.id !== trophyId });
                state.trophies = updatedTrophies;
            }
            state.hasDeleted = status;
        },
        resetDeleteReducer: (state) => {
            state.hasDeleted = 2;
        },
        searchReducer: (state, action) => {
            const { status, trophies } = action.payload;
            if (status === 1) { state.searchedTrophies = trophies; }
            state.hasSearched = status;
        },
        resetSearchReducer: (state) => {
            state.hasSearched = 2;
        },
        searchMoreReducer: (state, action) => {
            const { status, trophies } = action.payload;
            if (status === 1) {
                const updatedSearchedTrophies = [...state.searchedTrophies];
                state.searchedTrophies = updatedSearchedTrophies.concat(trophies);
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
    searchReducer,
    resetSearchReducer,
    searchMoreReducer,
    resetSearchMoreReducer
} = trophySlice.actions;

export default trophySlice.reducer;