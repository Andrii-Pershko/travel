import { getCountries, getSearchGeo, selectLoadingSearchGeo } from "@/redux/slices/Search"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DropDownList from "./DropDownList"

export default function SearchInput() {
    const [search, setSearch] = useState('')
    const [isOpenDropDown, setIsOpenDropDown] = useState(false)
    const [selectedType, setSelectedType] = useState(null)

    const loading = useSelector(selectLoadingSearchGeo)

    const dispatch = useDispatch()

    const handleSearch = () => {
        dispatch(getCountries())
        setIsOpenDropDown(true)
    }
    const handleBlur = () => {
        setIsOpenDropDown(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getSearchGeo(search))
    }
    const handleSearchGeo = (e) => {
        setSelectedType(null)
        setSearch(e.target.value)
        dispatch(getSearchGeo(search))
    }
    return (
        <div className="w-full bg-blue-200 p-4 rounded-md flex justify-center items-start">
            <div className="relative w-full max-w-md">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        onBlur={handleBlur}
                        onFocus={handleSearch}
                        value={search}
                        onChange={(e) => handleSearchGeo(e)}
                        type="text"
                        placeholder="Search"
                        className="w-full p-2 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md"
                    />
                    <button disabled={loading} type="submit" className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-150">Search</button>
                </form>
                <DropDownList selectedType={selectedType} setSelectedType={setSelectedType} search={search} isOpenDropDown={isOpenDropDown} setSearch={setSearch} />
            </div>
        </div>
    )
}