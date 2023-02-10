import * as types from "../ActionTypes/ordersActionTypes";
import { takeLatest, put, all, fork, call, take } from "redux-saga/effects";
import Swal from "sweetalert2";
import { createOrdersApi, deleteOrderApi, loadOrdersApi, updateOrderApi } from "../APIs/ordersApi";

import { createOrdersError, createOrdersSuccess, deleteOrderError, deleteOrderSuccess, getAllOrdersError, getAllOrdersSuccess, updateOrderError, updateOrderSuccess } from "../Actions/ordersActions";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});

export function* onLoadOrdersStartAsync() {
    try {
        const response = yield call(loadOrdersApi);
        if (response.data.success === true) {
            yield put(getAllOrdersSuccess(response.data));
        }
    } catch (error) {
        yield put(getAllOrdersError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onLoadOrders() {
    yield takeLatest(types.GET_ALL_ORDERS_START, onLoadOrdersStartAsync);
}

export function* onSubmitOrderStartAsync ({payload}) {
    try {
        const response = yield call(createOrdersApi, payload);
        if (response.data.success === true) {
            yield put(createOrdersSuccess(response.data))
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(createOrdersError(error.response))
    }
}

export function* onSubmitOrder() {
    yield takeLatest(types.CREATE_ORDERS_START, onSubmitOrderStartAsync);
}

export function* onUpdateOrderStartAsync ({payload}) {
    try {
        const response = yield call(updateOrderApi, payload);
        if (response.data.success === true) {
            yield put(updateOrderSuccess(response.data))
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
        yield put(updateOrderError(error.response))
    }
}

export function* onUpdateOrder() {
    yield takeLatest(types.UPDATE_ORDER_START, onUpdateOrderStartAsync);
}

export function* onDeleteOrderStartAsync ({payload}) {
    try {
        const response = yield call(deleteOrderApi, payload);
        console.log("DELETE RESPOSNE~~~>>>", response)
        if (response.data.success === true) {
            yield put(deleteOrderSuccess(response.data))
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
        yield put(deleteOrderError(error.response))
    }
}

export function* onDeleteOrder() {
    yield takeLatest(types.DELETE_ORDER_START, onDeleteOrderStartAsync);
}


const orderSagas = [
    fork(onLoadOrders), 
    fork(onSubmitOrder),
    fork(onUpdateOrder),
    fork(onDeleteOrder),
];

export default function* orderSaga() {
    yield all([...orderSagas]);
}
