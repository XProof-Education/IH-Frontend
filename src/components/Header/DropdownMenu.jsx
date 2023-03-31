import { Link } from "react-router-dom";
import HalfDotColor from "../Dots/HalfDot";

const DropdownMenu = (props) => {
  const imageLinks = [<HalfDotColor color="#3073D7"/>, <HalfDotColor color="#F78DA7"/>, <HalfDotColor color="#FFCD29"/>];

  return (
    <div className="menu">
      {props.links.map((link, i) => {
        return (
          <div className="link-navbar-container" key={link}>
            <Link to={`/${link.toLowerCase()}`} className="navbar-link">{imageLinks[i]}{link}</Link>
          </div>
        )
      })}
      
    </div>
  )
}

export default DropdownMenu;