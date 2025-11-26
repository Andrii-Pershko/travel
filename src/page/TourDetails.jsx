import { useSearchParams } from "react-router-dom"

export default function TourDetails() {
    const [searchParams] = useSearchParams()
    const priceId = searchParams.get('priceId')
    const hotelId = searchParams.get('hotelId')

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Деталі туру</h1>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Price ID:</span> {priceId || 'Не вказано'}
                </p>
                <p className="text-gray-600">
                    <span className="font-semibold">Hotel ID:</span> {hotelId || 'Не вказано'}
                </p>
            </div>
        </div>
    )
}

