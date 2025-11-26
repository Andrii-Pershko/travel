import { createSlice } from "@reduxjs/toolkit";
import { handleFulfilledGetHotel, handleFulfilledGetPrice, handlePendingGetHotel, handlePendingGetPrice, handleRejectedGetHotel, handleRejectedGetPrice } from "./functions";
import { initialState } from "./initialState";
import { getHotelOperation, getPriceOperation } from "./operation";

export const tourSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPriceOperation.pending, handlePendingGetPrice)
            .addCase(getPriceOperation.rejected, handleRejectedGetPrice)
            .addCase(getPriceOperation.fulfilled, handleFulfilledGetPrice)
            .addCase(getHotelOperation.pending, handlePendingGetHotel)
            .addCase(getHotelOperation.rejected, handleRejectedGetHotel)
            .addCase(getHotelOperation.fulfilled, handleFulfilledGetHotel)
    },
});

export const tourReducer = tourSlice.reducer;