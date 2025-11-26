import ServicesList from "../ServicesList/ServicesList"

export default function HotelInfo({ hotel, variant = "detailed" }) {
    const isCompact = variant === "compact"
    const imageHeight = isCompact ? "h-48" : "h-64"
    const titleSize = isCompact ? "text-lg" : "text-2xl"
    const padding = isCompact ? "p-4" : "p-6"

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            {hotel.img && (
                <div className={`relative w-full ${imageHeight} overflow-hidden`}>
                    <img
                        src={hotel.img}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className={padding}>
                <h2 className={`${titleSize} font-bold text-gray-800 mb-2 ${isCompact ? "line-clamp-2" : ""}`}>
                    {hotel.name}
                </h2>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <span className="font-medium">{hotel.countryName}</span>
                    <span>•</span>
                    <span>{hotel.cityName}</span>
                </div>

                {hotel.description && !isCompact && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Опис</h3>
                        <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
                    </div>
                )}

                {hotel.services && !isCompact && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Послуги</h3>
                        <ServicesList services={hotel.services} />
                    </div>
                )}
            </div>
        </div>
    )
}

