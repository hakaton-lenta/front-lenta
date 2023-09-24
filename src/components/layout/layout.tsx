import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../header/header';
// import Footer from '../Footer/Footer';

export const Layout: FC = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};
