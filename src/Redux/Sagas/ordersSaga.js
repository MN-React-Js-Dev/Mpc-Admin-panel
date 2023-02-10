import * as types from "../ActionTypes/ordersActionTypes";
import { takeLatest, put, all, fork, call, take } from "redux-saga/effects";
import Swal from "sweetalert2";
import { createOrdersApi, loadOrdersApi } from "../APIs/ordersApi";

import { createOrdersError, createOrdersSuccess, getAllOrdersError, getAllOrdersSuccess } from "../Actions/ordersActions";

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
    console.log("ORDER PAYLOAD~~~>>>>>>>", payload)
    try {
        const response = yield call(createOrdersApi, payload);
        console.log("RESPOSNE~~~>>>", response)
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

const orderSagas = [
    fork(onLoadOrders), 
    fork(onSubmitOrder),
];

export default function* orderSaga() {
    yield all([...orderSagas]);
}
