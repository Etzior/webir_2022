import { Card, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { useParams } from 'react-router-dom'
import { getMonitor } from '../../services/APIService'
import { Row, Image, Info } from './Detail.styles'

export const Detail = () => {
  const { id } = useParams()
  const { data, isLoading, error } = useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60,
    queryKey: [id],
    queryFn: () => getMonitor(Number(id)),
  })

  if (error) {
    return <div>error</div>
  }

  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <>
      <Row>
        {data && (
          <>
            <Image src={data.image} alt={data.name} />
            <Info>
              <Typography variant="h3">{data.name}</Typography>
              <li>Marca: {data.brand || '-'}</li>
              <li>Modelo: {data.model || '-'}</li>

              <Typography variant="h5">Detalles</Typography>
              <li>Tamaño: {data.size || '-'}</li>
              <li>Resolución: {data.screen_resolution || '-'}</li>
              <li>Tasa de actualización: {data.refresh_rate || '-'}</li>
              <li>Panel: {data.panel || '-'}</li>
              <li>Relación de aspecto: {data.screen_aspect_ratio || '-'}</li>
              <li>Tiempo de respuesta: {data.min_response_time || '-'}</li>
            </Info>
          </>
        )}
      </Row>
      <Row style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
          }}
        >
          <Typography variant="h5">
            {data?.posts.length} Vendedor
            {(data?.posts.length as number) > 1 && 'es'}
          </Typography>
          {data?.posts.map((post) => {
            return (
              <a
                key={post.store}
                href={post.url}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Card sx={{ padding: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h6" color="#4aa873" marginRight="12px">
                      ${post.price}
                    </Typography>
                    <Typography variant="h6">{post.store}</Typography>
                  </div>
                  {post.url}
                </Card>
              </a>
            )
          })}
        </div>
      </Row>
    </>
  )
}
