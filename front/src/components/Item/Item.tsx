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
        <CardMedia>
          {monitor.img_url ? (
            <img src={monitor.img_url} style={{ height: '140px', width: '220px', objectFit: "contain"}} />
          ) : (<Monitor size={150} />)}
        </CardMedia>
        <CardContent>
          <Container>
            <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'white', borderBottomLeftRadius: '6px', padding: '1px' }}>
              {monitor.posts?.length || 0} oferta{monitor.posts?.length > 1 && 's'}
            </div>
            <Name>{monitor.name}</Name>
            <PriceStockContainer>
              <Price>
                $
                {monitor.min_price}
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
