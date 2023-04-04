import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';
import DropdownMenu from './DropdownMenu';
import Logo from '../Logo';
import ProfileIcon from '../ProfileIcon';
import burguerIcon from '../../assets/burguer-icon.png';
import cancelIcon from '../../assets/cancel-icon.png';

const Navbar = (props) => {
  const { isLoggedIn, user} = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  // const styleBackground = {
  //   width: "100%",
  //   height: "5em",
  //   display: "flex",
  //   alignItems: "center",
  //   padding: "1em",
  //   backgroundColor: props.backGround ? "#fbfbfb" : "transparent",
  // }

  return (
    <div>
      {props.content === "editProfile"
        ? <nav className={props.backGround ? "nav nav-background" : "nav-background-transparent"}>
            <p onClick={() => navigate(-1)}>back</p>
          <div className="logo">
            {user.color ? <p>{user.color}</p> : <ProfileIcon />}
          </div>
          </nav>
        :
        <nav className={props.backGround ? "nav nav-background" : "nav-background-transparent"}>
          {menuVisible ? <img src={cancelIcon} alt="cancel" className="burguer-btn" onClick={toggleMenu} /> :
            <img src={burguerIcon} alt="burguer" className="burguer-btn" onClick={toggleMenu} />}
          <div className="logo">
            {props.content === "profile"
              ? user.color ? <Link to={'/edit-profile'}>{user.color}</Link> : <ProfileIcon />
              : <Logo logoColor={props.color} />}
          </div>
          <div className={menuVisible ? "menu-visible" : ""}>
            {!isLoggedIn && <DropdownMenu links={["Profile", "Log in", "Contact"]} />}
            {isLoggedIn && <DropdownMenu links={["Profile", "Log out", "Contact"]} />}
            {isLoggedIn && props.content === "profile" && <DropdownMenu links={["Home", "Log out", "Contact"]} />}
          </div>
        </nav>}
      {user && <p>Hello {user.name}</p>}
      
    </div>
  )
  
}
export default Navbar;