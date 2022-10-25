import { ReactNode } from 'react'
import type { PaginationState, OnChangeFn } from '@tanstack/react-table'

export type TableProps<RecordType> = {
  data?: RecordType[]
  columns: Column<RecordType>[]
  pagination?: boolean | PaginationState
  pageCount?: number
  onPaginationChange?: OnChangeFn<PaginationState>
}

export type Column<T> = {
  dataIndex?: string
  title?: string
  render?: (value: any, record: any, index: number) => ReactNode
  children?: Column<T>[]
}
