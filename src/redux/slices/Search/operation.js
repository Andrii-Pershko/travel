import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries as getCountriesApi, searchGeo } from "../../../../api.js";

export const getCountries = createAsyncThunk(
    'search/getCountries',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCountriesApi();

            if (!response.ok) {
                return rejectWithValue(await response.json());
            }

            return response.json();
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch countries');
        }
    });

export const getSearchGeo = createAsyncThunk(
    'search/searchGeo',
    async (query, { rejectWithValue }) => {
        try {

            const response = await searchGeo(query);
            
            if (!response.ok) {
                return rejectWithValue(response.json());
            }

            return response.json();
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to search geo');
        }
    }
)