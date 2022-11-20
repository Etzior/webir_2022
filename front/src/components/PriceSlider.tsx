import { FormControl, Slider, Typography } from '@mui/material'
import React from 'react'

interface PriceSliderProps {
  priceRange: [number, number]
  handlePriceChange: (event: Event, newValue: number | number[]) => void
  transformFn: (x: number) => number
}

export const PriceSlider: React.FC<PriceSliderProps> = ({
  priceRange,
  handlePriceChange,
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
          {`$${transformFn(priceRange[0])} - $${transformFn(priceRange[1])}`}
        </Typography>
        <Slider
          max={Math.sqrt(5000)}
          scale={transformFn}
          step={0.1}
          getAriaLabel={() => 'Price range'}
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
        />
      </div>
    </FormControl>
  )
}
