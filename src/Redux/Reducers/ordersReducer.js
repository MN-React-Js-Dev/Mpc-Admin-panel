import * as types from '../ActionTypes/ordersActionTypes';

const initialState = {
    orders: [],
}

const ordersReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.GET_ALL_ORDERS_START:
        case types.CREATE_ORDERS_START:
            return {
                ...state,
            };
        case types.GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
            };
        case types.CREATE_ORDERS_SUCCESS:
            return {
                ...state,
            }
        case types.GET_ALL_ORDERS_ERROR:
        case types.CREATE_ORDERS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
        }
};
    
export default ordersReducer;