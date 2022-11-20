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
