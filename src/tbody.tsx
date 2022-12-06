import { Fragment } from 'react'
import { flexRender } from '@tanstack/react-table'
import { useTable, useTableProps } from '~/context/table-context'

function Tbody<T>() {
  const table = useTable<T>()
  const tableProps = useTableProps<T>()
  const { expandable } = tableProps
  const { expandedRowRender, indentSize } = expandable || {}
  return (
    <tbody>
      {table!.getRowModel().rows.map((row) => (
        <Fragment key={row.id}>
          <tr>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
          {expandedRowRender && row.getIsExpanded() && (
            <tr>
              {/* 2nd row is a custom 1 cell row */}
              <td colSpan={row.getVisibleCells().length}>
                {expandedRowRender(row.original, row.index, indentSize!, row.getIsExpanded())}
              </td>
            </tr>
          )}
        </Fragment>
      ))}
    </tbody>
  )
}

export default Tbody
