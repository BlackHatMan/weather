import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './utilities/theme';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
