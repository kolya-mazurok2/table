import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import { appRouteElements } from './routing';

const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />

        <Routes>{appRouteElements}</Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
