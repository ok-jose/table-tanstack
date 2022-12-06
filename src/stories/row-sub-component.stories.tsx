import { useState, useMemo, useCallback } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Table from '../table'
import { Person, fetchData } from '~/mock/person'
import { Car, makeData } from '~/mock/car'
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

const carColumns = [
  {
    title: '品牌',
    dataIndex: 'brand',
  },
  {
    title: '车牌号',
    dataIndex: 'plate',
  },
  {
    title: '颜色',
    dataIndex: 'color',
  },
  {
    title: '价格',
    dataIndex: 'price',
    render: (value: number) => `${value}人民币`,
  },
  {
    title: '车主',
    dataIndex: 'owner',
  },
  {
    title: '几座',
    dataIndex: 'seats',
  },
  {
    title: '型号',
    dataIndex: 'model',
  },
  {
    title: '年代',
    dataIndex: 'year',
  },
  {
    title: 'fuel',
    dataIndex: 'fuel',
  },
]

const SubComponent = () => {
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

  const expandedRowRender = useCallback(() => {
    return <Table<Car> columns={carColumns} data={makeData(10)} pagination={false} />
  }, [])
  return (
    <Table<Person>
      columns={columns}
      data={dataQuery?.data?.data || []}
      pagination={pagination}
      expandable={{ expandedRowRender, getRowCanExpand: () => true }}
      pageCount={Math.ceil(dataQuery?.data?.data?.length || 0 / pageSize)}
      onPaginationChange={setPagination}
    />
  )
}

export const RowSubComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SubComponent />
    </QueryClientProvider>
  )
}
