import axios from 'axios'
import data from './mockdata.json'

const axiosApiInstance = axios.create({ baseURL: 'http://localhost:8080' })

interface ListMonitorsFilters {
    minPrice?: number;
    maxPrice?: number;
}

export async function listMonitors(filters: ListMonitorsFilters) {
    await new Promise(r => setTimeout(r, 1000));
    return { data }
    // const { data } = await axiosApiInstance.post('/monitors/', { filters })
    // return data
}