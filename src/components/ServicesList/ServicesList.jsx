export default function ServicesList({ services }) {
    const serviceNames = {
        wifi: 'Wi-Fi',
        aquapark: 'Аквапарк',
        tennis_court: 'Тенісний корт',
        laundry: 'Пральня',
        parking: 'Парковка'
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(services).map(([key, value]) => {
                const displayName = serviceNames[key] || key
                const isAvailable = value === 'yes'

                return (
                    <div
                        key={key}
                        className={`flex items-center gap-2 p-2 rounded-md ${
                            isAvailable
                                ? 'bg-green-50 text-green-700'
                                : 'bg-gray-50 text-gray-500'
                        }`}
                    >
                        <span className={`w-2 h-2 rounded-full ${
                            isAvailable ? 'bg-green-500' : 'bg-gray-400'
                        }`}></span>
                        <span className="text-sm font-medium">{displayName}</span>
                    </div>
                )
            })}
        </div>
    )
}

