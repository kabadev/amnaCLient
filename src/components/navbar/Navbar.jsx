import "./navbar.css";
import { IoMenuOutline, IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
const Navbar = () => {
  const { setMode, mode } = useContext(ThemeContext);
  const { setSidebarOpen } = useContext(AppContext);
  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "true"
  );
  const themeTogggleHandler = () => {
    setChecked((prevChecked) => !prevChecked);
    localStorage.setItem("theme", !checked);
  };
  useEffect(() => {
    setMode(localStorage.getItem("theme"));
  }, [checked]);

  return (
    <div className="navbar">
      <div className="nav__right">
        <div className="toggle__btn" onClick={() => setSidebarOpen(true)}>
          <IoMenuOutline className="toggle__icon" />
        </div>
        <div className="brand">
          <img
            src="https://stackstream-production-spaces.s3.eu-central-1.amazonaws.com/6426d66c411c74cfde55ce37/991179540a850d356d0dedc6821b8932b13cc6c8-profile.jpeg"
            alt=""
          />
        </div>
      </div>
      <div className="nav__left">
        <div className="toggle_switch" onClick={themeTogggleHandler}>
          <span className="switch">
            {checked ? (
              <IoMoonOutline className="moon" />
            ) : (
              <IoSunnyOutline className="sun" />
            )}
          </span>
          <IoMoonOutline className="moon" />
          <IoSunnyOutline className="sun" />
        </div>
        <div className="user__panel">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqN9X2wiHXLpeHcXo8x3-qtGhEBh6vX2a8vA&usqp=CAU"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
