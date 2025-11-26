export const selectCountries = (state) => state.search.countries;
export const selectLoading = (state) => state.search.loading;
export const selectError = (state) => state.search.error;

export const selectSearchGeo = (state) => state.search.searchGeo;
export const selectLoadingSearchGeo = (state) => state.search.loadingSearchGeo;
export const selectErrorSearchGeo = (state) => state.search.errorSearchGeo;