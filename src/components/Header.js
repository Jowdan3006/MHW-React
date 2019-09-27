import React from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="b-shadow-75 t-border b-tb-fade">
    <div className="container">
      <nav className="navbar navbar-expand-lg">
          <NavLink exact to="/" className="navbar-brand">MHW-React</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><NavLink to="/MonsterList" className="nav-link">Monster List</NavLink></li>
              <li className="nav-item"><NavLink to="/Loadouts" className="nav-link">Loadouts</NavLink></li>
            </ul>
        </div>
      </nav>
    </div>
  </header>
  )
}

export default Header;
