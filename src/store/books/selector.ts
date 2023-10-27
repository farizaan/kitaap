import { RootState } from '@/store/store';
import { booksReducer } from '@/store/books/index';
import { createSelector } from 'reselect';

const getBooksInitialState = (state: RootState) =>
  state.booksReducer ? { ...state.booksReducer } : {};
export const getPopularBooks = createSelector([getBooksInitialState], (state) => {
  return state.popularBooks;
});
