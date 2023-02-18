import * as types from '../ActionTypes/ordersActionTypes';

const initialState = {
    orders: [],
}

const ordersReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.GET_ALL_ORDERS_START:
        case types.CREATE_ORDERS_START:
        case types.UPDATE_ORDER_START:
        case types.DELETE_ORDER_START:
        case types.UPDATE_ORDER_STATUS_START:
            return {
                ...state,
            };
        case types.GET_ALL_ORDERS_SUCCESS:
        case types.UPDATE_ORDER_SUCCESS:
        case types.DELETE_ORDER_SUCCESS:
            case types.UPDATE_ORDER_STATUS_SUCCESS:
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
        case types.UPDATE_ORDER_ERROR:
        case types.DELETE_ORDER_ERROR:
        case types.UPDATE_ORDER_STATUS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
        }
};
    
export default ordersReducer;