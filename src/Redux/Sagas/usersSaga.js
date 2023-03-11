import * as types from "../ActionTypes/usersActionTypes";
import { takeLatest, put, all, fork, call, take } from "redux-saga/effects";
import Swal from "sweetalert2";

import {  
    loginUsersError,
    loginUsersSuccess,
    getAllUsersError,
    getAllUsersSuccess,
    registerUserSuccess,
    registerUserError,
    updateUserSuccess,
    updateUserError,
    getUserByRoleSuccess,
    getUserByRoleError,
    changePasswordSuccess,
    changePasswordError,
    forgotPasswordSuccess,
    forgotPasswordError,
    resetPasswordSuccess,
    resetPasswordError,
    deleteUserSuccess,
    deleteUserError,
} from "../Actions/usersActions";

import { 
    loginUsersApi,
    loadUsersApi, 
    registerUserApi,
    updateUserApi,
    getUserBYRoleApi,
    ChangePasswordApi,
    forgotPasswordApi,
    resetPasswordApi,
    deleteUserApi
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
        if (response.data.message === "Login successful") {
            localStorage.setItem('MPCADMIN', JSON.stringify(response.data.data))
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

export function* onChangePasswordAsyncStart ({payload}) {
    try {
        const response = yield call(ChangePasswordApi, payload);
        if (response.data.success === true) {
            yield put(changePasswordSuccess(response.data))
            Toast.fire({
                icon: "success",
                title: response.data.message,
            }) ;
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch(error) {
        yield put(changePasswordError(error.response));
    }
}

export function* onChangePassword() {
    yield takeLatest(types.CHANGE_PASSWORD_START, onChangePasswordAsyncStart);
}

export function* onForgotPasswordAsyncStart ({payload}) {
    try {
        const response = yield call(forgotPasswordApi, payload);
        if (response.data.success === true) {
            yield put(forgotPasswordSuccess(response.data))
            Toast.fire({
                icon: "success",
                title: response.data.message,
            }) ;
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch(error) {
        yield put(forgotPasswordError(error.response));
    }
}

export function* onForgotPassword() {
    yield takeLatest(types.FORGOT_PASSWORD_START, onForgotPasswordAsyncStart);
}

export function* onResetPasswordAsyncStart ({payload}) {
    try {
        const response = yield call(resetPasswordApi, payload);
        if (response.data.status === 200) {
            yield put(resetPasswordSuccess(response.data))
            Toast.fire({
                icon: "success",
                title: response.data.message,
            }) ;
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch(error) {
        yield put(resetPasswordError(error.response));
    }
}

export function* onResetPassword() {
    yield takeLatest(types.RESET_PASSWORD_START, onResetPasswordAsyncStart);
}

export function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadUsersApi);
        if (response.data.success === true) {
            yield put(getAllUsersSuccess(response.data));
        }
    } catch (error) {
        yield put(getAllUsersError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onLoadUsers() {
    yield takeLatest(types.GET_ALL_USERS_START, onLoadUsersStartAsync);
}

export function* onRegisterStartAsync ({payload}) {
    try {
        const response = yield call(registerUserApi, payload);
        if (response.data.success === true) {
            yield put(registerUserSuccess(response.data))
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } 
    } catch (error) {
        yield put(registerUserError(error.response))
        if(error.response.data.errors?.userName) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors?.userName,
            });
        } else if(error.response.data.errors?.phone) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors?.phone,
            });
        } else if(error.response.data.errors?.address) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors?.address,
            });
        } else if(error.response.data.errors?.password) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors?.password,
            });
        } else if(error.response.data.errors?.confirmPassword) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors?.confirmPassword,
            });
        } else if(error.response.data.errors?.email) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors?.email,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: error.response.data.message,
            })
        }
        
    }
}

export function* onRegisterUser() {
    yield takeLatest(types.REGISTER_USER_START, onRegisterStartAsync);
}

export function* onUpdateUserStartAsync ({payload}) {
    try {
        const response = yield call(updateUserApi, payload);
        if (response.data.success === true) {
            yield put(updateUserSuccess(response.data))
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(updateUserError(error.response))
        if(error.response.data.errors.userName) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.userName,
            });
        } else if(error.response.data.errors.phone) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.phone,
            });
        } else if(error.response.data.errors.address) {
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.address,
            });
        }
    }
}

export function* onUpdateUser() {
    yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

export function* onDeleteUserStartAsync ({payload}) {
    try {
        const response = yield call(deleteUserApi, payload);
        if (response.data.success === true) {
            yield put(deleteUserSuccess(response.data))
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        }  else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(deleteUserError(error.response))
    }
}

export function* onDeleteUser() {
    yield takeLatest(types.DELETE_USER_START, onDeleteUserStartAsync);
}

export function* onGetUserByRoleStartAsync ({payload}) {
    try {
        console.log("PAYLOAD~~~>>>", payload)
        const response = yield call(getUserBYRoleApi, payload);
        console.log("RESPOSNE~~>>>>", response)
        if (response.data.success === true) {
            yield put(getUserByRoleSuccess(response.data))
        }
    } catch (error) {
        yield put(getUserByRoleError(error.response))
    }
}

export function* onGetUserByRole() {
    yield takeLatest(types.GET_USER_BYROLE_START, onGetUserByRoleStartAsync);
}

const userSagas = [
    fork(onLoadUsers), 
    fork(onChangePassword),
    fork(onForgotPassword),
    fork(onResetPassword),
    fork(onUserLogin),
    fork(onRegisterUser),
    fork(onUpdateUser),
    fork(onDeleteUser),
    fork(onGetUserByRole),
];

export default function* userSaga() {
    yield all([...userSagas]);
}
