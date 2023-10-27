import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IBooksServicePayload, IBooksState } from '@/store/books/types';
import { booksSlice } from '@/store/books/index';

const getBooksInit: CaseReducer<IBooksState, PayloadAction<IBooksServicePayload>> = (
  _state,
  _action
) => {
  _state.loading = true;
};
const getBooksSucceed: CaseReducer<IBooksState, PayloadAction<any>> = (_state, _action) => {
  const {
    payload: { books, b_type },
  } = _action;
  _state.loading = false;
  if (b_type === '/popularnow') {
    _state.popularBooks = books;
    return;
  }
  _state.books = books;
};
const getBooksFailed: CaseReducer<IBooksState> = (_state, _action) => {
  _state.loading = false;
};

export default {
  getBooksInit,
  getBooksSucceed,
  getBooksFailed,
};
