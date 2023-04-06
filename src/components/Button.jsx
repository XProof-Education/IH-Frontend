import React, { useState } from 'react';
import './components.css';

const Button = (props) => {
  const [hovered, setHovered] = useState(false);
  const handleHover = (e) => {
    setHovered(prev => !prev)
  };

  const styleButton = {
    borderRadius: "20px",
    border: `1px solid ${props.color === "blue" ? "#61D4F7" : props.color === "pink" ? "#E7327B" : props.color === "yellow" ? "#F7CF5C" : props.color === "purple" ? "#420ED0" : "white" }`,
    backgroundColor: hovered ? props.color === "blue"
      ? "#61D4F7"
      : props.color === "pink"
        ? "#E7327B"
        : props.color === "purple"
        ? "#420ED0"
          : props.color === "yellow"
          ? "#F7CF5C"
        : "white"
      : "transparent",
    color: hovered ? "#fff" : "inherit",
    transition: "all 0.4s ease-in-out",
    margin: "20px 5px 20px 5px",
    padding: "3px 15px"
  }
  
  return (
  <>
    { props.action !== undefined
      ?  <button style = { styleButton } onMouseEnter = { handleHover } onMouseLeave = { handleHover } onClick={props.action}> { props.children } </button>
      : <button style = { styleButton } onMouseEnter = { handleHover } onMouseLeave = { handleHover } > { props.children } </button>
      }
      {/* { props.action !== undefined
        ? <button className={props.color === "blue"
          ? "button-style button-color-blue"
          : props.color === 'red'
          ? "button-style button-color-red"
          : "button-style"
        }
          onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={props.action}> {props.children}
        </button>
      : <button className = {props.color === "blue" ? "button-style button-color-blue" : props.color === 'red' ? "button-style button-color-red" : "button-style"} onMouseEnter = { handleHover } onMouseLeave = { handleHover } > { props.children } </button>
      } */}
  </>
    );
}

export default Button;