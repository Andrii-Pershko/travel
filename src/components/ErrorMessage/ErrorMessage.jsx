export default function ErrorMessage({ errorPrice, errorHotel }) {
    const getErrorMessage = (error) => {
        if (typeof error === 'object' && error.message) {
            return error.message
        }
        if (typeof error === 'string') {
            return error
        }
        return 'Не вдалося завантажити дані'
    }

    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Помилка завантаження даних</h2>
            {errorPrice && (
                <div className="mb-3">
                    <p className="text-red-700 font-medium">Помилка завантаження ціни:</p>
                    <p className="text-red-600 text-sm mt-1">
                        {getErrorMessage(errorPrice)}
                    </p>
                </div>
            )}
            {errorHotel && (
                <div>
                    <p className="text-red-700 font-medium">Помилка завантаження готелю:</p>
                    <p className="text-red-600 text-sm mt-1">
                        {getErrorMessage(errorHotel)}
                    </p>
                </div>
            )}
        </div>
    )
}

