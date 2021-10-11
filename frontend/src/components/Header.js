import React from 'react';
import logoWhite from '../images/Logo_white.svg';
import { Link } from "react-router-dom";

function Header(props) {
    const { loggedIn, onSignOut, userData, loginState } = props;
    const email = userData ? userData : "";
    
    return (
        <header className="header">
            <img className="header__logo" src={logoWhite} alt="белый логотип" />
            {loggedIn ? (
        <>
          <nav className="header__nav">
            <ul className="header__list header__list-main">
              <li className="header__list-item">{email}</li>
              <li onClick={onSignOut} className="header__list-link">
                Выйти
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <Link
          to={loginState ? "/sign-in" : "/sign-up"}
          className="header__list-link"
        >
          {loginState ? "Войти" : "Регистрация"}
        </Link>
      )}
        </header>
    );
}

export default Header;