import { flexRender } from '@tanstack/react-table'
import { useTable } from '~/context/table-context'

function Thead<T>() {
  const table = useTable<T>()
  return (
    <thead>
      {table!.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}
export default Thead
