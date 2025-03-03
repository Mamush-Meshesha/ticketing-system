import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { authFailure, authRequest, authSuccess,logoutFailure, logoutRequest, logoutSuccess, registerFailure, registerReuest, registerSuccess } from "../redux/auth";
import api from "../../utils/api";
import { userFailure, userRequest, userSuccess } from "../redux/users";

function* login(action) {
    try {
        const res = yield call(api.post, "/auth/login", action.payload, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        console.log("API Response:", res.data);

        yield put(authSuccess(res.data))
    } catch (error) {
        yield put(authFailure(error.message))
    }
}

function* signup(action) {
    try {
        const res = yield call(api.post, "/auth/signup", action.payload, {
            headers: {
                "Content-Type": "application/json",
            },
            // withCredentials: true,
        })
        console.log("API Response:", res.data);

        yield put(registerSuccess(res.data))
    } catch (error) {
        yield put(registerFailure(error.message))
    }
}

function* logout() {
    try {
        const res = yield call(api.post, "/auth/logout", {
        })
        yield put(logoutSuccess(res.data))
    } catch (error) {
        yield put(logoutFailure(error.message))
    }
}

function* getAllUsers() {
    try {
        const res = yield call(api.get, "/auth/users", {
            withCredentials: true,
        })
        console.log("API Response:", res.data);

        yield put(userSuccess(res.data))
    } catch (error) {
        yield put(userFailure(error.message))
    }
}

function* watchAuth() {
    yield takeLatest(authRequest, login)
}

function* watchLogout() {
    yield takeLatest(logoutRequest, logout)
}

function* watchSignup() {
    yield takeLatest(registerReuest, signup)
}

function* watchGetAllUsers() {
    yield takeLatest(userRequest, getAllUsers)
}

export  {watchAuth,watchLogout,watchSignup, watchGetAllUsers}