import * as types from "../ActionTypes/usersActionTypes";

const initialState = {
  loginUser: [],
  users: [],
  usersRole: [],
  isLoading: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USERS_START:
    case types.CHANGE_PASSWORD_START:
    case types.FORGOT_PASSWORD_START:
    case types.RESET_PASSWORD_START:
    case types.GET_ALL_USERS_START:
    case types.REGISTER_USER_START:
    case types.UPDATE_USER_START:
    case types.DELETE_USER_START:
    case types.GET_USER_BYROLE_START:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGIN_USERS_SUCCESS:
      return {
        ...state,
        loginUser: action.payload,
        isLoading: false,
      };
    case types.CHANGE_PASSWORD_SUCCESS:
    case types.FORGOT_PASSWORD_SUCCESS:
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case types.REGISTER_USER_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case types.GET_USER_BYROLE_SUCCESS:
      return {
        ...state,
        usersRole: action.payload,
        isLoading: false,
      };
    case types.LOGIN_USERS_ERROR:
    case types.CHANGE_PASSWORD_ERROR:
    case types.FORGOT_PASSWORD_ERROR:
    case types.RESET_PASSWORD_ERROR:
    case types.GET_ALL_USERS_ERROR:
    case types.REGISTER_USER_ERROR:
    case types.UPDATE_USER_ERROR:
    case types.DELETE_USER_ERROR:
    case types.GET_USER_BYROLE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    default:
      return state;
  }
};

export default usersReducer;
