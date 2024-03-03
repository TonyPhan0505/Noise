////////////////////////////// Import dependencies //////////////////////////////
import { getAll } from "../../apis/InterestCategory.api";

import {
    takeEvery,
    put
} from 'redux-saga/effects';

import {
    fetchReducer,
    resetFetchReducer
} from "../slices/InterestCategory.slice";
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////// Middleware ///////////////////////////////
function* fetchSaga() {
    const res = yield getAll();
    if (res && res.data.success) {
        const categories = res.data.categories;
        yield put(fetchReducer({
            status: 1,
            categories: categories
        }));
        console.log("SUCCESS: Successfully fetched interest categories.");
    } else {
        yield put(fetchReducer({
            status: 0,
            categories: undefined
        }));
        console.error("ERROR: Failed to fetch interest categories.");
    }
}

function* resetFetchSaga() {
    yield put(resetFetchReducer());
}
/////////////////////////////////////////////////////////////////////////

/////////////////////////////// Listeners ///////////////////////////////
export function* listenFetch() {
    yield takeEvery("interestCategory/fetch", fetchSaga);
}

export function* listenResetFetch() {
    yield takeEvery("interestCategory/resetFetch", resetFetchSaga);
}
/////////////////////////////////////////////////////////////////////////