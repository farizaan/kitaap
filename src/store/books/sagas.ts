import { IBooksServicePayload } from '@/store/books/types';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { getBooksService } from '@/store/books/services';
import { getBooksFailed, getBooksInit, getBooksSucceed } from '@/store/books/actions';
import { alertService } from '@/services/alertService';

function* handleFetchBooks(action: { payload: IBooksServicePayload }) {
  try {
    const { data } = yield call(getBooksService, action.payload);
    yield put(getBooksSucceed({ books: data.message, b_type: action.payload.search }));
  } catch (error) {
    alertService.error('Something went wrong');
    getBooksFailed();
  }
}

const booksSagas = [takeLatest(getBooksInit, handleFetchBooks)];
export default booksSagas;
