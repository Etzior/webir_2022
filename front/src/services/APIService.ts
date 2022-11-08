import axios from 'axios'
import data from './mockdata.json'

const axiosApiInstance = axios.create({ baseURL: 'http://localhost:8080' })

// TODO: use this in the other parts of code
interface ListMonitorsFilters {
    min_price?: number;
    max_price?: number;
    available: boolean;
}

export async function listMonitors(filters: ListMonitorsFilters) {
    await new Promise(r => setTimeout(r, 1000));
    console.log(data)
    // const { data } = await axiosApiInstance.post('/monitors/', { filters })
    return { data }
}