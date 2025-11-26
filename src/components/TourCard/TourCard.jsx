import ServicesList from "../ServicesList/ServicesList"

export default function TourCard({ tour, onClick, className = "" }) {
    const hasDetailedInfo = tour.hotel?.description || tour.hotel?.services
    const imageHeight = hasDetailedInfo ? "h-64" : "h-48"
    const titleSize = hasDetailedInfo ? "text-2xl" : "text-lg"
    const padding = hasDetailedInfo ? "p-6" : "p-4"
    const cursorClass = onClick ? "cursor-pointer" : ""

    console.log("tour", tour)

    return (
        <div
            onClick={onClick}
            className={`bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 ${cursorClass} ${className}`}
        >
            <div className={`relative w-full ${imageHeight} overflow-hidden`}>
                <img
                    src={tour.hotel.img}
                    alt={tour.hotel.name}
                    className="w-full h-full object-cover"
                />

                {tour.flagCountry !== null && (
                    <div className="absolute top-2 right-2">
                        <img
                            src={tour.flagCountry || ""}
                            alt={`${tour.hotel.countryName} flag`}
                            className="w-8 h-6 object-cover rounded shadow-md"
                        />
                    </div>
                )}
            </div>

            <div className={padding}>
                <h3 className={`${titleSize} font-semibold text-gray-800 mb-2 ${!hasDetailedInfo ? "line-clamp-2" : ""}`}>
                    {tour.hotel.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span>{tour.hotel.countryName}</span>
                    <span>•</span>
                    <span>{tour.hotel.cityName}</span>
                </div>

                {tour.hotel.description && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Опис</h3>
                        <p className="text-gray-600 leading-relaxed">{tour.hotel.description}</p>
                    </div>
                )}
                {tour.hotel.services && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Послуги</h3>
                        <ServicesList services={tour.hotel.services} />
                    </div>
                )}

                <div className="mb-3">
                    <div className={`${hasDetailedInfo ? "text-3xl" : "text-2xl"} font-bold text-green-600`}>
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
    )
}

