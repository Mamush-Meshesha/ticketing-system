import { call, put, takeLatest } from "redux-saga/effects";
import {
  getTicketFailure,
  getTicketRequest,
  getTicketSuccess,
  tiketDeleteFailure,
  tiketDeleteRequest,
  tiketDeleteSuccess,
  tiketFailure,
  tiketRequest,
  tiketSuccess,
  tiketUpdateFailure,
  tiketUpdateRequest,
  tiketUpdateSuccess,
} from "../redux/tiket";

function* fetchTiket() {
  try {
    const response = yield call(api.get, "/tiket", {
      withCredentials: true,
    });
    yield put(getTicketSuccess(response.data));
  } catch (error) {
    yield put(getTicketFailure(error.message));
  }
}

function* createTicket(action) {
  try {
    const response = yield call(api.post, "/tiket", action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    yield put(tiketSuccess(response.data));
  } catch (error) {
    yield put(tiketFailure(error));
  }
}

function* updateTicket(action) {
  try {
    const response = yield call(api.put, "/tiket", action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    yield put(tiketUpdateSuccess(response.data));
  } catch (error) {
    yield put(tiketUpdateFailure(error.message));
  }
}

function* deleteTicket(action) {
  try {
    const response = yield call(api.delete, "/tiket", action.payload, {
      withCredentials: true,
    });
    yield put(tiketDeleteSuccess(response.data));
  } catch (error) {
    yield put(tiketDeleteFailure(error.message));
  }
}

function* watchGetTicket() {
  yield takeLatest(getTicketRequest, fetchTiket);
}

function* watchCreateTicket() {
  yield takeLatest(tiketRequest, createTicket);
}

function* watchUpdateTicket() {
  yield takeLatest(tiketUpdateRequest, updateTicket);
}

function* watchDeleteTicket() {
  yield takeLatest(tiketDeleteRequest, deleteTicket);
}

export {
  watchGetTicket,
  watchCreateTicket,
  watchUpdateTicket,
  watchDeleteTicket,
};
