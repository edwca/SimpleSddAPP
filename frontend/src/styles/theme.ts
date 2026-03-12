import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#0b1220',
      light: '#1b263b',
    },
    secondary: {
      main: '#0f766e',
      light: '#67e8cf',
      dark: '#134e4a',
      contrastText: '#f7f9fc',
    },
    background: {
      default: '#eef4f3',
      paper: '#f7fbfb',
    },
    text: {
      primary: '#0c1526',
      secondary: '#4a5a72',
    },
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily: '"Sora", "Manrope", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: 'clamp(2.4rem, 5vw, 4.6rem)',
      letterSpacing: '-0.06em',
    },
    h3: {
      fontWeight: 700,
      fontSize: 'clamp(1.9rem, 4vw, 3rem)',
      letterSpacing: '-0.05em',
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
      root: {
          borderRadius: 999,
          fontWeight: 700,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
          minHeight: 44,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
