import { selectCountries, selectError, selectLoading } from "@/redux/slices/Search/selectors"
import { useSelector } from "react-redux"

export default function DropDownList({ isOpenDropDown, setSearch }) {
    const countries = useSelector(selectCountries)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)

    if (!isOpenDropDown) {
        return null
    }

    if (loading) {
        return (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 animate-fade-in">
                <div className="text-center text-gray-500">Loading...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-red-200 rounded-md shadow-lg p-4 animate-fade-in">
                <div className="text-center text-red-500">Error: {error}</div>
            </div>
        )
    }

    if (!countries || countries.length === 0) {
        return (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 animate-fade-in">
                <div className="text-center text-gray-500">No countries found</div>
            </div>
        )
    }

    return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto animate-fade-in z-10">
            {countries.map((country) => (
                <div
                    onMouseDown={() => setSearch(country.name)}
                    key={country.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                >
                    {country.flag && (
                        <img
                            src={country.flag}
                            alt={`${country.name} flag`}
                            className="w-6 h-4 object-cover rounded"
                        />
                    )}
                    <span className="text-gray-700 font-medium">{country.name}</span>
                </div>
            ))}
        </div>
    )
}