import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { styled } from '@mui/material/styles';
import React, { ChangeEvent } from 'react';

import TextField, { TextFieldProps } from 'common/components/material/TextField';
import ToggleVisibilityContainer from 'common/components/containers/ToggleVisibilityContainer';
import InputAdornment from './InputAdornment';

const DEFAULT_PLACEHOLDER = 'Search';

type SearchInputProps = Omit<TextFieldProps, 'onChange'> & {
  onChange: (value: string) => void;
  onClear?: () => void;
  onSubmit?: () => void;
};

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '0.75rem',
    ...theme.typography.body4,
  },
  '& .MuiOutlinedInput-root input.MuiInputBase-input.MuiInputBase-inputSizeSmall': {
    padding: '0.4rem',
  },
}));

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = DEFAULT_PLACEHOLDER,
  value,
  onChange,
  onSubmit,
  onClear,
  ...searchInputProps
}) => {
  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && value) {
      onSubmit && onSubmit();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange('');
    onClear && onClear();
  };

  return (
    <StyledTextField
      type="search"
      size="medium"
      onKeyUp={handleKeyUp}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      {...searchInputProps}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon sx={{ width: 20 }} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end" sx={{ margin: 0 }}>
            <ToggleVisibilityContainer display="flex" isVisible={!!value}>
              <HighlightOffIcon
                sx={{ cursor: 'pointer', width: 20, height: 20, marginRight: 0.5 }}
                onClick={handleClear}
              />
            </ToggleVisibilityContainer>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
