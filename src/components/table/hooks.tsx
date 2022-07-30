import { Checkbox } from '@mui/material';
import { Hooks } from 'react-table';

export const useRowSelectByCheckbox = <D extends object>(hooks: Hooks<D>): void => {
  hooks.allColumns.push((columns) => [
    {
      id: 'selection',
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      Header: ({ getToggleAllRowsSelectedProps }: any) => (
        <Checkbox {...getToggleAllRowsSelectedProps()} />
      ),
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      Cell: ({ row }: any) => <Checkbox {...row.getToggleRowSelectedProps()} />,
      disableSortBy: true,
    },
    ...columns,
  ]);
};
