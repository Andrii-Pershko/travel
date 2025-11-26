import { combineReducers } from '@reduxjs/toolkit';
import { searchReducer } from './slices/Search';
import { tourReducer } from './slices/Tour';

const reducer = combineReducers({
    search: searchReducer,
    tour: tourReducer,
});

export default reducer;