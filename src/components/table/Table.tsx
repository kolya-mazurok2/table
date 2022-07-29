import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import { PropsWithChildren, ReactElement } from 'react';
import { TableOptions, useTable, useSortBy, useGlobalFilter } from 'react-table';
import SearchBox from './SearchBox';

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  hasGlobalSearch,
}: PropsWithChildren<TableOptions<T>>): ReactElement => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable<T>(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <Box>
      {hasGlobalSearch && (
        <SearchBox globalFilter={state.globalFilter} onChangeGlobalFilter={setGlobalFilter} />
      )}

      <TableContainer {...getTableProps()} component="table">
        <TableHead>
          {headerGroups.map((headerGroup, index) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => {
                const { title: sortTitle = '', ...columnSortByProps } =
                  column.getSortByToggleProps();

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
    </Box>
  );
};

export default Table;
