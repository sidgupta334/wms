import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import queryClient from 'common/utils/QueryClient';
import AppRouter from 'common/routes/AppRouter';
import theme from 'common/theme';
import { ThemeProvider } from '@mui/material';
import Snackbar from 'common/components/material/Snackbar';
import ApplicationContextProvider from 'common/context/ApplicationContextProvider';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationContextProvider>
        <ThemeProvider theme={theme}>
          <Snackbar />
          <Router>
            <AppRouter />
          </Router>
        </ThemeProvider>
      </ApplicationContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
