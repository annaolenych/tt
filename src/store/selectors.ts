import { createSelector } from "@reduxjs/toolkit";
import { TableSliceState, tableSlice } from "./store";

export const selectTableData = createSelector((state)=> state.table, (state: TableSliceState)=> state.tableData)
export const selectTableOffset = createSelector((state)=>state.table, (state: TableSliceState)=> state.pageSize*state.pageIndex )