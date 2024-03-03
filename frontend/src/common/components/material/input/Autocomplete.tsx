import React from 'react';
import { get } from 'lodash';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import MUIAutocomplete, { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CancelIcon from '@mui/icons-material/Cancel';

import colorPalette from 'common/theme/colorPalette';
import { AutocompleteProps } from 'common/types/Form.type';
import { StyledSkillChip } from 'home/components/SkillChip';
import TextField from '../TextField';
import Typography from '../Typography';

const Autocomplete: React.FC<AutocompleteProps> = React.forwardRef((props, ref) => {
  const {
    children,
    label,
    placeholder,
    helperText,
    value,
    multiple,
    customReadOnly,
    hasIconChip,
    limit,
    ChipComponent = StyledSkillChip,
    getOptionLabel,
    getOptionAvatar,
    onChange,
    errorMessage,
    errorsArray,
    optionKey = 'id',
    ...autocompleteProps
  } = props;

  const getLabel = (option: any) => {
    if (typeof option === 'string') {
      return option;
    }
    return getOptionLabel ? getOptionLabel(option) : option.label;
  };

  const getAvatar = (option: any) => {
    return getOptionAvatar ? getOptionAvatar(option) : option.photo;
  };

  const renderTags = (value: readonly any[], getTagProps: AutocompleteRenderGetTagProps) =>
    value.map((option: any, index: number) => {
      const tagProps = getTagProps({ index });
      const color = get(errorsArray, `[${index}]`) ? 'error' : 'secondary';
      let { onDelete, ...restProps } = tagProps;

      return (
        <ChipComponent
          clickable={!customReadOnly}
          label={getLabel(option)}
          color={!customReadOnly ? color : undefined}
          avatar={hasIconChip ? getAvatar(option) : undefined}
          deleteIcon={<CancelRoundedIcon fill={colorPalette.WHITE} />}
          variant="filled"
          {...restProps}
          // Remove the tag on click
          onClick={!customReadOnly ? onDelete : undefined}
          onDelete={!customReadOnly ? onDelete : undefined}
        />
      );
    });

  const handleChange = (value: any) => {
    onChange && onChange(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (limit && value?.length >= limit) {
      event.preventDefault();
    }
  };

  return (
    <MUIAutocomplete
      filterSelectedOptions
      multiple={multiple}
      renderTags={multiple ? renderTags : undefined}
      disabled={customReadOnly}
      renderInput={(defaultFieldProps) => {
        const { InputProps: MUIInputProps, inputProps, ...defaultProps } = defaultFieldProps;

        return (
          <TextField
            variant="outlined"
            label={label}
            placeholder={multiple && value?.length ? '' : placeholder}
            error={!!errorMessage}
            helperText={errorMessage || helperText}
            onKeyDown={handleKeyDown}
            {...defaultProps}
            InputProps={{
              ...MUIInputProps,
            }}
            autoFocus={autocompleteProps.autoFocus}
            inputProps={{ ...inputProps }}
          />
        );
      }}
      getOptionLabel={getOptionLabel}
      // Highlight matched term in search results
      // https://mui.com/components/autocomplete/#highlights
      renderOption={(props, option: any, { inputValue }) => {
        const label = getLabel(option);
        const matches = match(label, inputValue, { insideWords: true });
        const parts = parse(label, matches);

        return (
          <li {...props} key={get(option, optionKey) ?? option}>
            <Typography>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 600 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </Typography>
          </li>
        );
      }}
      onChange={(e, value) => handleChange(value)}
      value={value}
      clearIcon={<CancelIcon fontSize="small" />}
      popupIcon={<></>}
      ref={ref}
      {...autocompleteProps}
    />
  );
});

export default Autocomplete;
