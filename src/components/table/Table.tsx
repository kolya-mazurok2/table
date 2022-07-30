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
import { TableOptions, useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table';
import { useRowSelectByCheckbox } from './hooks';
import SearchBox from './SearchBox';

const Table = <T extends Record<string, unknown> & { id: number | string }>({
  columns,
  data,
  hasGlobalSearch,
  hasSortBy,
  hasRowSelection,
}: PropsWithChildren<TableOptions<T>>): ReactElement => {
  const hooks = [useGlobalFilter, useSortBy, useRowSelect, useRowSelectByCheckbox];

  console.log(hooks);

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
    ...hooks
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
                if (!hasRowSelection && column.id === 'selection') {
                  return;
                }

                const { title: sortTitle = '', ...columnSortByProps } =
                  column.getSortByToggleProps();

                return hasSortBy && column.canSort ? (
                  <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                    <Tooltip title={sortTitle}>
                      <TableSortLabel
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                        {...columnSortByProps}
                      >
                        {column.render('Header')}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                ) : (
                  <TableCell {...column.getHeaderProps()} key={index}>
                    {column.render('Header')}
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
                  if (!hasRowSelection && cell.column.id === 'selection') {
                    return;
                  }

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
