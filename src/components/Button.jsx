import React, { useState } from 'react';

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
    transition: "all 0.8s ease-in-out",
    margin: "20px 5px 20px 5px",
    padding: "3px 15px"
  }
  
  return (
  <>
    { props.action !== undefined
      ?  <button style = { styleButton } onMouseEnter = { handleHover } onMouseLeave = { handleHover } onClick={props.action}> { props.children } </button>
      : <button style = { styleButton } onMouseEnter = { handleHover } onMouseLeave = { handleHover } > { props.children } </button>
      }
  </>
    );
}

export default Button;