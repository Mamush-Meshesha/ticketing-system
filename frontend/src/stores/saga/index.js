import { all } from "redux-saga/effects";
import {watchAuth,  } from "./auth";

function* rootSaga() {

    yield all([
        watchAuth(),
       
    ])
}

export default rootSaga