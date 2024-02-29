import React from 'react';
import { createTheme } from '@mui/material/styles';
import AppBoxShadows from './AppBoxShadows';
import colorPalette from './colorPalette';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body3: React.CSSProperties;
    body4: React.CSSProperties;
    button1: React.CSSProperties;
    button2: React.CSSProperties;
    caption2: React.CSSProperties;
  }

  // allow configuration using 'createTheme'
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
    button1?: React.CSSProperties;
    button2?: React.CSSProperties;
    caption2?: React.CSSProperties;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    backgroundColor: string;
    textFieldFocusColor: string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
    button1: true;
    button2: true;
    caption2: true;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

const defaultTheme = createTheme();
const { breakpoints } = defaultTheme;
const theme = {
  palette: {
    primary: {
      main: colorPalette.PRIMARY400,
      light: colorPalette.PRIMARY200,
      dark: colorPalette.PRIMARY800,
    },
    secondary: {
      main: colorPalette.SECONDARY400,
      light: colorPalette.SECONDARY50,
      dark: colorPalette.SECONDARY700,
    },
    backgroundColor: colorPalette.GRAY50,
    textFieldFocusColor: colorPalette.GRAY200,
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    /**
     * Designs define typopgraphy in pixels. Converted to rem using the default 1rem = 16px.
     * Font weights and mobile view sizings here are based on the most commonly used
     * in the designs for their variant.
     */
    h1: {
      fontSize: '2.125rem', // 34px
      fontWeight: 700,
      [breakpoints.down('md')]: {
        fontSize: '1.625rem',
      },
    },
    h2: {
      fontSize: '1.875rem', // 30px
      fontWeight: 500,
      [breakpoints.down('md')]: {
        fontSize: '1.625rem',
        fontWeight: 500,
      },
    },
    h3: {
      fontSize: '1.625rem', // 26px
      fontWeight: 600,
      [breakpoints.down('md')]: {
        fontSize: '1.375rem',
      },
    },
    h4: {
      fontSize: '1.375rem', // 22px
      fontWeight: 500,
    },
    // Default font size. Copied from body2
    body: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
    },
    body1: {
      fontSize: '1.125rem', // 18px
      fontWeight: 400,
      [breakpoints.down('md')]: {
        fontSize: '1rem',
      },
    },
    body2: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      [breakpoints.down('md')]: {
        fontSize: '0.875rem',
      },
    },
    body3: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
    },
    body4: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
    },
    caption2: {
      fontSize: '0.625rem', // 10px
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontStyle: 'normal',
      fontWeight: 600,
      letterSpacing: '0em',
    },
    button1: {
      fontSize: '1.125rem', // 18px
      fontWeight: 700,
    },
    button2: {
      fontSize: '1rem', // 16px
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: 'none',
          '&:focus': {
            boxShadow: 'none',
          },
        },
      },
      variants: [
        {
          props: { size: 'medium' as const },
          style: {
            padding: '0.75rem 1.15rem',
          },
        },
        {
          props: { size: 'large' as const },
          style: {
            padding: '0.75rem 3.8rem',
            [breakpoints.down('md')]: {
              padding: '0.75rem 1.15rem',
            },
          },
        },
        {
          props: { btntype: 'primary' as const },
          style: {
            backgroundColor: colorPalette.PRIMARY400,
            borderRadius: '12px',
            color: colorPalette.WHITE,
            border: '1px solid transparent',
            '&:hover': {
              backgroundColor: colorPalette.PRIMARY300,
              boxShadow: AppBoxShadows.shadow5,
            },
            '&:active': {
              backgroundColor: colorPalette.PRIMARY500,
            },
            '&.Mui-disabled': {
              backgroundColor: colorPalette.GRAY100,
              color: colorPalette.GRAY400,
              boxShadow: 'none',
            },
            '&.MuiButton-textError': {
              backgroundColor: colorPalette.RED400,
            },
          },
        },
        {
          props: { btntype: 'secondary' as const },
          style: {
            backgroundColor: colorPalette.PRIMARY50,
            border: '1px solid transparent',
            borderRadius: '12px',
            '&:hover, &:active': {
              backgroundColor: colorPalette.PRIMARY100,
            },
            '&:active': {
              borderColor: colorPalette.PRIMARY400,
            },
            '&.Mui-disabled': {
              backgroundColor: colorPalette.GRAY100,
              color: colorPalette.GRAY400,
              boxShadow: 'none',
            },
          },
        },
        {
          props: { btntype: 'tertiary' as const },
          style: {
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            borderRadius: '12px',
            '&:hover, &:active': {
              backgroundColor: colorPalette.PRIMARY50,
            },
            '&:active': {
              borderColor: colorPalette.PRIMARY400,
            },
            '&.Mui-disabled': {
              color: colorPalette.GRAY400,
            },
            '&.MuiButton-textError': {
              color: colorPalette.RED400,
              '&:hover, &:active': {
                backgroundColor: 'transparent',
                border: '1px solid transparent',
              },
            },
          },
        },
      ],
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          // Remove light blue autofill background on Chrome
          WebkitBoxShadow: '0 0 0 30px white inset',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)',
        },
        elevation24: {
          boxShadow: `0px 24px 23px rgba(0, 0, 0, 0.01),
            0px 9px 27px rgba(0, 0, 0, 0.05),
            0px 11px 15px rgba(0, 0, 0, 0.04)`,
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          [breakpoints.up('md')]: {
            top: 98,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colorPalette.WHITE,
          '&:hover:not(.Mui-error):not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
            borderColor: colorPalette.PRIMARY300,
          },
          '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: colorPalette.PRIMARY400,
          },
          '&:hover .MuiInputAdornment-positionStart:first-of-type .MuiSvgIcon-root': {
            color: colorPalette.PRIMARY300,
          },
          '&.Mui-focused .MuiInputAdornment-positionStart:first-of-type .MuiSvgIcon-root': {
            color: colorPalette.PRIMARY400,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: colorPalette.RED600,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          color: colorPalette.RED500,
        },
        root: {
          '&.Mui-error:not(.MuiInputLabel-shrink)': {
            color: colorPalette.GRAY600,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: colorPalette.RED600,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: '0.25rem',
          fontSize: '0.625rem',
          '&.Mui-error': {
            color: colorPalette.RED600,
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 16,
          },
          [breakpoints.down('md')]: {
            padding: 13,
            '&:last-child': {
              paddingBottom: 13,
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.MuiTab-root': {
            textTransform: 'capitalize',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 1,
          },
        },
      },
    },
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          '& .MuiTypography-caption': {
            fontWeight: 'bolder',
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          '& .highlight': {
            '&:hover, &.Mui-focused': {
              backgroundColor: colorPalette.PRIMARY50,
            },
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
      xxl: 1536,
    },
  },
};

export default createTheme(theme);
