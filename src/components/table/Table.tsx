import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import { PropsWithChildren, ReactElement } from 'react';
import { TableOptions, useTable, useSortBy } from 'react-table';

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
}: PropsWithChildren<TableOptions<T>>): ReactElement => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <TableContainer {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, index) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => {
              const { title: sortTitle = '', ...columnSortByProps } = column.getSortByToggleProps();

              return (
                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                  <Tooltip title={sortTitle}>
                    <TableSortLabel
                      active={true}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                      {...columnSortByProps}
                    >
                      {column.render('Header')}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableHead>

      <TableBody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()} key={index}>
              {row.cells.map((cell, index) => {
                return (
                  <TableCell {...cell.getCellProps()} key={index}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </TableContainer>
  );
};

export default Table;
