import { flexRender } from '@tanstack/react-table'
import { useTable } from '~/context/table-context'

function Tbody<T>() {
  const table = useTable<T>()
  return (
    <tbody>
      {table!.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default Tbody
