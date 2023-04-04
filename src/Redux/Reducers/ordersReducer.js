import * as types from '../ActionTypes/ordersActionTypes';

const initialState = {
    orders: [],
    orderList: [],
    singleOrder: [],
    trackerOrders: [],
    isLoading: false,
}

const ordersReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.GET_ALL_ORDERS_START:
        case types.CREATE_ORDERS_START:
        case types.UPDATE_ORDER_START:
        case types.DELETE_ORDER_START:
        case types.GET_ALL_ORDER_LIST_START:
        case types.UPDATE_ORDER_STATUS_START:
        case types.GET_FILTER_ORDERS_START:
        case types.GET_SINGLE_ORDERS_START:
        case types.GET_ALL_TRACKERS_ORDERS_START:
        case types.ON_PAGE_CHANGE_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.GET_ALL_ORDERS_SUCCESS:
        case types.UPDATE_ORDER_SUCCESS:
        case types.DELETE_ORDER_SUCCESS:
        case types.UPDATE_ORDER_STATUS_SUCCESS:
        case types.GET_FILTER_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                isLoading: false,
            };
        case types.GET_SINGLE_ORDERS_SUCCESS:
            return {
                ...state,
                singleOrder: action.payload,
                isLoading: false,
            }
        case types.GET_ALL_TRACKERS_ORDERS_SUCCESS:
        case types.ON_PAGE_CHANGE_SUCCESS:
            return {
                ...state,
                trackerOrders: action.payload,
                isLoading: false,
            }
        // case types.ON_PAGE_CHANGE_SUCCESS:
        //     return {
        //         ...state,
        //         trackerOrders: action.payload,
        //     }
        case types.CREATE_ORDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case types.GET_ALL_ORDER_LIST_SUCCESS:
            return{
                ...state,
                orderList: action.payload,
                isLoading: false,
            }
        case types.GET_ALL_ORDERS_ERROR:
        case types.CREATE_ORDERS_ERROR:
        case types.UPDATE_ORDER_ERROR:
        case types.DELETE_ORDER_ERROR:
        case types.GET_ALL_ORDERS_LIST_ERROR:
        case types.UPDATE_ORDER_STATUS_ERROR:
        case types.GET_FILTER_ORDERS_ERROR:
        case types.GET_SINGLE_ORDERS_ERROR:
        case types.GET_ALL_TRACKERS_ORDERS_ERROR:
        case types.ON_PAGE_CHANGE_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
        }
};
    
export default ordersReducer;