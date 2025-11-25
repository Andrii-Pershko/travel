import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./initialState"
import { getCountries } from "./operation";
import { handleFulfilledGetCountries, handlePendingGetCountries, handleRejectedGetCountries } from "./functions";

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCountries.pending, handlePendingGetCountries)
            .addCase(getCountries.rejected, handleRejectedGetCountries)
            .addCase(getCountries.fulfilled, handleFulfilledGetCountries)
    },
});

export const searchReducer = searchSlice.reducer;