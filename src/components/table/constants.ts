import { Column } from 'react-table';
import { Author } from '../../types/author';

export const authorColumns: Column<Author>[] = [
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Birthday Year',
    accessor: 'birthdayYear',
  },
  {
    Header: 'Last Title',
    accessor: 'lastTitle',
  },
];
