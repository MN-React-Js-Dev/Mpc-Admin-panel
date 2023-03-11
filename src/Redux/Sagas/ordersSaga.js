import * as types from "../ActionTypes/ordersActionTypes";
import { takeLatest, put, all, fork, call, take } from "redux-saga/effects";
import Swal from "sweetalert2";
import { createOrdersApi, deleteOrderApi, loadAllTrackersOrderApi, loadFilterOrdersApi, loadOrderListApi, loadOrdersApi, loadSingleOrdersApi, pageChangeApi, updateOrderApi, updateOrderStausApi } from "../APIs/ordersApi";

import { createOrdersError, createOrdersSuccess, deleteOrderError, deleteOrderSuccess, getAllOrderListError, getAllOrderListSuccess, getAllOrdersError, getAllOrdersSuccess, getAllTrackersOrdersError, getAllTrackersOrdersSuccess, getFilterOrdersError, getFilterOrdersSuccess, getSingleOrdersError, getSingleOrdersSuccess, onPageChangeError, onPageChangeSuccess, updateOrderError, updateOrderStatusError, updateOrderStatusSuccess, updateOrderSuccess } from "../Actions/ordersActions";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});

export function* onLoadOrdersStartAsync() {
    try {
        const response = yield call(loadOrdersApi);
        // console.log('RESPONSE~~~~~>>', response.data)
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

export function* onUpdateOrderStatusStartAsync ({payload}) {
    try {
        const response = yield call(updateOrderStausApi, payload);
        if (response.data.success === true) {
            yield put(updateOrderStatusSuccess(response.data))
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
        yield put(updateOrderStatusError(error.response))
    }
}

export function* onUpdateOrderStatus() {
    yield takeLatest(types.UPDATE_ORDER_STATUS_START, onUpdateOrderStatusStartAsync);
}

export function* onDeleteOrderStartAsync ({payload}) {
    try {
        const response = yield call(deleteOrderApi, payload);
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


export function* onLoadOrderListStartAsync() {
    try {
        const response = yield call(loadOrderListApi);
        if (response.data.success === true) {
            yield put(getAllOrderListSuccess(response.data));
        }
    } catch (error) {
        yield put(getAllOrderListError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onLoadOrderList() {
    yield takeLatest(types.GET_ALL_ORDER_LIST_START, onLoadOrderListStartAsync);
}

export function* onLoadFilterOrderListStartAsync({payload}) {
    try {
        const response = yield call(loadFilterOrdersApi, payload);
        if (response.data.success === true) {
            yield put(getFilterOrdersSuccess(response.data));
        }
    } catch (error) {
        yield put(getFilterOrdersError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onLoadFilterOrderList() {
    yield takeLatest(types.GET_FILTER_ORDERS_START, onLoadFilterOrderListStartAsync);
}


export function* onSingleOrderStartAsync({payload}) {
    try {
        const response = yield call(loadSingleOrdersApi, payload);
        if (response.data.success === true) {
            yield put(getSingleOrdersSuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleOrdersError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onSingleOrderList() {
    yield takeLatest(types.GET_SINGLE_ORDERS_START, onSingleOrderStartAsync);
}


export function* onTrackerOrderStartAsync() {
    try {
        const response = yield call(loadAllTrackersOrderApi);
        if(response) {
            localStorage.setItem("TRACKER",response.data?.userToken )
        }
        yield put(getAllTrackersOrdersSuccess(response.data));
    } catch (error) {
        yield put(getAllTrackersOrdersError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onTrackerOrderList() {
    yield takeLatest(types.GET_ALL_TRACKERS_ORDERS_START, onTrackerOrderStartAsync);
}


export function* onPageChangeStartAsync({payload}) {
    try {
        const response = yield call(pageChangeApi, payload);
        yield put(onPageChangeSuccess(response.data));
    } catch (error) {
        yield put(onPageChangeError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.message,
        });
    }
}

export function* onPageChange() {
    yield takeLatest(types.ON_PAGE_CHANGE_START, onPageChangeStartAsync);
}

const orderSagas = [
    fork(onLoadOrders), 
    fork(onSubmitOrder),
    fork(onUpdateOrder),
    fork(onUpdateOrderStatus),
    fork(onDeleteOrder),
    fork(onLoadOrderList),
    fork(onLoadFilterOrderList),
    fork(onSingleOrderList),
    fork(onTrackerOrderList),
    fork(onPageChange),
];

export default function* orderSaga() {
    yield all([...orderSagas]);
}
