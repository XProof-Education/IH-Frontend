import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';
import DropdownMenu from './DropdownMenu';
import Logo from '../Logo';
import ProfileIcon from '../ProfileIcon';
import burguerIcon from '../../assets//images/burguer-icon.png';
import cancelIcon from '../../assets//images/cancel-icon.png';
import backIcon from '../../assets/images/back.png'
import HalfDotColor from '../HalfDot';

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
  console.log(props)

  return (
    <div>
      {props.content === "editProfile"
        ? <nav className={props.backGround ? "nav nav-background" : "nav-background-transparent"}>
            <img src={backIcon} onClick={() => navigate(-1)} alt="back"/>
          <div className="logo">
            {user.color !== "false" ? <HalfDotColor color={user.color} size="40" text={user.name} /> : <ProfileIcon />}
          </div>
          </nav>
        :<nav className={props.backGround ? "nav nav-background" : "nav-background-transparent"}>
          {menuVisible ? <img src={cancelIcon} alt="cancel" className="burguer-btn" onClick={toggleMenu} /> :
            <img src={burguerIcon} alt="burguer" className="burguer-btn" onClick={toggleMenu} />}
          <div className="logo">
            {props.content === "profile" && user.color !== false
              ? user.color !=="false" ? <Link to={'/edit-profile'}><HalfDotColor color={user.color} size="40" text={user.name}/></Link> : <ProfileIcon />
              : <Logo color={props.color} />}
          </div>
          <div className={menuVisible ? "menu-visible" : ""}>
            {!isLoggedIn && <DropdownMenu links={["Sign Up", "Log in", "Contact"]} />}
            {isLoggedIn && <DropdownMenu links={["Profile", "Log out", "Contact"]} />}
            {isLoggedIn && props.content === "profile" && <DropdownMenu links={["Home", "Log out", "Contact"]} />}
          </div>
        </nav>}
    </div>
  )
  
}
export default Navbar;