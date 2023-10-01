import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Layout } from './components/layout/layout';
import { Provider } from 'react-redux';
import { store } from './services/redux/store';
import { useAppDispatch } from './services/typeHooks';
import { getCategoryApi } from './services/redux/slices/categories/categories';
import { getShopApi } from './services/redux/slices/shop/shop';
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_REGISTER } from './utils/constants';
import LoginPage from './pages/login';
import NotFound404 from './pages/notfound404';
import RegisterPage from './pages/register';
import Forecast from './page/forecast/forecast';
import Statistics from './page/statistics/statistics';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategoryApi());
    dispatch(getShopApi());
  }, []);

  return (
    <section className="page">
      <Routes>
        <Route path={ROUTE_HOME} element={<Layout />}></Route>
        <Route path={ROUTE_LOGIN} element={<LoginPage />}></Route>
        <Route path={ROUTE_REGISTER} element={<RegisterPage />}></Route>
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="*" element={<NotFound404 />}></Route>
      </Routes>
    </section>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
