import React, { useEffect } from 'react';
import { HashRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Layout } from './pages/layout/layout';
import { Provider } from 'react-redux';
import { RootState, store } from './services/redux/store';
import { useAppDispatch, useAppSelector } from './services/typeHooks';
import { getCategoryApi } from './services/redux/slices/categories/categories';
import { getShopApi } from './services/redux/slices/shop/shop';
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_REGISTER } from './utils/constants';
import LoginPage from './pages/login';
import NotFound404 from './pages/notfound404';
import RegisterPage from './pages/register';
import Forecast from './pages/forecast/forecast';
import Statistics from './pages/statistics/statistics';
import Loader from './components/loader';
import { getProfileUser } from './services/redux/slices/auth/auth';

const RequireAuth = ({
  children: children,
  onlyAuth: onlyAuth,
  isLoggedIn: isLoggedIn,
}: {
  children: JSX.Element;
  onlyAuth: boolean;
  isLoggedIn: boolean;
}) => {
  if (onlyAuth === true)
    return isLoggedIn === true ? (
      children
    ) : (
      <Navigate to={ROUTE_LOGIN} replace />
    );
  else
    return isLoggedIn === false ? (
      children
    ) : (
      <Navigate to={ROUTE_HOME} replace />
    );
};

const App = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state: RootState) => state.user.isLoading);
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.user.isLoggedIn,
  );
  const access = localStorage.getItem('accessToken') ?? '';
  useEffect(() => {
    if (access !== '') dispatch(getProfileUser({ access }));
    dispatch(getCategoryApi());
    dispatch(getShopApi());
  }, []);

  if (isLoading) {
    return (
      <section className="page">
        <Loader />
      </section>
    );
  }
  return (
    <section className="page">
      <Routes>
        <Route
          path={ROUTE_HOME}
          element={
            <RequireAuth onlyAuth={true} isLoggedIn={isLoggedIn}>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/statistics" element={<Statistics />} />
        </Route>
        <Route
          path={ROUTE_LOGIN}
          element={
            <RequireAuth onlyAuth={false} isLoggedIn={isLoggedIn}>
              <LoginPage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path={ROUTE_REGISTER}
          element={
            <RequireAuth onlyAuth={false} isLoggedIn={isLoggedIn}>
              <RegisterPage />
            </RequireAuth>
          }
        ></Route>
        <Route path="*" element={<NotFound404 />}></Route>
      </Routes>
    </section>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
