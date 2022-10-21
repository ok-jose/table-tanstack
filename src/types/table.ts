import { ReactNode } from 'react'

export type Column<T> = {
  dataIndex: keyof T
  title?: string
  render?: (value: any, record: any, index: number) => ReactNode
  children?: Column<T>[]
}
