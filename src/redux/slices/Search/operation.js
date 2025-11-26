import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries as getCountriesApi, getHotels, getSearchPrices, searchGeo, startSearchPrices, stopSearchPrices } from "../../../../api.js";

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
            const response = await startSearchPrices(countryID);

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
            const response = await getSearchPrices(token);

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
    async (countryID, { rejectWithValue, signal, dispatch }) => {
        const MAX_RETRIES = 2;
        let retryCount = 0;

        // Функція для перевірки скасування
        const checkCancelled = () => {
            if (signal?.aborted) {
                throw new Error('Search cancelled');
            }
        };

        try {
            checkCancelled();

            const startResponse = await startSearchPrices(countryID);

            if (!startResponse.ok) {
                const errorData = await startResponse.json();
                return rejectWithValue({ ...errorData, status: startResponse.status });
            }

            const { token, waitUntil: waitUntilTime } = await startResponse.json();

            dispatch(startSearchPricesOperation.fulfilled({ token, waitUntil: waitUntilTime }));

            checkCancelled();

            await waitUntil(waitUntilTime);

            checkCancelled();

            while (true) {
                try {
                    checkCancelled();

                    const getResponse = await getSearchPrices(token);
                    const responseData = await getResponse.json();

                    if (getResponse.ok) {
                        // Конвертуємо prices в масив, якщо це об'єкт
                        const prices = responseData.prices;
                        let pricesArray = [];
                        if (Array.isArray(prices)) {
                            pricesArray = prices;
                        } else if (prices && typeof prices === 'object') {
                            pricesArray = Object.values(prices);
                        }
                        return { token, prices: pricesArray };
                    }

                    const errorData = responseData;

                    if (getResponse.status === 425 && errorData.waitUntil) {
                        await waitUntil(errorData.waitUntil);
                        checkCancelled();
                        continue;
                    }

                    if (retryCount < MAX_RETRIES) {
                        retryCount++;
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        checkCancelled();
                        continue;
                    }

                    return rejectWithValue({
                        message: errorData.message || 'Failed to get search prices',
                        status: getResponse.status
                    });
                } catch (error) {

                    if (error.message === 'Search cancelled') {
                        return rejectWithValue({
                            message: 'Search cancelled',
                            status: 'CANCELLED'
                        });
                    }

                    if (retryCount < MAX_RETRIES) {
                        retryCount++;
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        checkCancelled();
                        continue;
                    }
                    return rejectWithValue({
                        message: error.message || 'Failed to get search prices',
                        status: 500
                    });
                }
            }
        } catch (error) {
            if (error.message === 'Search cancelled') {
                return rejectWithValue({
                    message: 'Search cancelled',
                    status: 'CANCELLED'
                });
            }
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


export const stopSearchPricesOperation = createAsyncThunk(
    'search/stopSearchPricesOperation',
    async (token, { rejectWithValue }) => {
        try {
            const response = await stopSearchPrices(token);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue({ ...errorData, status: response.status });
            }

            return response.json();
        }
        catch (error) {
            return rejectWithValue(error.message || 'Failed to stop search prices');
        }
    }
)