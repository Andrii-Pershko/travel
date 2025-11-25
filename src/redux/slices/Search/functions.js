export const handlePendingGetCountries = (state) => {
    state.loading = true;
    state.error = null;
};

export const handleFulfilledGetCountries = (state, action) => {
    state.loading = false;
    state.countries = Object.values(action.payload);
    state.error = null;
};

export const handleRejectedGetCountries = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

