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