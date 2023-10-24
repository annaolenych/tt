import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useDispatch, useSelector } from "react-redux"
import { selectTableData } from "../../store/selectors"
import { useEffect } from "react"
import axios from "axios"
import { Environment } from "../../constants/environment"
import { tableSlice } from "../../store/store"
import { getTables } from "../../util/api"
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

  useEffect(() => {
    getTables().then((result) => {
    
      dispatch(tableSlice.actions.setTableData(result))
    })
  },
    [])
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
                  <FormModal customer={row.original}/>
                </td>
              </tr>)
          }

          )}
        </tbody>

      </table>


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