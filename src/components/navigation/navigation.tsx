import React, { FC, useState } from 'react';
import trendingUp from '@/assets/icon/trending-up.svg';
import bookOpen from '@/assets/icon/book-open.svg';
import chartLine from '@/assets/icon/ChartLine.svg';
import chartScatter from '@/assets/icon/chart-scatter1.svg';
import fileText from '@/assets/icon/file-text.svg';
import trello from '@/assets/icon/trello.svg';
import leftArrow from '@/assets/icon/leftArrow.svg';
import logout from '@/assets/icon/logout.svg';
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
        <button className="open__menu-button">
          <img className='open__nav-img' src={trendingUp} alt="Menu Icon" />
          <span>Аналитика проекта</span>
        </button>
        <nav className="open__nav">
          <NavLink
            to="/"
            className={`open__menu-link ${location.pathname === '/' ? 'open__menu-active' : ''
              }`}
          >
            <img className='open__nav-img' src={trello} alt="Icon 1" />
            Планер
          </NavLink>
          <NavLink
            to="/route2"
            className={`open__menu-link ${location.pathname === '/route2' ? 'open__menu-active' : ''
              }`}
          >
            <img className='open__nav-img' src={chartScatter} alt="Icon 1" />
            Прогноз
          </NavLink>
          <NavLink
            to="/route3"
            className={`open__menu-link ${location.pathname === '/route3' ? 'open__menu-active' : ''
              }`}
          >
            <img className='open__nav-img' src={chartLine} alt="Icon 1" />
            Статистика
          </NavLink>
          <NavLink
            to="/route4"
            className={`open__menu-link ${location.pathname === '/route4' ? 'open__menu-active' : ''
              }`}
          >
            <img className='open__nav-img' src={fileText} alt="Icon 1" />
            Отчеты
          </NavLink>
          <NavLink
            to="/route5"
            className={`open__menu-link ${location.pathname === '/route5' ? 'open__menu-active' : ''
              }`}
          >
            <img className='open__nav-img' src={bookOpen} alt="Icon 1" />
            Библиотека
          </NavLink>
        </nav>
      </div>
      <div className="open__person">
        <div className="open__avatar">
          <div className="open__img">
          </div>
          <div className="open__text">
            <p>Вася Пупкин</p>
            <p>Категорийный менеджер</p>
            <p>ТК 123-456</p>
          </div>
        </div>
        <div style={{ display: 'flex', paddingTop: '16px', paddingBottom: '16px', borderBottom: '1px solid #CDCDCD' }}>
          <img src={logout} alt="logout" />
          <span style={{ marginLeft: '8px' }}>Выход</span>
        </div>
      </div>
    </div>
  );
};

const ClosedComponent: React.FC = () => (
  <div className="close">
    <div className="close__menu">
      <button className="close__menu-button">
        <img className="close__nav-img" src={trendingUp} alt="Menu Icon" />
      </button>
      <nav className="close__nav">
        <NavLink
          to="/"
          className={`close__menu-link ${location.pathname === '/' ? 'open__menu-active' : ''
            }`}
        >
          <img className="close__nav-img" src={trello} alt="Icon 1" />
        </NavLink>
        <NavLink
          to="/route1"
          className={`close__menu-link ${location.pathname === '/1' ? 'open__menu-active' : ''
            }`}
        >
          <img className="close__nav-img" src={chartScatter} alt="Icon 1" />
        </NavLink>
        <NavLink
          to="/route1"
          className={`close__menu-link ${location.pathname === '/2' ? 'open__menu-active' : ''
            }`}
        >
          <img className="close__nav-img" src={chartLine} alt="Icon 1" />
        </NavLink>
        <NavLink
          to="/route1"
          className={`close__menu-link ${location.pathname === '/3' ? 'open__menu-active' : ''
            }`}
        >
          <img className="close__nav-img" src={fileText} alt="Icon 1" />
        </NavLink>
        <NavLink
          to="/route1"
          className={`close__menu-link ${location.pathname === '/4' ? 'open__menu-active' : ''
            }`}
        >
          <img className="close__nav-img" src={bookOpen} alt="Icon 1" />
        </NavLink>
      </nav>
    </div>
    <div className="close__person">
        <div className="close__avatar">
          <div className="close__img">
          </div>
        </div>
        <div style={{ display: 'flex', paddingTop: '16px', paddingBottom: '16px', borderBottom: '1px solid #CDCDCD' }}>
          <img src={logout} alt="logout" />
        </div>
      </div>
  </div>
);

const Navigation: FC = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className="menu">
        {menuOpen ? (
          <OpenComponent />
        ) : (
          <ClosedComponent />
        )}
      </div>
      <div
        style={{
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          cursor: 'pointer',
          borderLeft: '1px solid #CDCDCD',
          borderRight: '1px solid #CDCDCD',
          height: '100%'
        }}
        onClick={toggleMenu}
      >
        {
          menuOpen 
          ? (<img
            src={leftArrow}
            alt="leftArrow"
          />)
          : (<img
          style={{transform: 'rotate(180deg)'}}
            src={leftArrow}
            alt="leftArrow"
          />)
        }
      </div>
    </div>
  );
};

export default Navigation;
