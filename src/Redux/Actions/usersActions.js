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