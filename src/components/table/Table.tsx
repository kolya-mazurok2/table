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
import { PropsWithChildren, ReactElement, useEffect } from 'react';
import { TableOptions, useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table';
import { usePrevious } from '../../utils';
import { useRowSelectByCheckbox } from './hooks';
import SearchBox from './SearchBox';
import { isEqual } from 'lodash';

const Table = <T extends Record<string, unknown> & { id: number | string }>({
  columns,
  data,
  hasGlobalSearch,
  hasSortBy,
  hasRowSelection,
  onRowsSelected,
}: PropsWithChildren<TableOptions<T>> & {
  hasGlobalSearch?: boolean;
  hasSortBy?: boolean;
  hasRowSelection?: boolean;
  onRowsSelected?: (ids: (string | number)[]) => void;
}): ReactElement => {
  const hooks = [useGlobalFilter, useSortBy, useRowSelect, useRowSelectByCheckbox];

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

  const prevSelectedRowIds = usePrevious(state.selectedRowIds);

  useEffect(() => {
    if (isEqual(prevSelectedRowIds, state.selectedRowIds)) {
      return;
    }

    const keys = Object.keys(state.selectedRowIds);

    onRowsSelected?.(rows.filter((row) => keys.includes(row.id)).map((row) => row.original.id));
  }, [state.selectedRowIds]);

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
