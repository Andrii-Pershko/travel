import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./initialState"
import { getCountries, getHotelsOperation, getSearchGeo, getSearchPricesOperation, searchPricesWithPolling, startSearchPricesOperation, stopSearchPricesOperation } from "./operation";
import { handleFulfilledGetCountries, handleFulfilledGetHotels, handleFulfilledGetSearchGeo, handleFulfilledGetSearchPrices, handleFulfilledSearchPricesWithPolling, handleFulfilledStartSearchPrices, handlePendingGetCountries, handlePendingGetHotels, handlePendingGetSearchGeo, handlePendingGetSearchPrices, handlePendingSearchPricesWithPolling, handlePendingStartSearchPrices, handleRejectedGetCountries, handleRejectedGetHotels, handleRejectedGetSearchGeo, handleRejectedGetSearchPrices, handleRejectedSearchPricesWithPolling, handleRejectedStartSearchPrices, handlePendingStopSearchPrices, handleFulfilledStopSearchPrices, handleRejectedStopSearchPrices } from "./functions";

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCountries.pending, handlePendingGetCountries)
            .addCase(getCountries.rejected, handleRejectedGetCountries)
            .addCase(getCountries.fulfilled, handleFulfilledGetCountries)
            .addCase(getSearchGeo.pending, handlePendingGetSearchGeo)
            .addCase(getSearchGeo.rejected, handleRejectedGetSearchGeo)
            .addCase(getSearchGeo.fulfilled, handleFulfilledGetSearchGeo)
            .addCase(startSearchPricesOperation.pending, handlePendingStartSearchPrices)
            .addCase(startSearchPricesOperation.rejected, handleRejectedStartSearchPrices)
            .addCase(startSearchPricesOperation.fulfilled, handleFulfilledStartSearchPrices)
            .addCase(getSearchPricesOperation.pending, handlePendingGetSearchPrices)
            .addCase(getSearchPricesOperation.rejected, handleRejectedGetSearchPrices)
            .addCase(getSearchPricesOperation.fulfilled, handleFulfilledGetSearchPrices)
            .addCase(searchPricesWithPolling.pending, handlePendingSearchPricesWithPolling)
            .addCase(searchPricesWithPolling.rejected, handleRejectedSearchPricesWithPolling)
            .addCase(searchPricesWithPolling.fulfilled, handleFulfilledSearchPricesWithPolling)
            .addCase(stopSearchPricesOperation.pending, handlePendingStopSearchPrices)
            .addCase(stopSearchPricesOperation.rejected, handleRejectedStopSearchPrices)
            .addCase(stopSearchPricesOperation.fulfilled, handleFulfilledStopSearchPrices)
            .addCase(getHotelsOperation.pending, handlePendingGetHotels)
            .addCase(getHotelsOperation.rejected, handleRejectedGetHotels)
            .addCase(getHotelsOperation.fulfilled, handleFulfilledGetHotels)
    },
});

export const searchReducer = searchSlice.reducer;