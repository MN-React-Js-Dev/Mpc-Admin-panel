import * as types from '../ActionTypes/ordersActionTypes';

export const getAllOrdersStart = (order) => ({
    type: types.GET_ALL_ORDERS_START,
    payload: order,
});

export const getAllOrdersSuccess = (order) => ({
    type: types.GET_ALL_ORDERS_SUCCESS,
    payload: order,
});

export const getAllOrdersError = (error) => ({
    type: types.GET_ALL_ORDERS_ERROR,
    payload: error,
});

export const createOrdersStart = (order) => ({
    type: types.CREATE_ORDERS_START,
    payload: order,
});

export const createOrdersSuccess = (order) => ({
    type: types.CREATE_ORDERS_SUCCESS,
    payload: order,
});

export const createOrdersError = (error) => ({
    type: types.CREATE_ORDERS_ERROR,
    payload: error,
});

export const updateOrderStart = (order) => ({
    type: types.UPDATE_ORDER_START,
    payload: order,
});

export const updateOrderSuccess = (order) => ({
    type: types.UPDATE_ORDER_SUCCESS,
    payload: order,
});

export const updateOrderError = (error) => ({
    type: types.UPDATE_ORDER_ERROR,
    payload: error,
});

export const updateOrderStatusStart = (order) => ({
    type: types.UPDATE_ORDER_STATUS_START,
    payload: order,
});

export const updateOrderStatusSuccess = (order) => ({
    type: types.UPDATE_ORDER_STATUS_SUCCESS,
    payload: order,
});

export const updateOrderStatusError = (error) => ({
    type: types.UPDATE_ORDER_STATUS_ERROR,
    payload: error,
});

export const deleteOrderStart = (order) => ({
    type: types.DELETE_ORDER_START,
    payload: order,
});

export const deleteOrderSuccess = (order) => ({
    type: types.DELETE_ORDER_SUCCESS,
    payload: order,
});

export const deleteOrderError = (error) => ({
    type: types.DELETE_ORDER_ERROR,
    payload: error,
});

export const getAllOrderListStart = (orderList) => ({
    type: types.GET_ALL_ORDER_LIST_START,
    payload: orderList,
});

export const getAllOrderListSuccess = (orderList) => ({
    type: types.GET_ALL_ORDER_LIST_SUCCESS,
    payload: orderList,
});

export const getAllOrderListError = (error) => ({
    type: types.GET_ALL_ORDERS_LIST_ERROR,
    payload: error,
});