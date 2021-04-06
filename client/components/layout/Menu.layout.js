import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../contexts/Auth.context";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (typeof user != 'object') history.push('/');
  });

  const logOut = () => {
    setUser(null);
  }
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" to='/my-profile'>Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/search-spots'>Search For Parking</Link>
            </li>
          </ul>
          <form className="d-flex">
            {user ? (
            <div className="me-2">{user[0].first_name}</div>
            ) : ('')}
            <Link className="btn btn-outline-success" to='/' onClick={logOut}>Log Out</Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Menu;

