import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';
import DropdownMenu from './DropdownMenu';
import Logo from '../Icons/Logo';
import ProfileIcon from '../Icons/ProfileIcon';
import burguerIcon from '../../assets//images/burguer-icon.png';
import cancelIcon from '../../assets//images/cancel-icon.png';
import backIcon from '../../assets/images/back.png'
import HalfDotColor from '../Icons/HalfDot';

const Navbar = (props) => {
  const { isLoggedIn, user} = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [backUrl, setBackUrl] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  useEffect(() => {
    if (props.backUrl) {
      setBackUrl(props.backUrl);
    } else {
      setBackUrl(-1);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const navClassName = `nav ${isScrolled ? 'nav-fixed' : ''}`;

  return (
    <div>
      {props.content === "editProfile"
        ? <nav className={`${props.backGround ? "nav nav-background" : "nav-background-transparent"} ${navClassName}`}>
          <img src={backIcon} onClick={() => navigate(backUrl)} alt="back" />
          <div className="logo">
            {user.color !== "false" ? <HalfDotColor color={user.color} size="40" text={user.name} /> : <ProfileIcon />}
          </div>
        </nav>
        : <nav className={`${props.backGround ? "nav nav-background" : "nav-background-transparent"} ${navClassName}`}>
          {menuVisible ? <img src={cancelIcon} alt="cancel" className="burguer-btn" onClick={toggleMenu} /> :
            <img src={burguerIcon} alt="burguer" className="burguer-btn" onClick={toggleMenu} />}
          <div className="logo">
            {props.content === "profile" && user.color !== false
              ? user.color !== "false" ? <Link to={'/edit-profile'}><HalfDotColor color={user.color} size="40" text={user.name} /></Link> : <ProfileIcon />
              : <Logo color={props.color} />}
          </div>
          <div className={menuVisible ? "menu-visible" : ""}>
            {!isLoggedIn && <DropdownMenu links={["Sign Up", "Log in", "Contact"]} />}
            {isLoggedIn && props.content !== "profile" && <DropdownMenu links={["Profile", "Log out", "Contact"]} />}
            {isLoggedIn && props.content === "profile" && <DropdownMenu links={["Home", "Log out", "Contact"]} />}
          </div>
        </nav>}
    </div>
  );
}
export default Navbar;