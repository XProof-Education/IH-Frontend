import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const styleBackground = {
    width: "100%",
    height: "5em",
    display: "flex",
    alignItems: "center",
    padding: "1em",
    backgroundColor: props.backGround ? "#fbfbfb" : "transparent",
  }

  return (
    <div>
      {props.content === "editProfile"
        ? <nav style={styleBackground}>
            <p onClick={() => navigate(-1)}>back</p>
            <div className="logo">
              <ProfileIcon />
            </div>
          </nav>
        :
        <nav style={styleBackground}>
          {menuVisible ? <img src={cancelIcon} alt="cancel" className="burguer-btn" onClick={toggleMenu} /> :
            <img src={burguerIcon} alt="burguer" className="burguer-btn" onClick={toggleMenu} />}
          <div className="logo">
            {props.content === "profile"
              ? <ProfileIcon />
              : <Logo logoColor={props.color} />}
          </div>
          <div className={menuVisible ? "menu-visible" : ""}>
            {!isLoggedIn && <DropdownMenu links={["Profile", "Log in", "Contact"]} />}
            {isLoggedIn && <DropdownMenu links={["Profile", "Log out", "Contact"]} />}
            {isLoggedIn && props.content === "profile" && <DropdownMenu links={["Home", "Log out", "Contact"]} />}
          </div>
        </nav>}
      {user && <p>Hello {user.name}</p> }
    </div>
  )
  
}
export default Navbar;