export default function LoadingSpinner({ message = "Завантаження даних..." }) {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-4 text-gray-600">{message}</span>
        </div>
    )
}

