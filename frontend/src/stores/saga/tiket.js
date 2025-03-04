import { call, put, takeLatest } from "redux-saga/effects";
import {
  createCommentRequest,
  createCommentSuccess,
  createCommnetFailure,
  getTicketFailure,
  getTicketRequest,
  getTicketsDetailFailure,
  getTicketsDetailRequest,
  getTicketsDetailSuccess,
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
import api from "../../utils/api"

function* fetchTiket() {
  try {
    const response = yield call(api.get, "/tickets", {
      withCredentials: true,
    });
    yield put(getTicketSuccess(response.data));
  } catch (error) {
    yield put(getTicketFailure(error.message));
  }
}

function* createTicket(action) {
  try {
    const response = yield call(api.post, "/tickets/create", action.payload, {
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
    const response = yield call(api.delete, `/tickets/delete/${action.payload}`, {
      withCredentials: true,
    });
    yield put(tiketDeleteSuccess(response.data));
  } catch (error) {
    yield put(tiketDeleteFailure(error.message));
  }
}

function* getTicketsDetail (action) {
  try {
    console.log("Fetching ticket with ID:", action.payload);
    if (!action.payload) {
      throw new Error("Ticket ID is missing!");
    }

    const response  = yield call(api.get, `/tickets/${action.payload}`, {
      withCredentials: true
    })
    console.log(response.data)
    yield put(getTicketsDetailSuccess(response.data))
  } catch (error) {
    yield put(getTicketsDetailFailure(error.message))
  }
}

function* createComment(action) {
  try {
    const response = yield call(api.post, `/tickets/${action.payload.id}/comment`, 
      { comment: action.payload.comment }, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    yield put(createCommentSuccess(response.data))
  } catch (error) {
    yield put(createCommnetFailure(error.message))
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

function* watchGetTicketsDetail(){
  yield takeLatest(getTicketsDetailRequest, getTicketsDetail)
}

function* watchCreateComment() {
  yield takeLatest(createCommentRequest, createComment)
}

export {
  watchGetTicket,
  watchCreateTicket,
  watchUpdateTicket,
  watchDeleteTicket,
  watchGetTicketsDetail,
  watchCreateComment
};
