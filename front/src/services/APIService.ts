import axios, { AxiosResponse } from 'axios'
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

// TODO: filters

export interface MonitorPostResult {
  store: string
  price: string
  in_stock: boolean
}
export interface MonitorResult {
  id: string
  name: string
  brand: string
  size: string
  panel: string
  refresh_rate: string
  min_response_time: string
  screen_aspect_ratio: string
  screen_resolution: string
  url: string
  min_price: number
  in_stock: boolean
  posts: MonitorPostResult[]
  img_url?: string;
}

export async function listMonitors(
  filters: ListMonitorsFilters
): Promise<AxiosResponse<MonitorResult[]>> {
  return axiosApiInstance.get('/', { filters })
}

export async function getMonitor(
  monitorId: number
): Promise<AxiosResponse<MonitorResult>> {
  return axiosApiInstance.get(`/${monitorId}`)
}
