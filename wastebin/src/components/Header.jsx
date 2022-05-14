import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import plus from "../images/plus.png";
import arrow from "../images/arrow.png";
import userIcon from "../images/user-icon.jpg";
import { binAuth } from "../auth/bin-auth";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    binAuth.isAuthenticated().then((isAuthenticated) => {
      setIsAuthenticated(isAuthenticated);
    });
  }, [logout]);

  function logout() {
    binAuth.logout().then(() => {
      navigate("/");
    });
  }

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="header__logo">
          Wastebin
        </Link>
        <Link to="/public-bins" className="header__link_disabled">
          Bins
        </Link>
        <Link to="/about-us" className="header__link_disabled">
          About us
        </Link>
        <Link to="/" className="button button-medium add-bin-button">
          <img src={plus} className="add-bin-button__icon" alt="plus" />
          <span className="add-bin-button__text">bin</span>
        </Link>
        <div className="header__right">
          {!isAuthenticated ? (
            <div id="anonymous">
              <Link
                to="login"
                className="button button-medium header__auth-button"
              >
                Login
              </Link>
              <Link
                to="register"
                className="button button-medium header__auth-button"
              >
                Register
              </Link>
            </div>
          ) : (
            <div id="signed-in">
              <p className="header__user-name">{props.userInfo.username}</p>
              <Link to="user-bins">
                <img
                  className="image header__user-image"
                  alt="User"
                  src={
                    props.userInfo.image === "" ||
                    props.userInfo.image === undefined
                      ? userIcon
                      : props.userInfo.image
                  }
                />
              </Link>
              <div className="user-dropdown">
                <img src={arrow} className="user-dropdown__icon" alt="arrow" />
                <div className="user-dropdown__content">
                  <Link to="user-bins">My bins</Link>
                  <Link to="public-bins">Public bins</Link>
                  <Link to="user-profile">My profile</Link>
                  <Link to="change-password">Change password</Link>
                  <Link id="log-out-link" to="/" onClick={logout}>
                    Log out
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
