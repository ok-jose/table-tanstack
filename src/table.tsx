import { useCallback, useMemo } from 'react'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { TableContext } from '~/context/table-context'
import { Column } from '~/types/table'
import Thead from '~/thead'
import Tbody from '~/tbody'

import './table.css'

type TableProps<RecordType> = {
  data: RecordType[]
  columns: Column<RecordType>[]
}

function Table<T>(props: TableProps<T>) {
  const { data, columns } = props
  const columnHelper = createColumnHelper<T>()

  const loopColumns = useCallback((columns: Column<T>[]): any[] => {
    return columns.map((column) => {
      if (column.children) {
        return columnHelper.group({
          header: (column.title || column.dataIndex) as string,
          columns: loopColumns(column.children),
        })
      }
      // todo 这里的类型转换不太好
      return columnHelper.accessor(column.dataIndex as unknown as any, {
        header: column.title,
      })
    })
  }, [])

  const tableColumns = useMemo(() => loopColumns(columns), [columns])
  const table = useReactTable<T>({
    columns: tableColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div>
      <TableContext.Provider value={{ table: table }}>
        <table>
          <Thead<T> />
          <Tbody<T> />
        </table>
      </TableContext.Provider>
    </div>
  )
}

export default Table
