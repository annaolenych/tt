import { configureStore, createSlice } from "@reduxjs/toolkit";

export const tableSlice = createSlice({
    initialState: { tableData: [], pageSize: 10, pageIndex: 0},

    name: "table",
    reducers: {
        setTableData: (state, action) => {

            state.tableData = action.payload

        },
     
     setPageSize: (state, action)=>{

        state.pageSize = action.payload

    },
    setPageIndex: (state, action)=>{

        state.pageIndex = action.payload

    },


    }
})
export const store = configureStore({
    reducer: {
     table: tableSlice.reducer

    }
})
export interface Customer{
    name: string;
    birthday_date: string;
    email: string;
    phone_number: string;
    address: string;

}
export interface TableSliceState {
    tableData: Array<Customer>;
   pageIndex: number;
   pageSize: number;
    
}