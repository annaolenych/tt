import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useDispatch, useSelector } from "react-redux"
import { selectTableData, selectTableIndex, selectTableOffset, selectTableSize } from "../../store/selectors"
import { useEffect, useState } from "react"
import axios from "axios"
import { Environment } from "../../constants/environment"
import { tableSlice } from "../../store/store"
import { getCustomers } from "../../util/api"
import { FormModal } from "../FormModal/FormModal"
import "./Table.css"
export const Table = () => {
  const dispatch = useDispatch()
  const data = useSelector(selectTableData)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const pageSize = useSelector(selectTableSize)
  const pageOffset = useSelector(selectTableOffset)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [totalCount, setTotalCount] = useState <number>()
  const pageIndex = useSelector(selectTableIndex)

  useEffect(() => {
    setIsLoading(true)
    getCustomers(pageSize, pageOffset).then(({ results, next, previous, count }) => {
      setTotalCount(count)
      setHasNext(!!next)
      setHasPrevious(!!previous)
      dispatch(tableSlice.actions.setTableData(results))
      setIsLoading(false)
    })
  }, [pageSize, pageOffset, dispatch])
  return (
    <div className="p-2">
      <table className="myTable">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            // console.log(row)
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td>
                  <FormModal customer={row.original} />
                </td>
              </tr>)
          }

          )}
        </tbody>

      </table>

      <div>
        <button onClick={() => { dispatch(tableSlice.actions.setPageIndex(pageIndex - 1)) }} disabled={!hasPrevious || isLoading} >&larr;</button>
        <span>{pageIndex + 1}</span>
        <button onClick={() => { dispatch(tableSlice.actions.setPageIndex(pageIndex + 1)) }} disabled={!hasNext || isLoading}>&rarr;</button>
        {totalCount && <span>{pageSize} out of {totalCount}</span>}
      </div>
    </div>

  )


}




export const columns: Array<ColumnDef<any, any>> = [
  { header: "Name", accessorKey: "name" },
  { header: "Birthday date", accessorKey: "birthday_date" },
  { header: "Email", accessorKey: "email" },
  { header: "Phone number", accessorKey: "phone_number" },
  { header: "Address", accessorKey: "address" },

]