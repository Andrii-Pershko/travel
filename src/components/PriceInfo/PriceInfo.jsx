export default function PriceInfo({ price, showButton = false, onBook }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Не вказано'
        return new Date(dateString).toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 sticky top-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Деталі бронювання</h3>

            {price && (
                <>
                    <div className="mb-6">
                        <div className="text-3xl font-bold text-green-600 mb-1">
                            {price.amount} {price.currency?.toUpperCase() || 'USD'}
                        </div>
                        <p className="text-sm text-gray-500">за тур</p>
                    </div>

                    <div className="space-y-4 border-t border-gray-200 pt-4">
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Дата початку</p>
                            <p className="text-lg font-semibold text-gray-800">
                                {formatDate(price.startDate)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Дата закінчення</p>
                            <p className="text-lg font-semibold text-gray-800">
                                {formatDate(price.endDate)}
                            </p>
                        </div>
                    </div>

                    {showButton && (
                        <button
                            onClick={onBook}
                            className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                        >
                            Забронювати
                        </button>
                    )}
                </>
            )}
        </div>
    )
}

