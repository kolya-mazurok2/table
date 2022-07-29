import { Column } from 'react-table';
import { Author } from '../../types/author';

export const authorColumns: Column<Author>[] = [
  {
    Header: 'Birthday Year',
    accessor: 'birthdayYear',
  },
  {
    Header: 'Last Title',
    accessor: 'lastTitle',
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
];
