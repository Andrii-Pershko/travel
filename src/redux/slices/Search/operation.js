import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries as getCountriesApi } from "../../../../api.js";

export const getCountries = createAsyncThunk(
    'search/getCountries', 
    async (_, { rejectWithValue }) => {
    try {
        const response = await getCountriesApi();
        
        if (!response.ok) {
            return rejectWithValue(await response.json());
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to fetch countries');
    }
});