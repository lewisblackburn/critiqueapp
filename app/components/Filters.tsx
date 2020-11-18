import React, { useState } from "react"
import { CustomFilter } from "./CustomFilter"
import { CustomSlider } from "./CustomSlider"

interface FilterProps {
  setAge: (age: {}) => void
  setOrderBy: (orderBy: {}) => void
}

export const Filters: React.FC<FilterProps> = ({ setAge, setOrderBy }) => {
  const [filterAge, setFilterAge] = useState({})
  const [filterOrderBy, setFilterOrderBy] = useState({})

  let marks = {
    0: "U",
    1: "PG",
    2: "12",
    3: "12A",
    4: "15",
    5: "16",
    6: "18",
    7: "All",
  }

  const handleAgeChange = (value) => {
    switch (value) {
      case 7:
        setFilterAge({})
        break
      case 6:
        setFilterAge("18")
        break
      case 5:
        setFilterAge("16")
        break
      case 4:
        setFilterAge("15")
        break
      case 3:
        setFilterAge("12A")
        break
      case 2:
        setFilterAge("12")
        break
      case 1:
        setFilterAge("PG")
        break
      case 0:
        setFilterAge("U")
        break
      default:
        break
    }
  }
  const handleOrderByChange = (value) => {
    switch (value) {
      case "Title (ASC)":
        setFilterOrderBy({ title: "asc" })
        break
      case "Title (DESC)":
        setFilterOrderBy({ title: "desc" })
        break
      case "Runtime (ASC)":
        setFilterOrderBy({ runtime: "asc" })
        break
      case "Runtime (DESC)":
        setFilterOrderBy({ runtime: "desc" })
        break
      default:
        break
    }
  }
  return (
    <div className="flex items-center w-full">
      <CustomFilter
        options={["Title (ASC)", "Title (DESC)", "Runtime (ASC)", "Runtime (DESC)"]}
        handleSelectChange={handleOrderByChange}
      />
      <CustomSlider min={0} max={7} marks={marks} handleSliderChange={handleAgeChange} />
      <button
        onClick={() => {
          setAge(filterAge)
          setOrderBy(filterOrderBy)
        }}
        className="bg-woodsmoke-500 px-10 py-2 rounded"
      >
        search
      </button>
    </div>
  )
}
