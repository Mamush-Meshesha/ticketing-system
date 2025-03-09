import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  authFailure,
  authRequest,
  authSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  registerFailure,
  registerReuest,
  registerSuccess,
} from "../redux/auth";
import api from "../../utils/api";
import {
  deleteUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  getUserForComment,
  getUserForCommentFailure,
  getUsersForCommentSuccess,
  updateAdminFailure,
  updateAdminRequest,
  updateAdminSuccess,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
  userFailure,
  userRequest,
  userSuccess,
} from "../redux/users";

function* login(action) {
  try {
    const res = yield call(api.post, "/auth/login", action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    });
    console.log("API Response:", res.data);

    localStorage.setItem("token", res.data.token); 

    yield put(authSuccess(res.data));
  } catch (error) {
    yield put(authFailure(error.message));
  }
}

function* signup(action) {
  try {
    const res = yield call(api.post, "/auth/signup", action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("API Response:", res.data);

    yield put(registerSuccess(res.data));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

function* logout() {
  try {
    const res = yield call(api.post, "/auth/logout", {});
    localStorage.removeItem("token");

    yield put(logoutSuccess(res.data));
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

function* getAllUsers() {
  try {
    const res = yield call(api.get, "/auth/users", {
      withCredentials: true
    },
  );
    console.log("API Response:", res.data);

    yield put(userSuccess(res.data));
  } catch (error) {
    yield put(userFailure(error.message));
  }
}

function* getUserForCommentSage() {
  try {
    const res = yield call(api.get, "/auth/user", {
      withCredentials: true
    });
    console.log("API Response:", res.data);

    yield put(getUsersForCommentSuccess(res.data));
  } catch (error) {
    yield put(getUserForCommentFailure(error.message));
  }
}

function* updateUser(action) {
  try {
    const { _id, ...userData } = action.payload;

    if (!_id) {
      throw new Error("User ID is missing");
    }

    const response = yield call(api.put, `/auth/update/${_id}`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    });
    yield put(updateUserSuccess(response.data));
  } catch (error) {
    yield put(updateUserFailure(error.message));
  }
}

function* updateAdmin(action) {
  try {
    const { _id, adminData } = action.payload;
    console.log("Payload:", action.payload); // Check the payload

    const response = yield call(
      api.put,
      `/auth/update/admin/${_id}`,
      adminData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensure credentials are included
      }
    );

    yield put(updateAdminSuccess(response.data));
  } catch (error) {
    console.error("Update Admin Error:", error);
    yield put(updateAdminFailure(error.response?.data || "Unknown error"));
  }
}

function* deleteUser(action) {
  try {
    const response = yield call(api.delete, `/auth/delete/${action.payload}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    });


    yield put(deleteUserSuccess(response.data));
  } catch (error) {
    yield put(deleteUserFailure(error.message));
  }
}

function* watchAuth() {
  yield takeLatest(authRequest, login);
}

function* watchLogout() {
  yield takeLatest(logoutRequest, logout);
}

function* watchSignup() {
  yield takeLatest(registerReuest, signup);
}

function* watchGetAllUsers() {
  yield takeLatest(userRequest, getAllUsers);
}
function* watchGetUsersForComment() {
  yield takeLatest(getUserForComment, getUserForCommentSage);
}

function* watchUpdateUser() {
  yield takeLatest(updateUserRequest, updateUser);
}

function* watchUpdateAdmin() {
  yield takeLatest(updateAdminRequest, updateAdmin);
}

function* watchDeleteUser() {
  yield takeLatest(deleteUserRequest, deleteUser);
}

export {
  watchAuth,
  watchLogout,
  watchSignup,
  watchGetAllUsers,
  watchGetUsersForComment,
  watchUpdateUser,
  watchUpdateAdmin,
  watchDeleteUser
};
