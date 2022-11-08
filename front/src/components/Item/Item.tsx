import React from 'react'
// import { Card } from '../Card'
import { Card, CardContent, CardActionArea } from '@mui/material'
import CardMedia from '@mui/material/CardMedia';
import { Monitor, CheckCircle, XCircle } from 'react-feather'

import { Container, Name, Price, PriceStockContainer, Stock } from './Item.styles'

interface ItemProps {
    // TODO: any
    monitor?: any
}

export const Item: React.FC<ItemProps> = ({ monitor }) => {
    return (
        <Card sx={{ width: '220px' }}>
            <CardActionArea onClick={() => console.log(monitor)}>
                <CardMedia image={monitor.image} sx={{ height: '140px' }} >
                    {!monitor.image && <Monitor size={150} />}
                </CardMedia>
                <CardContent>
                    <Container>
                        <Name>{monitor.name}</Name>
                        <PriceStockContainer>
                            <Price>${monitor.price}</Price>
                            {monitor.stock ? <CheckCircle color="green" /> : <XCircle color="red" />}
                        </PriceStockContainer>
                    </Container>
                </CardContent>
            </CardActionArea>
        </Card >
    )
}
