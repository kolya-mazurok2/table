import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAll } from '../../services/http/fake-authors';
import { Author } from '../../types/author';
import { SLICE_NAME } from './constants';

export const getAuthors = createAsyncThunk(
  `${SLICE_NAME}/getAuthors`,
  async (): Promise<Author[]> => {
    const response = await getAll();
    return response.data;
  }
);
