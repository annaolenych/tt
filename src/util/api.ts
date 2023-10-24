import axios from "axios"
import { Environment } from "../constants/environment"
import { Customer } from "../store/store"
import { DateTime } from "luxon"

export const getTables = async (limit: number = 0, offset: number = 0) => {
    const res = await axios.get(`${Environment.BACKEND_LINK}/api/table/`)
    return res.data.results.map((r: Customer) => {
        return { ...r, birthday_date: DateTime.fromFormat(r.birthday_date, "dd-MM-yy").toFormat('yyyy-MM-dd')}
    })
}

export const updateCustomer = (id: number, updatePayload: any)=>{
    return axios.patch(`${Environment.BACKEND_LINK}/api/table/${id}/`, updatePayload)
}