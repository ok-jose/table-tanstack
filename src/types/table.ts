import { ReactNode, Key } from 'react'
import type { PaginationState, OnChangeFn } from '@tanstack/react-table'

export type RowSelectionType = 'checkbox' | 'radio'
export type SelectionSelectFn<T> = (
  record: T,
  selected: boolean,
  selectedRows: T[],
  nativeEvent: Event,
) => void

export type TableRowSelection<T> = {
  type?: RowSelectionType
  selectedRowKeys?: Key[]
  defaultSelectedRowKeys?: Key[]
  onSelect?: SelectionSelectFn<T>
}

export type TableProps<RecordType> = {
  data?: RecordType[]
  columns: Column<RecordType>[]
  pagination?: boolean | PaginationState
  pageCount?: number
  onPaginationChange?: OnChangeFn<PaginationState>
  rowSelection?: TableRowSelection<RecordType>
}

export type Column<T> = {
  dataIndex?: string
  title?: string
  render?: (value: any, record: any, index: number) => ReactNode
  children?: Column<T>[]
}
