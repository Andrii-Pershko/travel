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

export const handlePendingGetSearchGeo = (state) => {
    state.loadingSearchGeo = true;
    state.errorSearchGeo = null;
};

export const handleFulfilledGetSearchGeo = (state, action) => {
    state.loadingSearchGeo = false;
    state.searchGeo = Object.values(action.payload);
    state.errorSearchGeo = null;
};

export const handleRejectedGetSearchGeo = (state, action) => {
    state.loadingSearchGeo = false;
    state.errorSearchGeo = action.payload;
};