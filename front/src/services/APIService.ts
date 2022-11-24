import axios from 'axios'
import data from './mockdata.json'

const axiosApiInstance = axios.create({ baseURL: 'http://localhost:8000' })

export interface ListMonitorsFilters {
  min_price?: number
  max_price?: number
  min_size?: number
  max_size?: number
  min_refresh_rate?: number
  max_refresh_rate?: number
  resolutions?: string[]
  panel_types?: string[]
  brands?: string[]
  available: boolean
}

export async function listMonitors(filters: ListMonitorsFilters) {
  await new Promise((r) => setTimeout(r, 1000))
  return { data }
  // return axiosApiInstance.post('/dummy_monitors', { filters })
}

export async function getMonitor(monitorId: number) {
  await new Promise((r) => setTimeout(r, 1000))
  return {
    name: 'name',
    brand: 'brand',
    size: 'size',
    panel: 'panel',
    refresh_rate: 'refresh_rate',
    min_response_time: 'min_response_time',
    screen_aspect_ratio: 'screen_aspect_ratio',
    screen_resolution: 'screen_resolution',
    url: 'url',
    image: 'https://www.displaydb.com/assets/images/700/nzxt-canvas-27q.jpg',
    min_price: 'min_price',
    in_stock: 'in_stock',
    posts: [
      {
        store: 'banifox',
        price: 500,
        in_stock: true,
        url: 'https://www.banifox.com',
      },
    ],
  }
  // return axiosApiInstance.post('/dummy_monitors', { filters })
}
