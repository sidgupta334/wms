import React, { useState } from 'react';

import { validateMinLength } from 'common/utils/app.utils';

import { PaperProps } from '@mui/material/Paper';
import { concat, uniqBy } from 'lodash';
import Paper from '../material/Paper';
import useDebounce from 'common/hooks/useDebounce';
import Stack from '../material/Stack';
import { AutocompleteProps } from 'common/types/Form.type';
import { JobSkillType } from 'common/types/JobSkillType';
import useSearchJobTitlesApi from 'common/hooks/useSearchJobTitlesApi';
import Autocomplete from '../material/input/Autocomplete';

const CustomPaper = (props: PaperProps) => {
  return <Paper elevation={3} {...props} />;
};

type JobTitleSelectorProps = Omit<
  AutocompleteProps,
  'options' | 'onChange' | 'name' | 'label'
> & {
  readOnly?: boolean;
  onChange: (jobTitles: JobSkillType[]) => void;
  headerHelperText?: React.ReactNode;
  footerHelperText?: React.ReactNode;
  limit?: number;
};

const JobTitleSelector: React.FC<JobTitleSelectorProps> = ({
  readOnly,
  value,
  headerHelperText,
  footerHelperText,
  multiple = false,
  limit = 1,
  onChange,
  ...tagSelectorProps
}) => {
  const [inputValue, setInputValue] = useState('');
  const [valueState, setValue] = useState(value);
  const debouncedInputValue = useDebounce(inputValue);

  const { data, isLoading } = useSearchJobTitlesApi(debouncedInputValue, {
    enabled: validateMinLength(debouncedInputValue, 1),
  });

  return (
    <Stack spacing={1}>
      {headerHelperText}
      <Autocomplete
        multiple
        autoComplete
        limit={limit}
        PaperComponent={CustomPaper}
        loading={isLoading}
        name="jobTitle"
        label="Job Title"
        getOptionLabel={(option) => option?.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onInputChange={(e, value, reason) => {
          /**
           * This callback fired on input blur or when the
           * dropdown appeared, even with clearOnBlur set to false.
           * Had to ignore these reset events to prevent clearing
           * the input prematurely.
           */
          if (reason === 'reset') {
            return;
          }
          setInputValue(value);
        }}
        onChange={(value) => {
          setInputValue('');
          setValue(value);
          onChange(value);
        }}
        options={uniqBy(concat(value || [], data || []), 'id')}
        noOptionsText="No matching Job Titles"
        value={valueState}
        customReadOnly={readOnly}
        inputValue={inputValue}
        {...tagSelectorProps}
      />
      {footerHelperText}
    </Stack>
  );
};

export default JobTitleSelector;
