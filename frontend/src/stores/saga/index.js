import { all } from "redux-saga/effects";
import { watchAuth, watchDeleteUser, watchGetAllUsers, watchGetUsersForComment, watchLogout, watchSignup, watchUpdateAdmin, watchUpdateUser } from "./auth";
import {
  watchGetTicket,
  watchCreateTicket,
  watchUpdateTicket,
  watchDeleteTicket,
  watchGetTicketsDetail,
  watchCreateComment,
} from "./tiket";

function* rootSaga() {
  yield all([
    watchAuth(),
    watchLogout(),
    watchSignup(),
    watchGetTicket(),
    watchCreateTicket(),
    watchUpdateTicket(),
    watchDeleteTicket(),
    watchGetAllUsers(),
    watchGetTicketsDetail(),
    watchCreateComment(),
    watchGetUsersForComment(),
    watchUpdateUser(),
    watchUpdateAdmin(),
    watchDeleteUser()
  ]);
}

export default rootSaga;
