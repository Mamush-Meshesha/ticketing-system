import { all } from "redux-saga/effects";
import {watchAuth, watchGetAllUsers, watchLogout,watchSignup } from "./auth";
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
        watchGetAllUsers()
       
    ])
}

export default rootSaga