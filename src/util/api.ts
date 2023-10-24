import axios from "axios"
import { Environment } from "../constants/environment"
import { Customer } from "../store/store"
import { DateTime } from "luxon"

export const getCustomers = async (limit: number = 0, offset: number = 0):Promise<{next: string, previous: string, results: Array<Customer>, count: number}>=> {
    const res = await axios.get(`${Environment.BACKEND_LINK}/api/table/`, {params: {limit, offset}})
    const results = res.data.results.map((r: Customer) => {
        return { ...r, birthday_date: DateTime.fromFormat(r.birthday_date, "dd-MM-yy").toFormat('yyyy-MM-dd')}
    })
    return{...res.data, results}
}

export const updateCustomer = (id: number, updatePayload: any)=>{
    return axios.patch(`${Environment.BACKEND_LINK}/api/table/${id}/`, updatePayload)
}