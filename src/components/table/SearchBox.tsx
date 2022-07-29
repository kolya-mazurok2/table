import { Search } from '@mui/icons-material';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

interface Props {
  globalFilter: string;
  onChangeGlobalFilter: (filterValue: string) => void;
}

const SearchBox = ({ globalFilter, onChangeGlobalFilter }: Props) => {
  const [value, setValue] = useState(globalFilter);

  const handleChange = (value: string) => {
    setValue(value);
    onChangeGlobalFilter(value);
  };

  return (
    <FormControl fullWidth>
      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        variant="standard"
        value={value || ''}
        onChange={(event) => {
          handleChange(event.currentTarget.value);
        }}
        placeholder="Type to search"
      />
    </FormControl>
  );
};

export default SearchBox;
