import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { amber, deepOrange, grey, blueGrey, indigo } from '@mui/material/colors';

//reducer
import { useSelector, useDispatch } from 'react-redux';
//
import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};



export default function ThemeProvider({ children }) {
  const dispatch = useDispatch();

  const isDarkMode = useSelector(state => state.user.isDarkMode)

  const themeOptions = useMemo(
    () => ({
      palette: {
        primary: {
          ...amber,
          ...(isDarkMode && {
            main: deepOrange[300]
          }),
        },
        mode: isDarkMode ? 'dark' : 'light',
        background: {
          ...(isDarkMode && {
            default: '#151B23',
            paper: '#212B36'
          })
        }
      },
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    [isDarkMode]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
