import { createSlice } from "@reduxjs/toolkit";

export const interestSlice = createSlice({
    name: "interest",
    initialState: {
        interests: [],
        hasFetched: 2 // 0 = failed to fetch, 1 = successfully fetched, 2 = waiting
    },
    reducers: {
        fetchReducer: (state, action) => {
            const { status, interests } = action.payload;
            if (status === 1) {
                state.interests = interests;
            }
            state.hasFetched = status;
        },
        resetFetchReducer: (state) => {
            state.hasFetched = 2;
        }
    }
});

export const {
    fetchReducer,
    resetFetchReducer
} = interestSlice.actions;

export default interestSlice.reducer;