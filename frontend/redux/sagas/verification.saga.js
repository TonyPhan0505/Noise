////////////////////////////// Import dependencies //////////////////////////////
import {
    send,
    verify
} from "../../apis/verification.api";

import {
    takeEvery,
    put
} from 'redux-saga/effects';

import {
    sendReducer,
    resetSendReducer,
    verifyReducer,
    resetVerifyReducer
} from "../slices/verification.slice";
////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Middleware //////////////////////////////
export function* sendSaga(action) {
    const emailAddress = action.payload;
    const res = yield send(emailAddress);
    if (res && res.data.success) {
        yield put(sendReducer(1));
        console.log("SUCCESS: Successfully sent verification code.");
    } else {
        yield put(sendReducer(0));
        console.error("ERROR: Failed to send verification code.");
    }
}

export function* resetSendSaga() {
    yield put(resetSendReducer());
}

export function* verifySaga(action) {
    const {
        emailAddress, 
        code
    } = action.payload;
    const res = yield verify(
        emailAddress, 
        code
    );
    if (res && res.data.success) {
        const valid = res.data.valid;
        yield put(verifyReducer({
            status: 1,
            valid: valid
        }));
        console.log("SUCCESS: Successfully verified verification code.");
    } else {
        yield put(verifyReducer({
            status: 0,
            valid: undefined
        }));
        console.error("ERROR: Failed to verify verification code.");
    }
}

export function* resetVerifySaga() {
    yield put(resetVerifyReducer());
}
///////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenSend() {
    yield takeEvery("verification/send", sendSaga);
}

export function* listenResetSend() {
    yield takeEvery("verification/resetSend", resetSendSaga);
}

export function* listenVerify() {
    yield takeEvery("verification/verify", verifySaga);
}

export function* listenResetVerify() {
    yield takeEvery("verification/resetVerify", resetVerifySaga);
}
////////////////////////////////////////////////////////////////////////