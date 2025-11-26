export const selectCountries = (state) => state.search.countries;
export const selectLoading = (state) => state.search.loading;
export const selectError = (state) => state.search.error;

export const selectSearchGeo = (state) => state.search.searchGeo;
export const selectLoadingSearchGeo = (state) => state.search.loadingSearchGeo;
export const selectErrorSearchGeo = (state) => state.search.errorSearchGeo;

export const selectToken = (state) => state.search.token;
export const selectWaitUntil = (state) => state.search.waitUntil;
export const selectLoadingSearchPrices = (state) => state.search.loadingSearchPrices;
export const selectErrorSearchPrices = (state) => state.search.errorSearchPrices;

export const selectTours = (state) => state.search.tours;
export const selectRetryCount = (state) => state.search.retryCount;
export const selectHasSearched = (state) => state.search.hasSearched;

export const selectHotels = (state) => {
    const tours = state.search.tours;
    const hotels = state.search.hotels;
    const countries = state.search.countries;

    if (tours.length === 0 || hotels.length === 0) {
        return [];
    }

    const preparedHotelInfo = tours.map((tour) => {

        const hotel = hotels.find((hotel) => hotel.id === Number(tour.hotelID));
        const country = countries.find((country) => country.name === hotel?.countryName);

        return {
            id: tour.id,
            amount: tour.amount,
            currency: tour.currency,
            startDate: tour.startDate,
            endDate: tour.endDate,
            hotel: hotel,
            flagCountry: country?.flag,
        }
    })

    return preparedHotelInfo;
}
export const selectLoadingHotels = (state) => state.search.loadingHotels;
export const selectErrorHotels = (state) => state.search.errorHotels;
export const selectCancelingSearchPrices = (state) => state.search.cancelingSearchPrices;
export const selectErrorCancelingSearchPrices = (state) => state.search.errorCancelingSearchPrices;