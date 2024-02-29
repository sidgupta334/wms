import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';

//TODO: HL: Need to resolve any with appropriate type
export type RenderTextFieldProps = {
  field: ControllerRenderProps<any, string>;
  fieldState: ControllerFieldState;
};
