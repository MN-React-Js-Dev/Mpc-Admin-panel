import * as types from '../ActionTypes/usersActionTypes';

export const loginUsersStart = (user) => ({
    type: types.LOGIN_USERS_START,
    payload: user,
});

export const loginUsersSuccess = (user) => ({
    type: types.LOGIN_USERS_SUCCESS,
    payload: user,
});

export const loginUsersError = (error) => ({
    type: types.LOGIN_USERS_ERROR,
    payload: error,
});

export const changePasswordStart = (data) => ({
    type: types.CHANGE_PASSWORD_START,
    payload: data,
});

export const changePasswordSuccess = (data) => ({
    type: types.CHANGE_PASSWORD_SUCCESS,
    payload: data,
});

export const changePasswordError = (error) => ({
    type: types.CHANGE_PASSWORD_ERROR,
    payload: error,
});

export const forgotPasswordStart = (data) => ({
    type: types.FORGOT_PASSWORD_START,
    payload: data,
});

export const forgotPasswordSuccess = (data) => ({
    type: types.FORGOT_PASSWORD_SUCCESS,
    payload: data,
});

export const forgotPasswordError = (error) => ({
    type: types.FORGOT_PASSWORD_ERROR,
    payload: error,
});

export const resetPasswordStart = (data) => ({
    type: types.RESET_PASSWORD_START,
    payload: data,
});

export const resetPasswordSuccess = (data) => ({
    type: types.RESET_PASSWORD_SUCCESS,
    payload: data,
});

export const resetPasswordError = (error) => ({
    type: types.REGISTER_USER_ERROR,
    payload: error,
})

export const getAllUsersStart = (user) => ({
    type: types.GET_ALL_USERS_START,
    payload: user,
});

export const getAllUsersSuccess = (user) => ({
    type: types.GET_ALL_USERS_SUCCESS,
    payload: user,
});

export const getAllUsersError = (error) => ({
    type: types.GET_ALL_USERS_ERROR,
    payload: error,
});

export const registerUserStart = (user) => ({
    type: types.REGISTER_USER_START,
    payload: user,
});

export const registerUserSuccess = () => ({
    type: types.REGISTER_USER_SUCCESS,
    // payload: user,
});

export const registerUserError = (error) => ({
    type: types.REGISTER_USER_ERROR,
    payload: error,
});

export const updateUserStart = (user) => ({
    type: types.UPDATE_USER_START,
    payload: user,
});

export const updateUserSuccess = (user) => ({
    type: types.UPDATE_USER_SUCCESS,
    payload: user,
});

export const updateUserError = (error) => ({
    type: types.UPDATE_USER_ERROR,
    payload: error,
})

export const getUserByRoleStart = (role) => ({
    type: types.GET_USER_BYROLE_START,
    payload: role,
});

export const getUserByRoleSuccess = (role) => ({
    type: types.GET_USER_BYROLE_SUCCESS,
    payload: role,
});

export const getUserByRoleError = (error) => ({
    type: types.GET_USER_BYROLE_ERROR,
    payload: error,
})