import { useState, useMemo } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Table from '../table'
import { Person, fetchData } from '~/mock/person'
import type { PaginationState } from '@tanstack/react-table'

const queryClient = new QueryClient()
const columns = [
  {
    title: '姓名',
    children: [
      {
        title: '姓',
        dataIndex: 'firstName',
      },
      {
        title: '名',
        dataIndex: 'lastName',
      },
    ],
  },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
  { title: '状态', dataIndex: 'status' },
]

const RowExpanding = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  }

  const dataQuery = useQuery(['data', fetchDataOptions], () => fetchData(fetchDataOptions), {
    keepPreviousData: true,
  })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  )
  return (
    <Table<Person>
      columns={columns}
      data={dataQuery?.data?.data || []}
      pagination={pagination}
      pageCount={Math.ceil(dataQuery?.data?.data?.length || 0 / pageSize)}
      onPaginationChange={setPagination}
    />
  )
}

export const TableRowExpanding = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RowExpanding />
    </QueryClientProvider>
  )
}
