import { getCountries } from "@/redux/slices/Search"
import { useState } from "react"
import { useDispatch } from "react-redux"
import DropDownList from "./DropDownList"

export default function SearchInput() {
    const [search, setSearch] = useState('')
    const [isOpenDropDown, setIsOpenDropDown] = useState(false)

    const dispatch = useDispatch()

    const handleSearch = () => {
        dispatch(getCountries())
        setIsOpenDropDown(true)
    }
    const handleBlur = () => {
        setIsOpenDropDown(false)
    }
    return (
        <div className="w-full bg-blue-200 p-4 rounded-md flex justify-center items-start">
            <div className="relative w-full max-w-md">
                <input 
                    onBlur={handleBlur} 
                    onFocus={handleSearch} 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    type="text" 
                    placeholder="Search" 
                    className="w-full p-2 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md" 
                />
                <DropDownList isOpenDropDown={isOpenDropDown} setSearch={setSearch}/>
            </div>
        </div>
    )
}