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

export const handlePendingStartSearchPrices = (state) => {
    state.loadingSearchPrices = true;
    state.errorSearchPrices = null;
};

export const handleFulfilledStartSearchPrices = (state, action) => {
    state.loadingSearchPrices = false;
    state.token = action.payload.token;
    state.waitUntil = action.payload.waitUntil;
    state.errorSearchPrices = null;
};

export const handleRejectedStartSearchPrices = (state, action) => {
    state.loadingSearchPrices = false;
    state.errorSearchPrices = action.payload;
};

export const handlePendingGetSearchPrices = (state) => {
    state.loadingSearchPrices = true;
    state.errorSearchPrices = null;
};

export const handleFulfilledGetSearchPrices = (state, action) => {
    state.loadingSearchPrices = false;
    state.tours = action.payload;
    state.errorSearchPrices = null;
};

export const handleRejectedGetSearchPrices = (state, action) => {
    state.loadingSearchPrices = false;
    state.errorSearchPrices = action.payload;
};

export const handlePendingSearchPricesWithPolling = (state) => {
    state.loadingSearchPrices = true;
    state.errorSearchPrices = null;
    state.retryCount = 0;
    state.tours = [];
    state.hotels = []; // Очищаємо готелі при новому пошуку
    state.hasSearched = true;
};

export const handleFulfilledSearchPricesWithPolling = (state, action) => {
    state.loadingSearchPrices = false;

    const prices = action.payload.prices || [];
    state.tours = Array.isArray(prices) ? prices : Object.values(prices);
    state.token = action.payload.token;
    state.errorSearchPrices = null;
    state.retryCount = 0;
    state.hasSearched = true;
};

export const handleRejectedSearchPricesWithPolling = (state, action) => {
    state.loadingSearchPrices = false;
    // Якщо пошук був скасований, не показуємо помилку
    if (action.payload?.status === 'CANCELLED') {
        state.errorSearchPrices = null;
        state.token = null;
    } else {
        state.errorSearchPrices = action.payload;
        state.retryCount = (state.retryCount || 0) + 1;
    }
    state.hasSearched = true;
};

export const handlePendingGetHotels = (state) => {
    state.loadingHotels = true;
    state.errorHotels = null;
    state.hotels = []; // Очищаємо готелі перед новим запитом
};

export const handleFulfilledGetHotels = (state, action) => {
    state.loadingHotels = false;

    const hotelsData = action.payload;

    let hotelsArray = [];
    if (Array.isArray(hotelsData)) {
        hotelsArray = hotelsData;
    } else if (hotelsData && typeof hotelsData === 'object') {
        hotelsArray = Object.values(hotelsData);
    }

    state.hotels = hotelsArray;
    state.errorHotels = null;
};

export const handleRejectedGetHotels = (state, action) => {
    state.loadingHotels = false;
    state.errorHotels = action.payload;
};

export const handlePendingStopSearchPrices = (state) => {
    state.cancelingSearchPrices = true;
    state.errorCancelingSearchPrices = null;
};

export const handleFulfilledStopSearchPrices = (state) => {
    state.cancelingSearchPrices = false;
    state.errorCancelingSearchPrices = null;
    state.token = null;
    state.waitUntil = null;
    state.tours = [];
    state.hasSearched = false;
    state.retryCount = 0;
    state.hotels = [];
    state.loadingHotels = false;
    state.errorHotels = null;
};

export const handleRejectedStopSearchPrices = (state, action) => {
    state.cancelingSearchPrices = false;
    state.errorCancelingSearchPrices = action.payload;
};