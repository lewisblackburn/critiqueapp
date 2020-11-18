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
  const handleAgeChange = (value) => {
    switch (value) {
      case 70:
        setFilterAge({})
        break
      case 60:
        setFilterAge("18")
        break
      case 50:
        setFilterAge("16")
        break
      case 40:
        setFilterAge("15")
        break
      case 30:
        setFilterAge("12A")
        break
      case 20:
        setFilterAge("12")
        break
      case 10:
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
      <CustomSlider
        handleSliderChange={handleAgeChange}
        min={0}
        max={70}
        defaultValue={70}
        marks={{
          0: "U",
          10: "PG",
          20: "12",
          30: "12A",
          40: "15",
          50: "16",
          60: "18",
          70: "All",
        }}
      />
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
