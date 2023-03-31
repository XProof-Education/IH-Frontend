import React, { useState } from "react";
import './navbar.css';
import MenuDesplegable from "./MenuDespleglable";
import Logo from "../Logo";
import burguerIcon from '../assets/burguer-icon.png';
import cancelIcon from '../assets/cancel-icon.png';

const Navbar = (props) => {
  const [menuVisible, setMenuVisible] = useState(false);

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
    <nav style={styleBackground}>
      {menuVisible ? <img src={cancelIcon} alt="cancel" className="burguer-btn" onClick={toggleMenu} /> :
      <img src={burguerIcon} alt="burguer" className="burguer-btn" onClick={toggleMenu} />}
      <div className="logo">
        <Logo logoColor={props.color} />
      </div>
      <div className={menuVisible ? "menu-visible" : ""}>
        <MenuDesplegable links={["Profile", "Sign up", "Contact"]} />
      </div>
    </nav>
  )
  
}
export default Navbar;