import { combineReducers } from 'redux';
import { booksReducer } from '@/store/books';

const rootReducer = combineReducers({
  booksReducer,
});

export default rootReducer;
