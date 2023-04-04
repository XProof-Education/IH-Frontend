import React, { useState } from 'react';
import './components.css';

const Button = (props) => {
  const [hovered, setHovered] = useState(false);
  const handleHover = (e) => {
    setHovered(prev => !prev)
  };

  const styleButton = {
    borderRadius: "20px",
    border: `1px solid ${props.color === "blue" ? "#3073D7" : props.color === "red" ? "#FF6230" : "white"}`,
    backgroundColor: hovered ? props.color === "blue"
      ? "#3073D7"
      : props.color === "red"
        ? "red"
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