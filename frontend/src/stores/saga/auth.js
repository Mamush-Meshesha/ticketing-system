import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { authFailure, authRequest, authSuccess, logoutFailure, logoutRequest, logoutSuccess } from "../redux/auth";

function* login(action) {
    try {
        const res = yield call(axios.post, "https://student-management-janl.onrender.com/api/student/login", action.payload, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log("API Response:", res.data);

        yield put(authSuccess(res.data))
    } catch (error) {
        yield put(authFailure(error.message))
    }
}

function* logout() {
    try {
        const res = yield call(axios.get, "http://localhost:5000/api/student/logout", {
            withCredentials: true
        })
        yield put(logoutSuccess(res.data))
    } catch (error) {
        yield put(logoutFailure(error.message))
    }
}

function* watchAuth() {
    yield takeLatest(authRequest, login)
}

function* watchLogout() {
    yield takeLatest(logoutRequest, logout)
}

export  {watchAuth,watchLogout}