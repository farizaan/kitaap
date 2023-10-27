import { createSlice } from '@reduxjs/toolkit';
import { IBooksState } from '@/store/books/types';
import reducers from '@/store/books/reducers';
const initialState: IBooksState = {};
export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers,
});

const { reducer } = booksSlice;
export { reducer as booksReducer };
