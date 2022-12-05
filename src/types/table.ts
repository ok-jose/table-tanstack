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
type ExpandedRowRender<ValueType> = (
  record: ValueType,
  index: number,
  indent: number,
  expanded: boolean,
) => ReactNode

type ExpandableConfig<T> = {
  expandedRowKeys?: readonly Key[]
  defaultExpandedRowKeys?: readonly Key[]
  expandedRowRender?: ExpandedRowRender<T> // next to do
  expandRowByClick?: boolean
  // expandIcon?: RenderExpandIcon<RecordType>
  onExpand?: (expanded: boolean, record: T) => void
  onExpandedRowsChange?: (expandedKeys: readonly Key[]) => void
  defaultExpandAllRows?: boolean
  indentSize?: number
  // 指定树形结构的列名
  childrenColumnName?: string
}

export type TableProps<RecordType> = {
  data?: RecordType[]
  columns: Column<RecordType>[]
  pagination?: boolean | PaginationState
  pageCount?: number
  onPaginationChange?: OnChangeFn<PaginationState>
  rowSelection?: TableRowSelection<RecordType>
  expandable?: ExpandableConfig<RecordType>
}

export type Column<T> = {
  dataIndex?: string | keyof T
  title?: string
  sorter?: boolean
  render?: (value: any, record: any, index: number) => ReactNode
  children?: Column<T>[]
}
