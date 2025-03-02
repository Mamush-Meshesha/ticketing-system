import { all } from "redux-saga/effects";
import {watchAuth, watchLogout,watchSignup } from "./auth";
import {watchGetTicket, watchCreateTicket, watchUpdateTicket, watchDeleteTicket } from "./tiket";

function* rootSaga() {

    yield all([
        watchAuth(),
        watchLogout(),
        watchSignup(),
        watchGetTicket(),
        watchCreateTicket(),
        watchUpdateTicket(),
        watchDeleteTicket(),
       
    ])
}

export default rootSaga