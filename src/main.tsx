import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Layout } from './pages/layout/layout';
import { Provider } from 'react-redux';
import { RootState, store } from './services/redux/store';
import { useAppDispatch, useAppSelector } from './services/typeHooks';
import { getShopApi } from './services/redux/slices/shop/shop';
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_REGISTER } from './utils/constants';
import LoginPage from './pages/login';
import NotFound404 from './pages/notfound404';
import RegisterPage from './pages/register';
import Forecast from './pages/forecast/forecast';
import Statistics from './pages/statistics/statistics';
import Loader from './components/loader';
import { getProfileUser, logoutUser } from './services/redux/slices/auth/auth';
import Planer from './pages/planer/planer';

const RequireAuth = ({
  children: children,
  onlyAuth: onlyAuth,
  isLoggedIn: isLoggedIn,
  isLoading: isLoading,
}: {
  children: JSX.Element;
  onlyAuth: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
}) => {
  if (isLoading === false)
    if (onlyAuth === true)
      return isLoggedIn === true ? children : <Navigate to={ROUTE_LOGIN} />;
    else return isLoggedIn === false ? children : <Navigate to={ROUTE_HOME} />;
};

const App = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state: RootState) => state.user.isLoading);
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.user.isLoggedIn,
  );
  const access = localStorage.getItem('accessToken') ?? '';
  useEffect(() => {
    if (access.length !== 0) {
      dispatch(getProfileUser({ access }));
      dispatch(getShopApi({ token: access }));
    } else {
      dispatch(logoutUser({ access }));
      <Navigate to={ROUTE_LOGIN} />;
    }
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
            <RequireAuth
              onlyAuth={true}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
            >
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Planer />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/statistics" element={<Statistics />} />
        </Route>
        <Route
          path={ROUTE_LOGIN}
          element={
            <RequireAuth
              onlyAuth={false}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
            >
              <LoginPage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path={ROUTE_REGISTER}
          element={
            <RequireAuth
              onlyAuth={false}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
            >
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
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
