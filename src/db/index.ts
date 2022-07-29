import { v4 } from 'uuid';
import { Author } from '../types/author';

export const authors: Author[] = [
  {
    id: v4(),
    firstName: 'James',
    lastName: 'Patterson',
    birthdayYear: 1947,
    lastTitle: 'Death of the Black Widow',
  },
  {
    id: v4(),
    firstName: 'David',
    lastName: 'Baldacci',
    birthdayYear: 1960,
    lastTitle: 'Dream Town',
  },
  {
    id: v4(),
    firstName: 'Nora',
    lastName: 'Roberts',
    birthdayYear: 1950,
    lastTitle: 'Legacy',
  },
  {
    id: v4(),
    firstName: 'Michael',
    lastName: 'Connelly',
    birthdayYear: 1956,
    lastTitle: 'The Dark Hours',
  },
];
