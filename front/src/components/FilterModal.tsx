import React from 'react'

import { Modal, Fade, Box, Backdrop, MenuItem, OutlinedInput, InputLabel, FormControl, Slider, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';


const BRANDS = [
    'Acer',
    'Asus',
    'Samsung',
    'coso ejemplo'
]

function getStyles(name: string, personName: string[]) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? 400
                : 600,
    };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void
}

export const FilterModal: React.FC<FilterModalProps> = (props) => {
    const [selectedBrand, setSelectedBrand] = React.useState<string[]>([]);
    const [priceRange, setPriceRange] = React.useState<number[]>([20, 37]);

    const handleSelectBrand = (event: SelectChangeEvent<typeof selectedBrand>) => {
        const {
            target: { value },
        } = event;
        setSelectedBrand(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue);
    };

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
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h4" gutterBottom>Filtros</Typography>
                    <FormControl sx={{ m: 1, width: 400 }}>
                        <InputLabel id="brand-label">Marca</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={selectedBrand}
                            onChange={handleSelectBrand}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {BRANDS.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, selectedBrand)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 400 }}>
                        <InputLabel id="price-label">Precio</InputLabel>
                        <Slider
                            max={Math.sqrt(5000)}
                            scale={(x) => Math.trunc(x * x)}
                            step={0.1}
                            sx={{ marginTop: '42px' }}
                            getAriaLabel={() => 'Price range'}
                            value={priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={() => '35'}
                        />
                    </FormControl>
                </Box>
            </Fade>
        </Modal>
    )
}
