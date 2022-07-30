import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Author } from '../../types/author';
import { getAuthors } from './actions';
import { SLICE_NAME } from './constants';

export interface State {
  entities: Author[];
  selectedEntities: Author[];
}

export const INITIAL_STATE: State = {
  entities: [],
  selectedEntities: [],
};

const slice = createSlice({
  name: SLICE_NAME,
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedEntities: (state, action: PayloadAction<(number | string)[]>) => {
      state.selectedEntities = state.entities.filter((entity) =>
        action.payload.includes(entity.id)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthors.fulfilled, (state, payload) => {
      state.entities = payload.payload;
    });
  },
});

export const auhtorsReducer = slice.reducer;

export const { setSelectedEntities } = slice.actions;
