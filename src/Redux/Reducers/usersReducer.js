
import * as types from '../ActionTypes/usersActionTypes';

const initialState = {
    loginUser: [],
    users: [],
}

const usersReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.LOGIN_USERS_START:
        case types.GET_ALL_USERS_START:
            return {
                ...state,
            };
        case types.LOGIN_USERS_SUCCESS:
            return {
                ...state,
                loginUser: action.payload,
            }
        case types.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
            };
        case types.LOGIN_USERS_ERROR:
        case types.GET_ALL_USERS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default usersReducer;