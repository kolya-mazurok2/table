import { PropsWithChildren, ReactElement } from 'react';
import { TableOptions, useTable } from 'react-table';

export interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T> {
  name?: string;
}

export const Table = <T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement => {
  const { columns } = props;

  const { rows, getTableProps, headerGroups, getTableBodyProps, prepareRow } = useTable<T>({
    ...props,
    columns,
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={index}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={index}>
              {row.cells.map((cell, index) => {
                return (
                  <td {...cell.getCellProps()} key={index}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
