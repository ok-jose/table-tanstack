import { useCallback, useMemo, useState } from 'react'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table'
import type { TableState } from '@tanstack/react-table'
import { isEmpty, isBoolean, get } from 'lodash-es'
import { TableContext } from '~/context/table-context'
import { Column, TableProps } from '~/types/table'
import Thead from '~/thead'
import Tbody from '~/tbody'
import { Pagination } from '~/pagination'

import './table.css'
import { IndeterminateCheckbox } from '~/components/indeterminate-checkbox/indeterminate-checkbox'

function Table<T>(props: TableProps<T>) {
  const {
    data = [],
    columns,
    pagination = true,
    pageCount = -1,
    onPaginationChange,
    rowSelection,
    expandable,
  } = props
  const {
    childrenColumnName = 'subRows',
    indentSize = 2,
    onExpand,
    expandedRowRender,
    getRowCanExpand,
  } = expandable || {}
  const [sorting, setSorting] = useState<SortingState>([])

  const loopColumns = useCallback(
    (columns: Column<T>[]): ColumnDef<T>[] => {
      const resultColumns: ColumnDef<T>[] = []
      columns.forEach((column, index) => {
        resultColumns.push({
          id: column.dataIndex as string,
          accessorKey: column.dataIndex!,
          header: column.title,
          cell: ({ row, getValue }) => {
            const value = getValue() as string
            let canExpand = false
            let isExpanded = false
            if (index === 0) {
              canExpand =
                row.getCanExpand() && get(row.original, childrenColumnName, [])?.length > 0
              isExpanded = row.getIsExpanded()
            }
            return (
              <div style={{ paddingLeft: `${row.depth * indentSize}rem` }}>
                <span>
                  {canExpand && (
                    <button
                      onClick={() => {
                        row.getToggleExpandedHandler()()
                        onExpand?.(!isExpanded, row.original)
                      }}
                    >
                      {isExpanded ? '[-]' : '[+]'}
                    </button>
                  )}
                </span>
                <span>{column.render ? column.render(value, row.original, row.index) : value}</span>
              </div>
            )
          },
          columns: column.children ? loopColumns(column.children) : undefined,
        })
      })
      return resultColumns
    },
    [childrenColumnName, indentSize, onExpand],
  )

  const tableColumns = useMemo<ColumnDef<T>[]>(() => loopColumns(columns), [columns, loopColumns])
  const tableColumnsWithOperator = useMemo<ColumnDef<T>[]>(() => {
    const prefixColumns: ColumnDef<T>[] = []
    if (rowSelection) {
      prefixColumns.push({
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: (e) => {
                table.getToggleAllRowsSelectedHandler()(e)
              },
            }}
          />
        ),
        cell: ({ row }) => (
          <div className='px-1'>
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      })
    } else if (expandedRowRender) {
      prefixColumns.push({
        id: 'expander',
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: 'pointer' },
              }}
            >
              {row.getIsExpanded() ? '👇' : '👉'}
            </button>
          ) : (
            '🔵'
          )
        },
      })
    }
    return [...prefixColumns, ...tableColumns]
  }, [expandedRowRender, rowSelection, tableColumns])

  const tableState = useMemo(() => {
    const _state = {} as TableState
    if (!isBoolean(pagination)) {
      _state.pagination = pagination
    }
    return !isEmpty(_state) ? { state: _state } : undefined
  }, [pagination])

  const manualPaginationInfo = useMemo(() => {
    if (isBoolean(pagination)) {
      return undefined
    }
    return {
      pageCount,
      onPaginationChange,
      manualPagination: true,
    }
  }, [onPaginationChange, pageCount, pagination])

  const table = useReactTable<T>({
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    columns: tableColumnsWithOperator,
    data,
    ...tableState,
    getCoreRowModel: getCoreRowModel(),
    getSubRows: (row) => get(row, childrenColumnName),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: getRowCanExpand,
    getPaginationRowModel: getPaginationRowModel(),
    ...manualPaginationInfo,
  })
  return (
    <div>
      <TableContext.Provider value={{ table: table, tableProps: props }}>
        <table>
          <Thead<T> />
          <Tbody<T> />
        </table>
        {pagination && <Pagination />}
      </TableContext.Provider>
    </div>
  )
}

export default Table
