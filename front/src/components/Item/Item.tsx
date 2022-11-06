import React from 'react'
import { Card } from '../Card'
import { Monitor } from 'react-feather'

import { Container, Name, Price, PriceStockContainer, Stock } from './Item.styles'

interface ItemProps {
    // TODO: any
    monitor?: any
}

export const Item: React.FC<ItemProps> = ({ monitor }) => {
    return (
        <Card width="200px" height="280px" flex>
            <Container>
                {monitor.image
                    ? <img src={monitor.image} width="150px" />
                    : <Monitor size={150} />}
                <Name>{monitor.model}</Name>
                <PriceStockContainer>
                    <Price>${monitor.price}</Price>
                    <Stock>stock: {monitor.stock}</Stock>
                </PriceStockContainer>
            </Container>
        </Card>
    )
}
