import React, { FC } from 'react';
// import trendingUp from '@/assets/icon/trending-up.svg';
import bookOpen from '@/assets/icon/book-open.svg';
import chartLine from '@/assets/icon/ChartLine.svg';
import chartScatter from '@/assets/icon/chart-scatter1.svg';
import fileText from '@/assets/icon/file-text.svg';
import trello from '@/assets/icon/trello.svg';
// import leftArrow from '@/assets/icon/leftArrow.svg';
// import logout from '@/assets/icon/logout.svg';
import gear from '@/assets/icon/Gear.svg';
import './navigation.css';
import { NavLink, useLocation } from 'react-router-dom';

// interface ComponentProps {
//   toggleMenu: () => void;
// }

const OpenComponent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="open">
      <div className="open__menu">
        <h2 className="open__menu-span">Аналитика</h2>
        <nav className="open__nav">
          <NavLink
            to="/"
            className={`open__menu-link ${
              location.pathname === '/' ? 'open__menu-active' : ''
            }`}
          >
            <img className="open__nav-img" src={trello} alt="Icon 1" />
            Планер
          </NavLink>
          <NavLink
            to="/forecast"
            className={`open__menu-link ${
              location.pathname === '/forecast' ? 'open__menu-active' : ''
            }`}
          >
            <img className="open__nav-img" src={chartScatter} alt="Icon 1" />
            Прогноз
          </NavLink>
          <NavLink
            to="/statistics"
            className={`open__menu-link ${
              location.pathname === '/statistics' ? 'open__menu-active' : ''
            }`}
          >
            <img className="open__nav-img" src={chartLine} alt="Icon 1" />
            Статистика
          </NavLink>
          <NavLink
            to="/reports"
            className={`open__menu-link ${
              location.pathname === '/reports' ? 'open__menu-active' : ''
            }`}
            style={{ pointerEvents: 'none', opacity: 0.5 }}
          >
            <img className="open__nav-img" src={fileText} alt="Icon 1" />
            Отчеты
          </NavLink>
          <NavLink
            to="/library"
            className={`open__menu-link ${
              location.pathname === '/library' ? 'open__menu-active' : ''
            }`}
            style={{ pointerEvents: 'none', opacity: 0.5 }}
          >
            <img className="open__nav-img" src={bookOpen} alt="Icon 1" />
            Библиотека
          </NavLink>
        </nav>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '16px 24px',
        }}
      >
        <img style={{ width: '32px' }} src={gear} alt="gear" />
        <span>Настройки</span>
      </div>
    </div>
  );
};

const Navigation: FC = () => {
  // const [menuOpen, setMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  // };

  return (
    <div style={{ display: 'flex' }}>
      <div className="menu">
        <OpenComponent />
      </div>
    </div>
  );
};

export default Navigation;
