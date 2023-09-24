import './header.css';
import logo from '../../assets/icon/lenta logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>();

  return (
    <div className="header">
      <img src={logo} alt="" />
      <div>
        {loggedIn ? (
          <Link className="header__login" to="#">
            <button>Войти</button>
          </Link>
        ) : (
          <Link className="header__logout" to="#">
            <button>Выйти</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
