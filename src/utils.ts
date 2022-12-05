import { Column } from '~/types/table'
import { ColumnDef } from '@tanstack/react-table'

export const tableColumnTransformer = <RowData>(
  columns: Column<RowData>[],
): ColumnDef<RowData>[] => {
  const resultColumns: ColumnDef<RowData>[] = []
  columns.forEach((column) => {
    resultColumns.push({
      accessorKey: column.dataIndex!,
      header: column.title,
      cell: ({ row, getValue }) => {
        const value = getValue()
        if (column.render) {
          return column.render(value, row, row.index)
        }
        return value
      },
      columns: column.children ? tableColumnTransformer(column.children) : undefined,
    })
  })
  return resultColumns
}
