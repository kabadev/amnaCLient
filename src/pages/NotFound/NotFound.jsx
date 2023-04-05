import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";
const NotFound = () => {
  return (
    <div className="notfound">
      <h1>404</h1>
      <h3>Not found</h3>
      <p>Page Comming Soon</p>
      <div className="action__btn__center">
        <Link to="/" className="btn btn__primary">
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
