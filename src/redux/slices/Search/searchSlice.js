import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./initialState"
import { getCountries, getSearchGeo } from "./operation";
import { handleFulfilledGetCountries, handleFulfilledGetSearchGeo, handlePendingGetCountries, handlePendingGetSearchGeo, handleRejectedGetCountries, handleRejectedGetSearchGeo } from "./functions";

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
    },
});

export const searchReducer = searchSlice.reducer;