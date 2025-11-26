import { getCountries, getSearchGeo, searchPricesWithPolling, selectLoadingSearchGeo, selectLoadingSearchPrices, selectErrorSearchPrices, selectTours, selectHasSearched, getHotelsOperation, selectHotels, stopSearchPricesOperation, selectToken, selectCancelingSearchPrices, selectLoadingHotels } from "@/redux/slices/Search"
import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import DropDownList from "./DropDownList"
import TourCard from "../TourCard/TourCard"

export default function SearchInput() {
    const [search, setSearch] = useState('')
    const [isOpenDropDown, setIsOpenDropDown] = useState(false)
    const [selectedType, setSelectedType] = useState(null)
    const [countryID, setCountryID] = useState(null)

    const loadingSearchGeo = useSelector(selectLoadingSearchGeo)
    const loadingSearchPrices = useSelector(selectLoadingSearchPrices)
    const loadingHotels = useSelector(selectLoadingHotels)
    const errorSearchPrices = useSelector(selectErrorSearchPrices)
    const tours = useSelector(selectTours)
    const hasSearched = useSelector(selectHasSearched)
    const hotels = useSelector(selectHotels)
    const activeToken = useSelector(selectToken)
    const cancelingSearchPrices = useSelector(selectCancelingSearchPrices)

    console.log("ACTIVE TOKEN", activeToken)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentSearchThunk = useRef(null)

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

        // Якщо є активний пошук, спочатку скасовуємо його
        if (activeToken) {
            // Скасовуємо попередній пошук через abort() якщо він ще активний
            if (currentSearchThunk.current) {
                currentSearchThunk.current.abort()
            }

            // Викликаємо stopSearchPrices на сервері
            await dispatch(stopSearchPricesOperation(activeToken))
        }

        // Запускаємо новий пошук і зберігаємо посилання на thunk
        const searchThunk = dispatch(searchPricesWithPolling(countryID))
        currentSearchThunk.current = searchThunk

        const result = await searchThunk

        // Перевіряємо чи пошук не був скасований
        if (result.meta.requestStatus === 'fulfilled' && result.payload?.status !== 'CANCELLED') {
            await dispatch(getHotelsOperation(countryID))
        }

        // Очищаємо посилання на thunk після завершення
        if (currentSearchThunk.current === searchThunk) {
            currentSearchThunk.current = null
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
                        <button disabled={loadingSearchGeo || loadingSearchPrices || cancelingSearchPrices} type="submit" className="cursor-pointer w-[150px] bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
                            {cancelingSearchPrices ? 'Скасування...' : loadingSearchPrices ? 'Пошук...' : 'Пошук'}
                        </button>
                    </form>
                    <DropDownList setCountryID={setCountryID} selectedType={selectedType} setSelectedType={setSelectedType} search={search} isOpenDropDown={isOpenDropDown} setSearch={setSearch} />


                </div>
            </div>
            <div className="w-full mt-[50px] max-w-[700px] p-[25px] mx-auto border border-gray-200 rounded-md shadow-lg">

                {!hasSearched && !loadingSearchPrices && !cancelingSearchPrices && !errorSearchPrices && activeToken === null && (
                    <div>
                        <div className="text-center text-gray-600">Скористайтесь пошуком для пошуку турів</div>
                    </div>
                )}

                {(loadingSearchPrices || cancelingSearchPrices) && (
                    <div>
                        <div className="text-center text-gray-600">{cancelingSearchPrices ? 'Скасування...' : 'Пошук турів...'}</div>
                    </div>
                )}

                {!loadingSearchPrices && loadingHotels && tours && tours.length > 0 && (
                    <div>
                        <div className="text-center text-gray-600">Завантаження готелів...</div>
                    </div>
                )}

                {!loadingSearchPrices && !loadingHotels && hasSearched && tours && tours.length > 0 && (!hotels || hotels.length === 0) && !errorSearchPrices && (
                    <div>
                        <div className="text-center text-gray-600">Завантаження готелів...</div>
                    </div>
                )}

                {!loadingSearchPrices && !loadingHotels && hasSearched && tours && tours.length === 0 && activeToken !== null && !errorSearchPrices && (
                    <div>
                        <div className="text-center text-gray-600">Завантаження...</div>
                    </div>
                )}

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

                {hasSearched && !loadingSearchPrices && !loadingHotels && !cancelingSearchPrices && !errorSearchPrices && tours && tours.length === 0 && hotels && hotels.length === 0 && activeToken === null && (
                    <div>
                        <div className="text-center text-gray-600">За вашим запитом турів не знайдено</div>
                    </div>
                )}

                {!loadingSearchPrices && !loadingHotels && !errorSearchPrices && tours && tours.length > 0 && hotels && hotels.length > 0 && (
                    <div>
                        <div className="text-center text-green-600 font-medium mb-4">Знайдено турів: {tours.length}</div>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                            {hotels.map((tour) => (
                                <TourCard
                                    key={tour.id}
                                    tour={tour}
                                    onClick={() => navigate(`/tour?priceId=${tour.id}&hotelId=${tour.hotel.id}`)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}