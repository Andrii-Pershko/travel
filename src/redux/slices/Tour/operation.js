import { createAsyncThunk } from "@reduxjs/toolkit";
import { getHotel, getPrice } from "../../../../api";

export const getPriceOperation = createAsyncThunk(
    'tour/getPriceOperation',
    async (priceId, { rejectWithValue }) => {
        try {
            const response = await getPrice(priceId);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue({ ...errorData, status: response.status });
            }

            return response.json();
        }
        catch (error) {
            return rejectWithValue(error.message || 'Failed to get price');
        }
    }
)

export const getHotelOperation = createAsyncThunk(
    'tour/getHotelOperation',
    async (hotelId, { rejectWithValue }) => {
        try {
            const response = await getHotel(hotelId);

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue({ ...errorData, status: response.status });
            }

            return response.json();
        }
        catch (error) {
            return rejectWithValue(error.message || 'Failed to get hotel');
        }
    }
)