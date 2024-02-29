import React from 'react';
import { FieldValues, UseFormProps as _UseFormProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField';
import {
  AutocompleteProps as MUIAutocompleteProps,
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';

import { ValidationError } from 'common/types/Api.type';

export type InputValidationIndicatorProps = {
  isValid: boolean;
  isLoading: boolean;
  isError: boolean;
};

export type UseFormProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = _UseFormProps<TFieldValues, TContext> & {
  validationErrors?: ValidationError[];
  showMultipleMessages?: boolean;
};

export type FormTextFieldProps = Omit<TextFieldProps, 'onChange' | 'value'> & {
  value?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
};

export type AutocompleteProps = Omit<
  MUIAutocompleteProps<any, boolean, boolean, boolean>,
  'renderInput' | 'onChange'
> & {
  label: string;
  name?: string;
  helperText?: string;
  customReadOnly?: boolean;
  hasIconChip?: boolean;
  limit?: number;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  onChange?: (value: any) => void;
  getOptionAvatar?: (value: any) => void;
  formFieldProps?: TextFieldProps;
  ChipComponent?: React.FC<any>;
  errorMessage?: string;
  errorsArray?: any[];
  optionKey?: string;
  excludeOptions?: string[] | object[];
};

// Argument for the setValue method in React Hook Form's useForm hook
// TS compiler can't infer string from literal.
export type FieldName = `${string}` | `${string}.${string}` | `${string}.${number}`;
