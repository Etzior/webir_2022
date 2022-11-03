import axios from 'axios'

const axiosApiInstance = axios.create({ baseURL: 'http://localhost:8080' })

interface ListMonitorsFilters {
    minPrice: number;
    maxPrice: number;
}

export async function listMonitors(filters: ListMonitorsFilters) {
    const { data } = await axiosApiInstance.post('/monitors/', { filters })
    return data
}