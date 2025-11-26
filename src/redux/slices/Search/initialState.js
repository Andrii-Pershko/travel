export const initialState = {
    countries: [],
    loading: false,
    error: null,

    searchGeo: [],
    loadingSearchGeo: false,
    errorSearchGeo: null,

    token: null,
    waitUntil: null,
    tours: [],
    loadingSearchPrices: false,
    errorSearchPrices: null,
    retryCount: 0,
    hasSearched: false,

    hotels: [],
    loadingHotels: false,
    errorHotels: null,

    cancelingSearchPrices: false,
    errorCancelingSearchPrices: null,
}