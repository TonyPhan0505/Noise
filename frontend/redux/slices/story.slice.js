import { createSlice } from "@reduxjs/toolkit";

export const storySlice = createSlice({
    name: "story",
    initialState: {
        stories: [],
        searchedStories: [],
        hasFetched: 2, // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
        hasUpdated: 2, // 0 = failed to update, 1 = successfully updated, 2 = waiting
        hasCreated: 2, // 0 = failed to create, 1 = successfully created, 2 = waiting
        hasDeleted: 2, // 0 = failed to delete, 1 = successfully deleted, 2 = waiting
        hasWatched: 2, // 0 = failed to watch, 1 = successfully watched, 2 = waiting
        hasUnwatched: 2, // 0 = failed to unwatch, 1 = successfully unwatched, 2 = waiting
        hasAddedTrophy: 2, // 0 = failed to add trophy, 1 = successfully added trophy, 2 = waiting
        hasSearched: 2, // 0 = failed to search, 1 = successfully searched, 2 = waiting
        hasSearchedMore: 2 // 0 = failed to search more, 1 = successfully searched more, 2 = waiting
    },
    reducers: {
        fetchReducer: (state, action) => {
            const { status, stories } = action.payload;
            if (status === 1) { state.stories = stories; }
            state.hasFetched = status;
        },
        resetFetchReducer: (state) => {
            state.hasFetched = 2;
        },
        updateReducer: (state, action) => {
            const { status, story } = action.payload;
            if (status === 1) {
                let updatedStories = [...state.stories];
                for (let i = 0; i < updatedStories.length; i++) {
                    if (updatedStories[i].id === story.id) {
                        updatedStories[i] = story;
                        break;
                    }
                }
                state.stories = updatedStories;
            }
            state.hasUpdated = status;
        },
        resetUpdateReducer: (state) => {
            state.hasUpdated = 2;
        },
        createReducer: (state, action) => {
            const { status, story } = action.payload;
            if (status === 1) {
                let updatedStories = [...state.stories];
                updatedStories.unshift(story);
                state.stories = updatedStories;
            }
            state.hasCreated = status;
        },
        resetCreateReducer: (state) => {
            state.hasCreated = 2;
        },
        deleteReducer: (state, action) => {
            const { status, storyId } = action.payload;
            if (status === 1) {
                let updatedStories = [...state.stories];
                updatedStories = updatedStories.filter((story) => { return story.id !== storyId });
                state.stories = updatedStories;
            }
            state.hasDeleted = status;
        },
        resetDeleteReducer: (state) => {
            state.hasDeleted = 2;
        },
        watchReducer: (state, action) => {
            const { status, storyId, username } = action.payload;
            if (status === 1) {
                let updatedStories = [...state.stories];
                for (let i = 0; i < updatedStories.length; i++) {
                    if (updatedStories[i].id === storyId) {
                        updatedStories[i].watchedBy.unshift(username);
                        updatedStories[i].numOfWatchers = updatedStories[i].numOfWatchers + 1;
                        break;
                    }
                }
                state.stories = updatedStories;
            }
            state.hasWatched = status;
        },
        resetWatchReducer: (state) => {
            state.hasWatched = 2;
        },
        unwatchReducer: (state, action) => {
            const { status, storyId, username } = action.payload;
            if (status === 1) {
                let updatedStories = [...state.stories];
                for (let i = 0; i < updatedStories.length; i++) {
                    if (updatedStories[i].id === storyId) {
                        updatedStories[i].watchedBy = updatedStories[i].watchedBy.filter((e) => { return e !== username });
                        updatedStories[i].numOfWatchers = updatedStories[i].numOfWatchers - 1;
                        break;
                    }
                }
                state.stories = updatedStories;
            }
            state.hasUnwatched = status;
        },
        resetUnwatchReducer: (state) => {
            state.hasUnwatched = 2;
        },
        addTrophyReducer: (state, action) => {
            const { status, storyId, trophyId } = action.payload;
            if (status === 1) {
                let updatedStories = [...state.stories];
                for (let i = 0; i < updatedStories.length; i++) {
                    if (updatedStories[i].id === storyId) {
                        updatedStories[i].trophies.unshift(trophyId);
                        break;
                    }
                }
                state.stories = updatedStories;
            }
            state.hasAddedTrophy = status;
        },
        resetAddTrophyReducer: (state) => {
            state.hasAddedTrophy = 2;
        },
        searchReducer: (state, action) => {
            const { status, stories } = action.payload;
            if (status === 1) { state.searchedStories = stories; }
            state.hasSearched = status;
        },
        resetSearchReducer: (state) => {
            state.hasSearched = 2;
        },
        searchMoreReducer: (state, action) => {
            const { status, stories } = action.payload;
            if (status === 1) {
                const updatedSearchedStories = [...state.searchedStories];
                state.searchedStories = updatedSearchedStories.concat(stories);
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
} = storySlice.actions;

export default storySlice.reducer;