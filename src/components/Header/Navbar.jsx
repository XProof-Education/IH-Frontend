import React, { useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';
import DropdownMenu from "./DropdownMenu";
import Logo from "../Logo";
import burguerIcon from '../../assets/burguer-icon.png';
import cancelIcon from '../../assets/cancel-icon.png';

const Navbar = (props) => {
  const { isLoggedIn, user} = useContext(AuthContext);
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
    <div>
      {props.content === "profile"
        ? <div> <p> Back </p> <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" alt="hi" /> </div>
        :
        <nav style={styleBackground}>
          {menuVisible ? <img src={cancelIcon} alt="cancel" className="burguer-btn" onClick={toggleMenu} /> :
            <img src={burguerIcon} alt="burguer" className="burguer-btn" onClick={toggleMenu} />}
          <div className="logo">
            <Logo logoColor={props.color} />
          </div>
          <div className={menuVisible ? "menu-visible" : ""}>
            {!isLoggedIn && <DropdownMenu links={["Profile", "Log in", "Contact"]} />}
            {isLoggedIn && <DropdownMenu links={["Profile", "Log out", "Contact"]} />}
          </div>
        </nav>}
      {user && <p>Hello {user.name}</p> }
    </div>
  )
  
}
export default Navbar;