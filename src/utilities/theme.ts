import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Comic Sans MS',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      p {
        color: white;
      }
      `,
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '&:hover .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiInputBase-root.Mui-focused .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'white',
          },

          '& .MuiInput-root::before': {
            border: 'none',
          },
          '&& .MuiInput-underline:hover:before': {
            border: 'none',
          },
          '.MuiInput-underline:after': {
            borderBottom: '1px solid white',
          },
          '.MuiSelect-iconStandard': {
            color: 'white',
          },
        },
      },
    },
  },
});
