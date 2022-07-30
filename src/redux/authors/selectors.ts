import { createSelector } from 'reselect';
import { RootState } from '../';

const getAuthors = (state: RootState) => state.authors;

export const getAuthorsSelector = createSelector(getAuthors, (authors) => authors.entities);

export const getSelectedAuthors = createSelector(getAuthors, (authors) => authors.selectedEntities);
