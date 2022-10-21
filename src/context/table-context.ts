import { createContext, useContext } from 'react'
import type { Table } from '@tanstack/react-table'

export const TableContext = createContext<Partial<{ table: any }>>({})

export function useTable<T>(): Table<T> {
  return useContext(TableContext).table
}
