import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import React from "react"

interface CustomSliderProps {
  min: number
  max: number
  defaultValue: number
  marks: {}
  handleSliderChange: (value) => void
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  defaultValue,
  marks,
  handleSliderChange,
}) => {
  return (
    <div className="w-full px-10">
      <Slider
        min={min}
        max={max}
        defaultValue={defaultValue}
        marks={marks}
        step={null}
        onChange={(value) => handleSliderChange(value)}
        handleStyle={{
          background: "#121212",
        }}
        dotStyle={{
          background: "black",
          border: "none",
        }}
        trackStyle={{
          background: "#202020",
        }}
        railStyle={{
          background: "#202020",
        }}
      />
    </div>
  )
}
