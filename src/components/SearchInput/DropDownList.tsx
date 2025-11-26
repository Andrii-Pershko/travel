import { selectCountries, selectError, selectLoading, selectSearchGeo } from "@/redux/slices/Search/selectors"
import { useSelector } from "react-redux"
import HotelIcon from "@/assets/search/hotel.svg"
import PointIcon from "@/assets/search/point.svg"
import { useEffect, useState } from "react"

export default function DropDownList({ isOpenDropDown, setSearch, search, selectedType, setSelectedType }) {


    const countries = useSelector(selectCountries)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)

    const searchGeo = useSelector(selectSearchGeo)

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

    return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto animate-fade-in z-10">

            {(selectedType !== "country" && search !== "" )?
                 searchGeo.length > 0 ? searchGeo.map((item) => (
                    <div
                        onMouseDown={() => {
                            setSelectedType(item.type)
                            setSearch(item.name)
                        }}
                        key={item.id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                    >
                        {item.flag ? (
                            <img
                                src={item.flag}
                                alt={`${item.name} flag`}
                                className="w-6 h-4 object-cover rounded"
                            />
                        ) : item.type === "hotel" ? <HotelIcon /> : <PointIcon />}
                        <span className="text-gray-700 font-medium">{item.name}</span>
                    </div>
                )) : (
                    <div className="text-center text-gray-500 px-4 py-3">No results found</div>
                )
                :
                countries && countries.length > 0 ? countries.map((country) => (
                    <div
                        onMouseDown={() => {
                            setSelectedType("country")
                            setSearch(country.name)
                        }}
                        key={country.id}
                        className="flex countrys-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
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
                )) : (
                    <div className="text-center text-gray-500 px-4 py-3">No countries found</div>
                )
            }

        </div>
    )
}