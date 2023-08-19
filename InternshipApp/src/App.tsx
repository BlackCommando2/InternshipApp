import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './components/FormPage';
import SecondPage from './components/SecondPage';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/second" element={<SecondPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
