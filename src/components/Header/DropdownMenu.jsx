import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import HalfDotColor from "../HalfDot";

const DropdownMenu = (props) => {
  const { logOutUser } = useContext(AuthContext);
  const imageLinks = [<HalfDotColor color="blue" size="14"/>, <HalfDotColor color="yellow" size="14"/>, <HalfDotColor color="pink" size="14"/>];

  return (
    <div className="menu">
      {props.links.map((link, i) => {
        return (
          <div className="link-navbar-container" key={link}>
            {link === 'Log out'
              ? <p className="navbar-link" onClick={() => logOutUser()}>{imageLinks[i]}{link}</p>
              : <Link to={`/${link.toLowerCase().replaceAll(' ', '')}`} className="navbar-link">{imageLinks[i]}{link}</Link>}
          </div>
        )
      })}
    </div>
  );
}

export default DropdownMenu;