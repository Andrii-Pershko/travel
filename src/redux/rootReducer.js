import { combineReducers } from '@reduxjs/toolkit';
import { searchReducer } from './slices/Search';

const reducer = combineReducers({
    search: searchReducer,
});

export default reducer;