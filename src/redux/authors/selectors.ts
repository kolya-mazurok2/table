import { createSelector } from 'reselect';
import { RootState } from '../';

const getAuthors = (state: RootState) => state.authors;

export const getAuthorsSelector = createSelector(getAuthors, (authors) => authors.entities);

export const getSelectedAuthorsSelector = createSelector(
  getAuthors,
  (authors) => authors.selectedEntities
);

export const getSelectedAuthorsIdsSelector = createSelector(getAuthors, (authors) =>
  authors.selectedEntities.map((author) => author.id)
);
