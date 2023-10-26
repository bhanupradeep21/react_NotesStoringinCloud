import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from "react";

export default function Navbar() {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname)
  }, [location])

  return (
    <>
      <div className="container-fill">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><Link className={`nav-link ${location.pathname === '/home' ? "active" : ""}`} to="/home">Home</Link></li>
              <li className="nav-item"><Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link></li>
              <li className="nav-item"><Link className={`nav-link ${location.pathname === '/contact' ? "active" : ""}`} to="/contact">Contact</Link></li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link>
            </form>
          </div>
        </nav>
      </div>
    </>
  );
}
