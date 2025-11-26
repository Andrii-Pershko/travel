import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries as getCountriesApi, getHotels, getSearchPrices as getSearchPricesApi, searchGeo, startSearchPrices as startSearchPricesApi } from "../../../../api.js";

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

export const startSearchPricesOperation = createAsyncThunk(
    'search/startSearchPricesOperation',
    async (countryID, { rejectWithValue }) => {
        try {
            const response = await startSearchPricesApi(countryID);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue({ ...errorData, status: response.status });
            }

            return response.json();
        }
        catch (error) {
            return rejectWithValue(error.message || 'Failed to start search prices');
        }
    }
)

export const getSearchPricesOperation = createAsyncThunk(
    'search/getSearchPricesOperation',
    async (token, { rejectWithValue }) => {
        try {
            const response = await getSearchPricesApi(token);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue({ ...errorData, status: response.status });
            }

            return response.json();
        }
        catch (error) {
            return rejectWithValue(error.message || 'Failed to get search prices');
        }
    }
)


const waitUntil = (waitUntilTime) => {
    const now = Date.now();
    const waitTime = new Date(waitUntilTime).getTime() - now;
    return waitTime > 0 ? new Promise(resolve => setTimeout(resolve, waitTime)) : Promise.resolve();
}

export const searchPricesWithPolling = createAsyncThunk(
    'search/searchPricesWithPolling',
    async (countryID, { rejectWithValue }) => {
        const MAX_RETRIES = 2;
        let retryCount = 0;

        try {
            const startResponse = await startSearchPricesApi(countryID);
            if (!startResponse.ok) {
                const errorData = await startResponse.json();
                return rejectWithValue({ ...errorData, status: startResponse.status });
            }

            const { token, waitUntil: waitUntilTime } = await startResponse.json();

            await waitUntil(waitUntilTime);

            while (true) {
                try {
                    const getResponse = await getSearchPricesApi(token);

                    if (getResponse.ok) {
                        const data = await getResponse.json();
                        return { token, prices: data.prices || [] };
                    }

                    const errorData = await getResponse.json();

                    if (getResponse.status === 425 && errorData.waitUntil) {
                        await waitUntil(errorData.waitUntil);
                        continue;
                    }

                    if (retryCount < MAX_RETRIES) {
                        retryCount++;
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        continue;
                    }

                    return rejectWithValue({
                        message: errorData.message || 'Failed to get search prices',
                        status: getResponse.status
                    });
                } catch (error) {
                    if (retryCount < MAX_RETRIES) {
                        retryCount++;
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        continue;
                    }
                    return rejectWithValue({
                        message: error.message || 'Failed to get search prices',
                        status: 500
                    });
                }
            }
        } catch (error) {
            return rejectWithValue({ message: error.message || 'Failed to start search prices', status: 500 });
        }
    }
)

export const getHotelsOperation = createAsyncThunk(
    'search/getHotelsOperation',
    async (countryID, { rejectWithValue }) => {
        try {
            const response = await getHotels(countryID);
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue({ ...errorData, status: response.status });
            }

            return response.json();
        }
        catch (error) {
            return rejectWithValue(error.message || 'Failed to get hotels');
        }
    }
)