import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import React from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, personName: string[]) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? 400 : 600,
  }
}

interface SelectMultipleProps {
  id: string
  label: string
  options: string[]
  selected: string[]
  onChange: (event: SelectChangeEvent<string[]>) => void
}

export const SelectMultiple: React.FC<SelectMultipleProps> = ({
  id,
  label,
  options,
  selected,
  onChange,
}) => {
  return (
    <FormControl sx={{ m: 1, width: 400 }}>
      <InputLabel
        id={`input-label-${id}`}
        sx={{ backgroundColor: 'white', paddingRight: '4px' }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`label-${id}`}
        id={id}
        multiple
        value={selected}
        onChange={onChange}
        input={<OutlinedInput label="Name" />}
        MenuProps={MenuProps}
        renderValue={(selected) => (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.5,
            }}
          >
            {selected.map((value) => (
              <Chip key={value} label={value} sx={{ height: '24px' }} />
            ))}
          </Box>
        )}
      >
        {options.map((name) => (
          <MenuItem key={name} value={name} style={getStyles(name, selected)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
