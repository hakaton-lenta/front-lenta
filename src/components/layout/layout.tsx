import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../header/header';
import Navigation from '../navigation/navigation';

export const Layout: FC = () => {
  return (
    <div className="layout">
      <Header />
      <Navigation />
      <Outlet />
    </div>
  );
};
