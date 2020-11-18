import React from "react"

interface CustomFilterProps {
  handleSelectChange: (value) => void
  options: any
}

export const CustomFilter: React.FC<CustomFilterProps> = ({ handleSelectChange, options }) => {
  return (
    <div className="inline-block relative w-64 text-black">
      <select
        onBlur={(e) => handleSelectChange(e.target.value)}
        className="block appearance-none w-full bg-woodsmoke-500 text-white  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {options.map((option, i) => (
          <option key={i}>{option}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  )
}
