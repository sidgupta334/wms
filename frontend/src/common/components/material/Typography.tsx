import React from 'react';
import MUITypography, {
  TypographyTypeMap,
  TypographyProps as MUITypographyProps,
} from '@mui/material/Typography';
import theme from 'common/theme';
import { MUIRef } from 'common/types/MUIRef.type';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import ColorPalette from 'common/theme/colorPalette';

export type TypographyProps = MUITypographyProps;

const Typography: React.FC<TypographyProps> = React.forwardRef(
  (props: TypographyProps, ref: MUIRef) => {
    const { children, color, ...TypographyProps } = props;

    return (
      <MUITypography
        ref={ref}
        {...TypographyProps}
        style={{
          fontFamily: theme.typography.fontFamily,
          color: color || ColorPalette.PRIMARY800,
        }}
      >
        {children}
      </MUITypography>
    );
  },
) as OverridableComponent<TypographyTypeMap>;

export default Typography;
