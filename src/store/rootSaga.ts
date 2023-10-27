import { all } from '@redux-saga/core/effects';
import booksSagas from '@/store/books/sagas';

export default function* rootSaga() {
  yield all([...booksSagas]);
}
