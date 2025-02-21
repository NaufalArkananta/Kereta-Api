"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type props = {
    start_date: string
    end_date: string
}

const FilterHistory = (myProp: props) => {
    const [start_date, setStartDate] = useState<string>("")
    const [end_date, setEndDate] = useState<string>("")
    const router = useRouter()

    const handleSearch = () => {
        if (start_date !== "" && end_date !== "") {
            router.push(`/pelanggan/history?start_date=${start_date}&end_date=${end_date}`)
        }
    }

    useEffect(() => {
        setStartDate(myProp.start_date)
        setEndDate(myProp.end_date)
    }, [myProp.start_date, myProp.end_date])
    return (
        <div className="flex gap-3 mx-3">
            <input type="date" 
            value={start_date} 
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm"
            />
            <input type="date" 
            value={end_date} 
            onChange={(e) => setEndDate(e.target.value)} 
            className="px-4 py-2 border rounded-md text-sm"
            />
            <button 
            onClick={handleSearch}
            className="px-4 py-2 border rounded-md text-sm bg-green-600">
                Search
            </button>
        </div>
    )
}

export default FilterHistory