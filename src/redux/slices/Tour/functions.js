export const handlePendingGetPrice = (state) => {
    state.loadingPrice = true;
    state.errorPrice = null;
}

export const handleRejectedGetPrice = (state, action) => {
    state.loadingPrice = false;
    state.errorPrice = action.payload;
    state.price = null;
}

export const handleFulfilledGetPrice = (state, action) => {
    state.loadingPrice = false;
    state.price = action.payload;
    state.errorPrice = null;
}

export const handlePendingGetHotel = (state) => {
    state.loadingHotel = true;
    state.errorHotel = null;
}

export const handleRejectedGetHotel = (state, action) => {
    state.loadingHotel = false;
    state.errorHotel = action.payload;
    state.hotel = null;
}

export const handleFulfilledGetHotel = (state, action) => {
    state.loadingHotel = false;
    state.errorHotel = null;
    state.hotel = action.payload;
}