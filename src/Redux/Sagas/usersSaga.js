import * as types from "../ActionTypes/usersActionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {  
    loginUsersError,
    loginUsersSuccess,
    getAllUsersError,
    getAllUsersSuccess,
} from "../Actions/usersActions";

import { 
    loginUsersApi,
    loadUsersApi 
} from "../APIs/usersApi";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});

export function* onUserLoginStartAsync({payload}) {
    try {
        const response = yield call(loginUsersApi, payload);
        console.log("RES~~~>>",response)
        if (response.data.message === "Login successful") {
            sessionStorage.setItem('MPC_ADMIN', JSON.stringify(response.data.data.token))
            yield put(loginUsersSuccess(response.data))
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else{
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(loginUsersError(error.response))
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onUserLogin() {
    yield takeLatest(types.LOGIN_USERS_START, onUserLoginStartAsync);
}

export function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadUsersApi);
        if (response.data.success === true) {
            yield put(getAllUsersSuccess(response.data));
        }
    } catch (error) {
        yield put(getAllUsersError(error.response));
    }
}

export function* onLoadUsers() {
    yield takeLatest(types.GET_ALL_USERS_START, onLoadUsersStartAsync);
}

const userSagas = [
    fork(onLoadUsers), 
    fork(onUserLogin),
];

export default function* userSaga() {
    yield all([...userSagas]);
}
