import React from 'react'
import { Card, CardContent, CardActionArea } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import { Monitor, CheckCircle, XCircle } from 'react-feather'
import { useNavigate } from 'react-router-dom'

import { Container, Name, Price, PriceStockContainer } from './Item.styles'
import { MonitorResult } from '../../services/APIService'

interface ItemProps {
  // TODO: any
  monitor: MonitorResult
}

export const Item: React.FC<ItemProps> = ({ monitor }) => {
  const navigate = useNavigate()
  return (
    <Card sx={{ width: '220px' }}>
      <CardActionArea onClick={() => navigate(`details/${monitor.id}`)}>
        <CardMedia image={monitor.image} sx={{ height: '140px' }}>
          {!monitor.image && <Monitor size={150} />}
        </CardMedia>
        <CardContent>
          <Container>
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              {monitor.posts?.length || 0} ofertas
            </div>
            <Name>{monitor.name}</Name>
            <PriceStockContainer>
              <Price>
                $
                {monitor.posts?.sort((a, b) => (a.price < b.price ? 1 : -1))[0]}
              </Price>
              {monitor.in_stock ? (
                <CheckCircle color="green" />
              ) : (
                <XCircle color="red" />
              )}
            </PriceStockContainer>
          </Container>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
