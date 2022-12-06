import { createContext, useContext } from 'react'
import type { Table } from '@tanstack/react-table'
import type { TableProps } from '~/types/table'

export const TableContext = createContext<Partial<{ table: any; tableProps: TableProps<any> }>>({})

export function useTable<T>(): Table<T> {
  return useContext(TableContext).table
}
export function useTableProps<T>(): TableProps<T> {
  return useContext(TableContext).tableProps!
}
