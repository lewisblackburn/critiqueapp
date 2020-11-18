import React from "react"
import ReactSlider from "react-slider"

interface CustomSliderProps {
  min: number
  max: number
  marks: {}
  handleSliderChange: (value) => void
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  handleSliderChange,
  marks,
}) => {
  return (
    <div className="w-full px-10">
      <ReactSlider
        className="flex items-center justify-center horizontal-slider"
        min={min}
        max={max}
        // @ts-ignore
        marks
        defaultValue={max}
        markClassName="slider-mark"
        thumbClassName="bg-woodsmoke-300 text-woodsmoke-900 px-2 cursor-pointer"
        trackClassName="bg-woodsmoke-500 text-woodsmoke-500 rounded"
        onChange={(value) => handleSliderChange(value)}
        renderThumb={(props, state) => <div {...props}>{marks[state.valueNow]}</div>}
        renderTrack={(props) => <div {...props}>.</div>}
      />
    </div>
  )
}
