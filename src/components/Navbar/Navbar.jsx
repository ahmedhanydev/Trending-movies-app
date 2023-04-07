/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsSpotify } from "react-icons/bs";
import styles from "./Navbar.module.css";
export default function Navbar({ loginData, logOut }) {
  return (
    <>
      <nav className={`navbar navbar-expand-lg  ${styles.navBg} `}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="home">
            MTrend
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* {loginData ? ( */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="movies">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="tvshows">
                  Tv Shows
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="people">
                  People
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="about">
                  About
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav list-unstyled my-0 ms-auto mx-3 d-flex auth-links align-items-center ">
              {loginData ? (
                <h5 className="my-0 mx-3  lh-lg">
                  {"Hello  " + loginData.first_name + " " + loginData.last_name}
                </h5>
              ) : (
                ""
              )}
              <div className="social-icon md-ms-auto mt-sm-2 d-flex align-items-center mx-3">
                <BsFacebook />
                <BsSpotify className="mx-3 " />
                <BsInstagram />
              </div>

              {!loginData ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item mx-3">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item lh-lg">
                  <a className="nav-link " onClick={logOut}>
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
