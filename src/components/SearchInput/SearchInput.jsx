import { getCountries, getSearchGeo, searchPricesWithPolling, selectLoadingSearchGeo, selectLoadingSearchPrices, selectErrorSearchPrices, selectTours, selectHasSearched, getHotelsOperation, selectHotels } from "@/redux/slices/Search"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import DropDownList from "./DropDownList"

export default function SearchInput() {
    const [search, setSearch] = useState('')
    const [isOpenDropDown, setIsOpenDropDown] = useState(false)
    const [selectedType, setSelectedType] = useState(null)
    const [countryID, setCountryID] = useState(null)

    const loadingSearchGeo = useSelector(selectLoadingSearchGeo)
    const loadingSearchPrices = useSelector(selectLoadingSearchPrices)
    const errorSearchPrices = useSelector(selectErrorSearchPrices)
    const tours = useSelector(selectTours)
    const hasSearched = useSelector(selectHasSearched)
    const hotels = useSelector(selectHotels)

    console.log("hotels", hotels)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSearch = () => {
        dispatch(getCountries())
        setIsOpenDropDown(true)
    }

    const handleBlur = () => {
        setIsOpenDropDown(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!countryID) {
            return
        }
        const result = await dispatch(searchPricesWithPolling(countryID))

        if (result.meta.requestStatus === 'fulfilled') {
            dispatch(getHotelsOperation(countryID))
        }

    }

    const handleSearchGeo = (e) => {
        setSelectedType(null)
        setSearch(e.target.value)
        dispatch(getSearchGeo(search))
    }

    return (
        <>
            <div className="w-full bg-blue-200 p-4 rounded-md flex justify-center items-start">
                <div className="relative w-full max-w-md">
                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                        <input
                            onBlur={handleBlur}
                            onFocus={handleSearch}
                            value={search}
                            onChange={(e) => handleSearchGeo(e)}
                            type="text"
                            placeholder="Пошук"
                            className="w-full p-2 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md"
                        />
                        <button disabled={loadingSearchGeo || loadingSearchPrices} type="submit" className="cursor-pointer w-[150px] bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loadingSearchPrices ? 'Пошук...' : 'Пошук'}
                        </button>
                    </form>
                    <DropDownList setCountryID={setCountryID} selectedType={selectedType} setSelectedType={setSelectedType} search={search} isOpenDropDown={isOpenDropDown} setSearch={setSearch} />


                </div>
            </div>
            <div className="w-full mt-[50px] max-w-[700px] p-[25px] mx-auto border border-gray-200 rounded-md shadow-lg">

                {/*default state - показуємо тільки якщо ще не було пошуку*/}
                {!hasSearched && !loadingSearchPrices && !errorSearchPrices && (
                    <div>
                        <div className="text-center text-gray-600">Скористайтесь пошуком для пошуку турів</div>
                    </div>
                )}

                {/* Loading state */}
                {loadingSearchPrices && (
                    <div>
                        <div className="text-center text-gray-600">Пошук турів...</div>
                    </div>
                )}

                {/* Error state */}
                {errorSearchPrices && !loadingSearchPrices && (
                    <div>
                        <div className="text-center text-red-600 font-medium">Помилка пошуку</div>
                        <div className="mt-2 text-sm text-red-500 text-center">
                            {typeof errorSearchPrices === 'object' && errorSearchPrices.message
                                ? errorSearchPrices.message
                                : typeof errorSearchPrices === 'string'
                                    ? errorSearchPrices
                                    : 'Не вдалося знайти тури. Спробуйте ще раз.'}
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {hasSearched && !loadingSearchPrices && !errorSearchPrices && tours && tours.length === 0 && (
                    <div>
                        <div className="text-center text-gray-600">За вашим запитом турів не знайдено</div>
                    </div>
                )}

                {!loadingSearchPrices && !errorSearchPrices && tours && tours.length > 0 && hotels && hotels.length > 0 && (
                    <div>
                        <div className="text-center text-green-600 font-medium mb-4">Знайдено турів: {tours.length}</div>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                            {hotels.map((tour) => (
                                <div
                                    key={tour.id}
                                    onClick={() => navigate(`/tour?priceId=${tour.id}&hotelId=${tour.hotel.id}`)}
                                    className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                                >

                                    <div className="relative w-full h-48 overflow-hidden">
                                        <img
                                            src={tour.hotel.img}
                                            alt={tour.hotel.name}
                                            className="w-full h-full object-cover"
                                        />

                                        {tour.flagCountry && (
                                            <div className="absolute top-2 right-2">
                                                <img
                                                    src={tour.flagCountry}
                                                    alt={`${tour.hotel.countryName} flag`}
                                                    className="w-8 h-6 object-cover rounded shadow-md"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                            {tour.hotel.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                            <span>{tour.hotel.countryName}</span>
                                            <span>•</span>
                                            <span>{tour.hotel.cityName}</span>
                                        </div>

                                        <div className="mb-3">
                                            <div className="text-2xl font-bold text-green-600">
                                                {tour.amount} {tour.currency.toUpperCase()}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-3">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400">Від</span>
                                                <span className="font-medium">{tour.startDate}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400">До</span>
                                                <span className="font-medium">{tour.endDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}