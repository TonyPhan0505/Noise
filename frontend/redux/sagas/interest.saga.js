////////////////////////////// Import dependencies //////////////////////////////
import { get } from "../../apis/interest.api";

import {
    takeEvery,
    put
} from 'redux-saga/effects';

import {
    fetchReducer,
    resetFetchReducer
} from "../slices/interest.slice";
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Middleware ///////////////////////////////
function* fetchSaga(action) {
    const category = action.payload;
    const res = yield get(category);
    if (res && res.data.success) {
        const interests = res.data.interests;
        yield put(fetchReducer({
            status: 1,
            interests: interests
        }));
        console.log(`SUCCESS: Successfully fetched interests for category ${category}.`);
    } else {
        yield put(fetchReducer({
            status: 0,
            interests: undefined
        }));
        console.log(`ERROR: Failed to fetch interests for category ${category}.`);
    }
}

function* resetFetchSaga() {
    yield put(resetFetchReducer());
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("interest/fetch", fetchSaga);
}

export function* listenResetFetch() {
    yield takeEvery("interest/resetFetch", resetFetchSaga);
}
////////////////////////////////////////////////////////////////////////