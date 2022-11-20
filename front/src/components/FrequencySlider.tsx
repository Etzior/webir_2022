import { FormControl, Slider, Typography } from '@mui/material'
import React from 'react'

interface FrequencySliderProps {
  frequencyRange: [number, number]
  handleFrequencyChange: (event: Event, newValue: number | number[]) => void
  transformFn: (x: number) => number
}

const marks = [60, 75, 90, 120, 144, 165, 240, 360].map((value) => ({
  value,
  //   label: `${value}`,
}))

export const FrequencySlider: React.FC<FrequencySliderProps> = ({
  frequencyRange,
  handleFrequencyChange,
  transformFn,
}) => {
  return (
    <FormControl sx={{ m: 1, width: 400 }}>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Typography
          variant="overline"
          gutterBottom
          sx={{ width: '150px', marginRight: '16px' }}
        >
          {`${transformFn(frequencyRange[0])}Hz - ${transformFn(
            frequencyRange[1]
          )}Hz`}
        </Typography>
        <Slider
          marks={marks}
          min={60}
          max={360}
          scale={transformFn}
          step={null}
          getAriaLabel={() => 'Frequency range'}
          value={frequencyRange}
          onChange={handleFrequencyChange}
          valueLabelDisplay="auto"
        />
      </div>
    </FormControl>
  )
}
