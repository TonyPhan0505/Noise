import { createSlice } from "@reduxjs/toolkit";

export const verificationSlice = createSlice({
    name: "verification",
    initialState: {
        hasSent: 2, // 2 = waiting, 0 = failed to send, 1 = sent
        isVerified: 2, // 2 = waiting for code, 0 = failed to verify, 1 = verified
        isValid: 2 // 2 = waiting for code, 0 = invalid, 1 = valid
    },
    reducers: {
        sendReducer: (state, action) => {
            const status = action.payload;
            state.hasSent = status;
        },
        resetSendReducer: (state) => {
            state.hasSent = 2;
        },
        verifyReducer: (state, action) => {
            const { status, valid } = action.payload;
            if (status === 1) { state.isValid = valid; }
            state.isVerified = status;
        },
        resetVerifyReducer: (state) => {
            state.isVerified = 2;
            state.isValid = 2;
        }
    }
});

export const {
    sendReducer,
    resetSendReducer,
    verifyReducer,
    resetVerifyReducer
} = verificationSlice.actions;

export default verificationSlice.reducer;