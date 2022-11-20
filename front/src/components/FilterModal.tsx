import React from 'react'

import {
  Modal,
  Fade,
  Box,
  Backdrop,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { PriceSlider } from './PriceSlider'
import { ListMonitorsFilters } from '../services/APIService'
import { SelectMultiple } from './SelectMultiple'
import { FrequencySlider } from './FrequencySlider'

const BRANDS = ['Acer', 'Asus', 'Samsung', 'coso ejemplo']

const sliderTransform = (x: number) => Math.trunc(x * x)

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: ListMonitorsFilters) => void
}

export const FilterModal: React.FC<FilterModalProps> = (props) => {
  const [selectedRes, setSelectedRes] = React.useState<string[]>([])
  const [frequencyRange, setFrequencyRange] = React.useState<[number, number]>([
    0, 15,
  ])
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([])
  const [selectedPanels, setSelectedPanels] = React.useState<string[]>([])
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 15])
  const [available, setAvailable] = React.useState(false)

  const handleSelectMultiple =
    (callback: (value: string[]) => void) =>
    (event: SelectChangeEvent<typeof selectedBrands>) => {
      const {
        target: { value },
      } = event
      callback(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value
      )
    }

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number])
  }

  const handleFrequencyChange = (event: Event, newValue: number | number[]) => {
    setFrequencyRange(newValue as [number, number])
  }

  const onSubmit = () => {
    props.onApplyFilters({
      available,
      min_price: sliderTransform(priceRange[0]),
      max_price: sliderTransform(priceRange[1]),
    })
    props.onClose()
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.isOpen}
      onClose={props.onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Filtros
          </Typography>

          {/* TODO: get all possible values from API */}
          <SelectMultiple
            id="resolution"
            label="Resolución"
            options={['1920x1080', '2560x1440', '3840x2160']}
            selected={selectedRes}
            onChange={handleSelectMultiple(setSelectedRes)}
          />

          <FrequencySlider
            frequencyRange={frequencyRange}
            handleFrequencyChange={handleFrequencyChange}
            transformFn={(a) => a}
          />

          <SelectMultiple
            id="panels"
            label="Panel"
            options={['IPS', 'TN', 'VA']}
            selected={selectedPanels}
            onChange={handleSelectMultiple(setSelectedPanels)}
          />

          <SelectMultiple
            id="brands"
            label="Marca"
            options={BRANDS}
            selected={selectedBrands}
            onChange={handleSelectMultiple(setSelectedBrands)}
          />

          <PriceSlider
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
            transformFn={sliderTransform}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={available}
                onChange={() => setAvailable(!available)}
              />
            }
            label="Mostrar sólo en stock"
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={onSubmit}>
              Aplicar
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}
