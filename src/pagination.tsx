import { useTable } from '~/context/table-context'
import { Pagination as AntdPagination } from 'antd'
import { useCallback } from 'react'

function Pagination<T>() {
  const table = useTable<T>()
  const total = table.getTotalSize()
  const onPaginationChange = useCallback(
    (pageIndex: number, pageSize: number) => {
      table.setPagination({
        pageIndex,
        pageSize,
      })
    },
    [table],
  )
  const onShowSizeChange = useCallback(
    (_: number, pageSize: number) => {
      table.setPagination({
        pageIndex: 1,
        pageSize,
      })
    },
    [table],
  )
  return (
    <AntdPagination
      total={total}
      onChange={onPaginationChange}
      onShowSizeChange={onShowSizeChange}
    />
  )
}
export { Pagination }
