import { getHotelOperation, getPriceOperation } from "@/redux/slices/Tour"
import { selectErrorHotel, selectErrorPrice, selectHotel, selectLoadingHotel, selectLoadingPrice, selectPrice } from "@/redux/slices/Tour/selectors"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import TourCard from "../TourCard/TourCard"
import PriceInfo from "../PriceInfo/PriceInfo"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

export default function TourDetails() {
    const [searchParams] = useSearchParams()

    const dispatch = useDispatch()

    const loadingPrice = useSelector(selectLoadingPrice)
    const loadingHotel = useSelector(selectLoadingHotel)
    const errorPrice = useSelector(selectErrorPrice)
    const errorHotel = useSelector(selectErrorHotel)
    const price = useSelector(selectPrice)
    const hotel = useSelector(selectHotel)


    const priceId = searchParams.get('priceId')
    const hotelId = searchParams.get('hotelId')

    useEffect(() => {
        if (priceId) {
            dispatch(getPriceOperation(priceId))
        }
        if (hotelId) {
            dispatch(getHotelOperation(Number(hotelId)))
        }
    }, [priceId, hotelId, dispatch])

    const isLoading = loadingPrice || loadingHotel
    const hasError = errorPrice || errorHotel
    const hasData = price && hotel

    const tourData = useMemo(() => {
        if (!hasData) return null

        return {
            id: price.id,
            amount: price.amount,
            currency: price.currency,
            startDate: price.startDate,
            endDate: price.endDate,
            hotel: hotel,
            flagCountry: null
        }
    }, [hasData, price, hotel])

    return (
        <div className="w-full max-w-6xl mx-auto p-6 w-full max-w-[700px]">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Деталі туру</h1>

            {isLoading && <LoadingSpinner />}

            {hasError && !isLoading && <ErrorMessage errorPrice={errorPrice} errorHotel={errorHotel} />}

            {hasData && !isLoading && !hasError && tourData && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <TourCard tour={tourData} />
                    </div>

                    <div className="lg:col-span-1">
                        <PriceInfo price={price} showButton={true} />
                    </div>
                </div>
            )}

            {!isLoading && !hasError && !hasData && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <p className="text-gray-600">Дані не знайдено</p>
                </div>
            )}
        </div>
    )
}

