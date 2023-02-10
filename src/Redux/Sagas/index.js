import { all } from 'redux-saga/effects';
import orderSaga from './ordersSaga';
import userSaga from './usersSaga';


export default function* rootSaga() {
   yield all([
        userSaga(),
        orderSaga(),
   ]);
}