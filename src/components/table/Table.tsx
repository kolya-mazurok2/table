import {
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from '@mui/material';
import { PropsWithChildren, ReactElement, useEffect, useMemo } from 'react';
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
  selectedIds,
}: PropsWithChildren<TableOptions<T>> & {
  hasGlobalSearch?: boolean;
  hasSortBy?: boolean;
  hasRowSelection?: boolean;
  onRowsSelected?: (ids: (string | number)[]) => void;
  selectedIds?: (string | number)[];
}): ReactElement => {
  const hooks = [useGlobalFilter, useSortBy, useRowSelect, useRowSelectByCheckbox];

  const initialSelectedRowIds: Record<string, boolean> = useMemo(
    () =>
      selectedIds
        ? data.reduce((prev: Record<string, boolean>, curr, currIndex) => {
            if (selectedIds.indexOf(curr.id) !== -1) {
              prev[currIndex] = true;
            }

            return prev;
          }, {})
        : {},
    [selectedIds]
  );

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
      initialState: {
        selectedRowIds: initialSelectedRowIds,
      },
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

  return data.length > 0 ? (
    <Box>
      {hasGlobalSearch && (
        <SearchBox globalFilter={state.globalFilter} onChangeGlobalFilter={setGlobalFilter} />
      )}

      <TableContainer>
        <MuiTable {...getTableProps()} component="table">
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
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={index}
                    >
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
        </MuiTable>
      </TableContainer>
    </Box>
  ) : (
    <Typography variant="h4">Empty!</Typography>
  );
};

export default Table;
