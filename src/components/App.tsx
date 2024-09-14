// react
// import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// project
import { routes } from '@/routes';
import GlobalStyles from '@/assets/styles/GlobalStyles';

// state
// import { store } from '@/state';
// import { StoreProvider } from 'easy-peasy';


const App = () => {
  return (
    // <StoreProvider store={store}>
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        {routes.map(({ path, title, component: Page }) => (
          <Route key={path} path={path.replace(/\/$/, '')} element={<Page title={title || ''} />} />
        ))}
      </Routes>
    </BrowserRouter>
    // </StoreProvider>
  );
};

export default App;
