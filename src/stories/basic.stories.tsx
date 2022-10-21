import Table from '../table'

export const Basic = () => {
  return (
    <Table<{ name: string; age: number; firstName: string; lastName: string }>
      columns={[
        {
          title: '姓名',
          dataIndex: 'name',
          render: (_, record) => `${record.name}-${record.age}`,
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
      ]}
      data={[
        { name: 'jose', age: 28, firstName: 'jose1', lastName: 'lee' },
        { name: 'woffee', age: 27, firstName: 'woffee', lastName: 'wang' },
      ]}
    />
  )
}
